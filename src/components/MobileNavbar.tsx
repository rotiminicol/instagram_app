import { Home, Search, PlusSquare, Clapperboard, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const MobileNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const navItems = [
    { path: '/home', icon: Home, name: 'Home' },
    { path: '/search', icon: Search, name: 'Search' },
    { path: '/create', icon: PlusSquare, name: 'Create' },
    { path: '/reels', icon: Clapperboard, name: 'Reels' },
    { path: '/profile', icon: User, name: 'Profile' }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200/30 flex justify-around h-16"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = path === item.path;
        
        return (
          <motion.div
            key={item.path}
            className="relative flex items-center justify-center w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setActiveHover(item.path)}
            onHoverEnd={() => setActiveHover(null)}
          >
            <Link to={item.path} className="flex flex-col items-center justify-center w-full h-full">
              {/* Active indicator */}
              <motion.div
                className={`absolute -top-3 w-12 h-1 rounded-full ${
                  isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-transparent'
                }`}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  scaleX: isActive ? 1 : 0
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              />

              {/* Icon container with pulse animation when active */}
              <motion.div
                className="relative"
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                  y: isActive ? [-5, 0] : 0
                }}
                transition={{
                  scale: isActive ? { repeat: Infinity, duration: 2 } : { duration: 0.2 },
                  y: { duration: 0.3 }
                }}
              >
                <Icon 
                  className={`w-7 h-7 transition-all duration-200 ${
                    isActive 
                      ? 'text-black stroke-[2.5px] drop-shadow-sm' 
                      : 'text-gray-500'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Hover tooltip */}
                <AnimatePresence>
                  {(activeHover === item.path && !isActive) && (
                    <motion.span
                      className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};