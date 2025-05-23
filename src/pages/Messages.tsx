import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Edit, Phone, Video, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  sent: boolean;
}

interface Conversation {
  id: number;
  user: {
    username: string;
    avatar: string;
    online?: boolean;
  };
  lastMessage: string;
  time: string;
  unread: boolean;
}

const Messages = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: 1,
      user: {
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        online: true,
      },
      lastMessage: 'Hey, are you going to the event tomorrow?',
      time: '2m',
      unread: true,
    },
    {
      id: 2,
      user: {
        username: 'sarahwilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face',
      },
      lastMessage: 'Thanks for sending the photos!',
      time: '1h',
      unread: false,
    },
    {
      id: 3,
      user: {
        username: 'mikebrown',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        online: true,
      },
      lastMessage: 'Let me check and get back to you',
      time: '5h',
      unread: false,
    },
  ];

  const [chats, setChats] = useState<{ [key: number]: Message[] }>({
    1: [
      { id: 1, text: 'Hey there!', timestamp: '10:30 AM', sent: false },
      { id: 2, text: 'Hi! How are you?', timestamp: '10:32 AM', sent: true },
      { id: 3, text: 'I\'m good, thanks! How about you?', timestamp: '10:33 AM', sent: false },
      { id: 4, text: 'I\'m doing well. Just working on some projects.', timestamp: '10:35 AM', sent: true },
      { id: 5, text: 'Hey, are you going to the event tomorrow?', timestamp: '11:00 AM', sent: false },
    ],
    2: [
      { id: 1, text: 'Could you send me those photos from yesterday?', timestamp: '9:15 AM', sent: false },
      { id: 2, text: 'Sure, here they are!', timestamp: '9:20 AM', sent: true },
      { id: 3, text: 'Thanks for sending the photos!', timestamp: '9:25 AM', sent: false },
    ],
    3: [
      { id: 1, text: 'Do you have the information about the new project?', timestamp: '2:05 PM', sent: true },
      { id: 2, text: 'Let me check and get back to you', timestamp: '2:10 PM', sent: false },
    ],
  });

  const sendMessage = (chatId: number) => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: chats[chatId]?.length + 1 || 1,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
    };

    setChats({
      ...chats,
      [chatId]: [...(chats[chatId] || []), newMessage],
    });

    setMessageText('');
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const selectedChat = conversations.find((chat) => chat.id === activeChat);

  return (
    <div className="min-h-screen bg-white pb-16">
      {!activeChat ? (
        <>
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Link to="/" className="mr-2">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-semibold">currentuser</h1>
              </div>
              <button>
                <Edit className="w-6 h-6" />
              </button>
            </div>
          </header>

          <div className="py-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-50"
                onClick={() => setActiveChat(conversation.id)}
              >
                <div className="relative mr-3">
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{conversation.user.username}</h3>
                  <p className={`text-sm ${conversation.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {conversation.time}
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-auto"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <button onClick={() => setActiveChat(null)}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <img
                  src={selectedChat?.user.avatar}
                  alt={selectedChat?.user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h1 className="font-medium">{selectedChat?.user.username}</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button>
                  <Phone className="w-5 h-5" />
                </button>
                <button>
                  <Video className="w-5 h-5" />
                </button>
                <button>
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            <AnimatePresence>
              {chats[activeChat]?.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
                      message.sent
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-900 rounded-tl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sent ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Typing indicator */}
            {selectedChat?.user.online && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-1"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
              </motion.div>
            )}
          </div>

          <div className="sticky bottom-16 bg-white border-t border-gray-200 p-3">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-gray-100">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none"
              />
              {messageText.trim() && (
                <button
                  onClick={() => activeChat && sendMessage(activeChat)}
                  className="p-2 rounded-full text-blue-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </>
      )}

      <MobileNavbar />
    </div>
  );
};

export default Messages;