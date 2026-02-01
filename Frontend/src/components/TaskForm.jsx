import React, { useState } from 'react'; 

const TaskForm = ({ onSave, onCancel, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
    const [status, setStatus] = useState(initialTask?.status || 'pending'); 
   const handleSubmit = () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    onSave({
      title,
      description,
      status
    });
  };

  return (
    <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">      {initialTask ? 'Update Task' : 'Create Task'}</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">  ✕</button>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Enter task title" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Description</label>
            
           
          </div>
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            rows="5" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all resize-none" 
             placeholder="Optional description"
          />
        </div>
 <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full p-3 bg-gray-50 border rounded-xl"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex gap-4 pt-4">
          <button 
            onClick={handleSubmit}
            className="flex-1 bg-indigo-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            {initialTask ? 'Update' : 'Create Task'}
          </button>
          <button 
            onClick={onCancel} 
            className="px-8 bg-gray-50 text-gray-500 p-4 rounded-2xl font-bold hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;