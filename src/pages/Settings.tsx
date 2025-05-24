import { useState, memo } from "react";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsItem {
  name: string;
  route: string;
}

interface SettingsGroup {
  title: string;
  items: SettingsItem[];
}

const Settings = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const settingsGroups: SettingsGroup[] = [
    {
      title: "Account",
      items: [
        { name: "Personal Information", route: "/settings/personal-info" },
        { name: "Security", route: "/settings/security" },
        { name: "Privacy", route: "/settings/privacy" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { name: "Notifications", route: "/settings/notifications" },
        { name: "Language", route: "/settings/language" },
        { name: "Theme", route: "/settings/theme" },
      ],
    },
    {
      title: "Support & About",
      items: [
        { name: "Help", route: "/settings/help" },
        { name: "About", route: "/settings/about" },
        { name: "Report a Problem", route: "/settings/report" },
      ],
    },
  ];

  const handleLogout = () => {
    setLoading(true);
    setError('');

    try {
      localStorage.removeItem('token');
      setLogoutModalOpen(false);
      navigate('/welcome');
    } catch (err: any) {
      console.error('Logout error:', err.message);
      setError('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center p-4">
          <Link
            to="/profile"
            className="mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Back to profile"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <div className="pt-16 py-4 space-y-6">
        {error && (
          <motion.p
            className="text-center text-red-500 mx-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {settingsGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm"
          >
            <h2 className="px-4 py-2 text-sm font-medium text-gray-500">{group.title}</h2>
            {group.items.map((item, idx) => (
              <Link
                key={item.name}
                to={item.route}
                className="flex items-center justify-between px-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors"
                aria-label={`Navigate to ${item.name}`}
              >
                <span className="text-gray-900">{item.name}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: settingsGroups.length * 0.1 }}
          className="bg-white rounded-lg shadow-sm"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLogoutModalOpen(true)}
            className="w-full text-left px-4 py-4 text-red-500 font-medium hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Log out"
            disabled={loading}
          >
            <LogOut className="w-5 h-5 inline-block mr-2" />
            Log Out
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isLogoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Logout confirmation"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
            >
              <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLogoutModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Cancel logout"
                  disabled={loading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Confirm logout"
                  disabled={loading}
                >
                  {loading ? 'Logging out...' : 'Log Out'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(Settings);