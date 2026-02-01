import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import TaskForm from './components/TaskForm';
import StatsCard from './components/StatsCard';
import AuthForm from './components/AuthForm';
import { api } from './services/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    const init = async () => {
     const storedUser = api.getCurrentUser();
      const token = localStorage.getItem('taskflow_token');
        if (!storedUser || !token) {
        api.logout();
        setLoading(false);
        return;
      }
      setUser(storedUser); 
       try {
  const data = await api.getTasks();
  setTasks(data);
} catch (err) {
  api.logout();
  setUser(null);
}
finally{
  setLoading(false)
}
    
    };
    init();
  }, []);

  /* ---------------- DERIVED DATA ---------------- */

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t => filter === 'all' || t.status === filter)
      .filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description || '').toLowerCase().includes(search.toLowerCase())
      );
  }, [tasks, filter, search]);

  /* ---------------- AUTH ---------------- */

  const handleAuthSuccess = async (u) => {
    setUser(u);
   const data = await api.getTasks();
    setTasks(data);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setTasks([]);
  };

  /* ---------------- TASK ACTIONS ---------------- */

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      const updated = await api.updateTask(editingTask._id, taskData);
      setTasks(tasks.map(t => t._id === updated._id ? updated : t));
      setEditingTask(null);
    } else {
      const created = await api.createTask(taskData);
      setTasks([created, ...tasks]);
    }
    setShowForm(false);
  };

  const toggleStatus = async (task) => {
     const next = {
      pending: 'in-progress',
      'in-progress': 'completed',
      completed: 'pending',
    }[task.status];

    const updated = await api.updateTask(task._id,{ status: next });
    setTasks(tasks.map(t => t._id === updated._id ? updated : t));
   
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await api.deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  /* ---------------- RENDER ---------------- */

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Hello, {user.name}</h1>
            <p className="text-gray-500">Manage your tasks</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            + New Task
          </button>
        </div>

        <StatsCard stats={stats} />

        <div className="flex gap-3 flex-wrap">
          {['all', 'pending', 'in-progress', 'completed'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                filter === s ? 'bg-indigo-600 text-white' : 'bg-gray-100'
              }`}
            >
              {s.replace('-', ' ')}
            </button>
          ))}

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            className="ml-auto px-4 py-2 border rounded-lg"
          />
        </div>

        {(showForm || editingTask) && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <TaskForm
              initialTask={editingTask}
              onSave={handleSaveTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.length ? (
            filteredTasks.map(task => (
              <div key={task._id} className="bg-white p-5 rounded-xl border">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-gray-500">
                    {task.status}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingTask(task)}>✏️</button>
                    <button onClick={() => deleteTask(task._id)}>🗑</button>
                  </div>
                </div>

                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {task.description || 'No description'}
                </p>

                <button
                  onClick={() => toggleStatus(task)}
                  className="w-full bg-indigo-50 text-indigo-600 py-2 rounded-lg font-semibold"
                >
                  Advance Status
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No tasks found
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
