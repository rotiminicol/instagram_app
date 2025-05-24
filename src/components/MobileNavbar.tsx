
import { Home, Search, PlusSquare, Play, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const MobileNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/home', label: 'Home' },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: PlusSquare, path: '/create', label: 'Create' },
    { icon: Play, path: '/reels', label: 'Reels' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around h-16 px-4 max-w-screen-md mx-auto">
        {navItems.map(({ icon: Icon, path, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center justify-center p-2 relative group"
            >
              <motion.div
                className="relative"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Icon 
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'
                  }`}
                  fill={isActive ? 'currentColor' : 'none'}
                  strokeWidth={isActive ? 0 : 1.5}
                />
                {isActive && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 w-1 h-1 bg-black rounded-full"
                    layoutId="activeIndicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ x: '-50%' }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
