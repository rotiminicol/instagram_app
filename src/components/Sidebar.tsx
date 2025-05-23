
import { Heart, User, Users } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">currentuser</h3>
            <p className="text-sm text-gray-500">Your account</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-semibold text-gray-900">127</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">1.2K</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">856</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Activity</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Find Friends</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
