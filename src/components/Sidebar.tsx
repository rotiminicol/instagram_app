import { Heart, User, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface UserData {
  username: string;
  avatar: string;
  posts: number;
  followers: number;
  following: number;
}

export const Sidebar = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "currentuser",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    posts: 127,
    followers: 1200,
    following: 856,
  });

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserData((prev) => ({ ...prev }));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const quickActions = [
    { icon: Heart, label: "Activity", href: "/activity" },
    { icon: Users, label: "Find Friends", href: "/friends" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4 space-y-6 max-w-xs w-full"
      role="navigation"
      aria-label="Sidebar navigation"
    >
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={userData.avatar}
            alt={`${userData.username}'s profile`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{userData.username}</h3>
            <p className="text-sm text-gray-500">Your account</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-semibold text-gray-900">{userData.posts}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {(userData.followers / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{userData.following}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.label}
              href={action.href}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={action.label}
            >
              <action.icon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{action.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};