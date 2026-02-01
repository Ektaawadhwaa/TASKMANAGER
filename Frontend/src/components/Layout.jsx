import React from 'react';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
             
              <span className="text-xl font-bold text-gray-900 tracking-tight">Task Manager  </span>
            </div>
            
            <div className="flex items-center space-x-4">
                  {user &&(
              <div className="flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-gray-900">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>)}
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <i className="fas fa-power-off"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

   
    </div>
  );
};

export default Layout;