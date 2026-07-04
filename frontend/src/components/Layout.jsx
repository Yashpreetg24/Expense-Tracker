import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Receipt, User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Layout = ({ children }) => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">ExpenseTracker</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">ExpenseTracker</h1>
          <button onClick={logout} className="text-red-600"><LogOut className="w-6 h-6" /></button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
        
        {/* Mobile Nav Bottom */}
        <nav className="md:hidden bg-white border-t border-gray-200 flex justify-around p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={cn("p-2 rounded-lg flex flex-col items-center", isActive ? "text-indigo-600" : "text-gray-500")}>
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
