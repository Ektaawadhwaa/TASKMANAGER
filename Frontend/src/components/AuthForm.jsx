import React, { useState } from 'react';
import { api } from '../services/api.js';

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = isLogin 
        ? await api.login(form.email, form.password) 
        : await api.signup(form.name, form.email, form.password);
      onAuthSuccess(user);
    } catch (err) {
      alert('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
   const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', password: '' });
  };

  return (

/* <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Login' : 'Create Account'}
      </h2> */


    <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl text-white mb-6 shadow-xl shadow-indigo-100">
          <i className="fas fa-check-double text-4xl"></i>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">{isLogin ? 'Login' : 'Create Account'}</h2>
         
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all" 
              required
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} 
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
          <input 
            type="email" 
            placeholder="abc@example.com" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all" 
            required
            value={form.email}

            onChange={e => setForm({...form, email: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all" 
            required
            value={form.password}

            onChange={e => setForm({...form, password: e.target.value})} 
          />
        </div>
        <button 
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center"
        >
          {isLoading? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <div className="mt-8 text-center">
       <button
          onClick={toggleMode}
          className="text-sm text-gray-500 hover:text-indigo-600"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;