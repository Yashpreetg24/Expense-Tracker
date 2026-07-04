import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500">Manage your account details and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 flex items-center gap-6 border-b border-gray-100">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-600">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900 font-medium">{user.name}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900 font-medium">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
