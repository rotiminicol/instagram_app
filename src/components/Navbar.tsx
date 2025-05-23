import { Heart, User, Home, PlusSquare, MessageCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      initial={{ y: 0, borderBottomWidth: 0 }}
      animate={{
        y: 0,
        borderBottomWidth: scrolled ? 1 : 0,
        boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Instagram
            </motion.h1>
            
            {/* Search Bar with Animation */}
            <motion.div 
              className="hidden md:block relative"
              animate={{
                width: searchFocused ? '280px' : '224px'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <motion.div 
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={false}
                animate={{
                  boxShadow: searchFocused ? '0 0 0 2px rgba(168, 85, 247, 0.3)' : 'none'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </motion.div>
          </div>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <NavIcon icon={<Home />} active />
            <NavIcon icon={<MessageCircle />} notification />
            <NavIcon 
              icon={<PlusSquare />} 
              pulse 
              onClick={() => {
                // Handle create post action
              }}
            />
            <NavIcon 
              icon={<Heart />} 
              notification={showNotification}
              onClick={() => setShowNotification(false)}
            />
            <ProfileButton />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Reusable Nav Icon Component
const NavIcon = ({ 
  icon, 
  active = false, 
  notification = false, 
  pulse = false,
  onClick = () => {}
}: { 
  icon: React.ReactNode, 
  active?: boolean,
  notification?: boolean,
  pulse?: boolean,
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button 
      className="p-2 relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        animate={{
          color: active ? '#000000' : isHovered ? '#000000' : '#374151'
        }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      
      {notification && (
        <motion.div 
          className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            y: pulse ? [0, -2, 0] : 0
          }}
          transition={{ 
            y: pulse ? { 
              repeat: Infinity, 
              repeatType: 'reverse', 
              duration: 1.5 
            } : {}
          }}
        />
      )}
    </motion.button>
  );
};

// Profile Button Component
const ProfileButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      className="w-8 h-8 rounded-full overflow-hidden border-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        borderColor: isHovered ? '#9CA3AF' : '#E5E7EB'
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center bg-gray-100"
        animate={{
          backgroundColor: isHovered ? '#E5E7EB' : '#F3F4F6'
        }}
      >
        <User className="w-4 h-4 text-gray-700" />
      </motion.div>
    </motion.button>
  );
};