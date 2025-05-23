
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { name: 'Personal Information', route: '/settings/personal-info' },
        { name: 'Security', route: '/settings/security' },
        { name: 'Privacy', route: '/settings/privacy' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { name: 'Notifications', route: '/settings/notifications' },
        { name: 'Language', route: '/settings/language' },
        { name: 'Theme', route: '/settings/theme' },
      ]
    },
    {
      title: 'Support & About',
      items: [
        { name: 'Help', route: '/settings/help' },
        { name: 'About', route: '/settings/about' },
        { name: 'Report a Problem', route: '/settings/report' },
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center p-4">
          <Link to="/profile" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>
      
      <div className="py-4 space-y-6">
        {settingsGroups.map((group, index) => (
          <div key={index} className="bg-white">
            <h2 className="px-4 py-2 text-sm font-medium text-gray-500">{group.title}</h2>
            {group.items.map((item, idx) => (
              <Link
                key={idx}
                to={item.route}
                className="flex items-center justify-between px-4 py-3 border-t border-gray-100"
              >
                <span className="text-gray-900">{item.name}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        ))}
        
        <div className="bg-white">
          <button className="w-full text-left px-4 py-4 text-red-500 font-medium">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
