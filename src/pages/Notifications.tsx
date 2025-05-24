
import { useState, useEffect } from 'react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../api/services';

interface Notification {
  id: number;
  type: string;
  recipient_user: number;
  related_post?: number;
  related_user?: number;
  is_read: boolean;
  created_at: string;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const [isClearing, setIsClearing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log('Fetching notifications...');
        const response = await notificationService.getNotifications();
        console.log('Notifications response:', response.data);
        setNotifications(response.data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Fallback to mock data
        setNotifications([
          {
            id: 1,
            type: 'like',
            recipient_user: 1,
            related_post: 1,
            related_user: 2,
            is_read: false,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            type: 'follow',
            recipient_user: 1,
            related_user: 3,
            is_read: false,
            created_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter(
    notification => activeFilter === 'all' || !notification.is_read
  );

  const markAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(
        notifications.map(notification =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    setIsClearing(true);
    try {
      const unreadNotifications = notifications.filter(n => !n.is_read);
      await Promise.all(
        unreadNotifications.map(notification => 
          notificationService.markAsRead(notification.id)
        )
      );
      
      setNotifications(
        notifications.map(notification => ({ ...notification, is_read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    } finally {
      setTimeout(() => setIsClearing(false), 500);
    }
  };

  const removeNotification = async (id: number) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
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

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case 'like': return 'liked your post';
      case 'comment': return 'commented on your post';
      case 'follow': return 'started following you';
      case 'mention': return 'mentioned you in a comment';
      default: return 'sent you a notification';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pb-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
                    notification.is_read ? 'bg-white' : 'bg-blue-50'
                  } shadow-sm`}
                >
                  <div 
                    className="flex items-center space-x-3 p-3"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="relative">
                      <img
                        src={`https://picsum.photos/50/50?random=${notification.related_user || 1}`}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        <span className="font-semibold">User {notification.related_user}</span>{' '}
                        {getNotificationText(notification)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {!notification.is_read && (
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
