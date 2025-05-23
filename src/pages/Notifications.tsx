import { useState } from 'react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: {
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  time: string;
  postImage?: string;
  read: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      user: {
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      content: 'liked your photo',
      time: '2m',
      postImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop',
      read: false,
    },
    {
      id: 2,
      type: 'follow',
      user: {
        username: 'sarahwilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face',
      },
      content: 'started following you',
      time: '3h',
      read: false,
    },
    {
      id: 3,
      type: 'comment',
      user: {
        username: 'alexjones',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      content: 'commented on your photo: "Amazing shot!"',
      time: '5h',
      postImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop',
      read: true,
    },
    {
      id: 4,
      type: 'mention',
      user: {
        username: 'emilydavis',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      },
      content: 'mentioned you in a comment: "@currentuser check this out!"',
      time: '1d',
      read: true,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const [isClearing, setIsClearing] = useState(false);

  const filteredNotifications = notifications.filter(
    notification => activeFilter === 'all' || !notification.read
  );

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setIsClearing(true);
    setTimeout(() => {
      setNotifications(
        notifications.map(notification => ({ ...notification, read: true }))
      );
      setIsClearing(false);
    }, 500);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      case 'mention': return '📍';
      default: return '🔔';
    }
  };

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      {/* Animated Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex items-center justify-between">
          <motion.button 
            onClick={() => navigate(-1)}
            whileTap={{ scale: 0.9 }}
            className="p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <h1 className="text-xl font-semibold">Notifications</h1>
          
          <motion.button 
            onClick={markAllAsRead}
            disabled={isClearing}
            whileTap={{ scale: 0.9 }}
            className="p-1 text-blue-500"
          >
            {isClearing ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </motion.div>
            ) : (
              <Check className="w-5 h-5" />
            )}
          </motion.button>
        </div>
        
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeFilter === 'all' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
            {activeFilter === 'all' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="filterUnderline"
                transition={{ type: 'spring', stiffness: 300 }}
              />
            )}
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeFilter === 'unread' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread
            {activeFilter === 'unread' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="filterUnderline"
                transition={{ type: 'spring', stiffness: 300 }}
              />
            )}
          </button>
        </div>
      </motion.header>
      
      <div className="pt-28 px-4">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <BellOff className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500">No notifications</p>
            </motion.div>
          ) : (
            <motion.div 
              key="notifications-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                  className={`relative overflow-hidden rounded-xl ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  } shadow-sm`}
                >
                  <div 
                    className="flex items-center space-x-3 p-3"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="relative">
                      <img
                        src={notification.user.avatar}
                        alt={notification.user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      {notification.user.verified && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        <span className="font-semibold">{notification.user.username}</span>{' '}
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    
                    {notification.postImage && (
                      <motion.div 
                        className="w-12 h-12 rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={notification.postImage}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  {!notification.read && (
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Notifications;