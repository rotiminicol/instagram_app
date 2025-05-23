
import { useState } from 'react';
import { MobileNavbar } from '@/components/MobileNavbar';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  time: string;
  postImage?: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      user: {
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
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

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="pb-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-center">Notifications</h1>
        </div>
      </header>
      
      <div className="pt-16 px-4">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                notification.read ? 'bg-white' : 'bg-blue-50'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <img
                src={notification.user.avatar}
                alt={notification.user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user.username}</span>{' '}
                  {notification.content}
                </p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              {notification.postImage && (
                <img
                  src={notification.postImage}
                  alt="Post"
                  className="w-12 h-12 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Notifications;
