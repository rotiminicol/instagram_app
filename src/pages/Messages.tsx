
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Edit, Phone, Video, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { messageService, conversationService } from '../api/services';

interface Message {
  id: number;
  content: string;
  created_at: string;
  sender: number;
  conversation: number;
}

interface Conversation {
  id: number;
  name: string;
  created_at: string;
  lastMessage?: string;
  participants?: any[];
}

const Messages = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        console.log('Fetching conversations...');
        const response = await conversationService.getConversations();
        console.log('Conversations response:', response.data);
        setConversations(response.data || []);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        // Fallback to mock data
        setConversations([
          {
            id: 1,
            name: 'John Doe',
            created_at: new Date().toISOString(),
            lastMessage: 'Hey, how are you?'
          },
          {
            id: 2,
            name: 'Sarah Wilson',
            created_at: new Date().toISOString(),
            lastMessage: 'Thanks for the photos!'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const fetchMessages = async (conversationId: number) => {
    try {
      console.log('Fetching messages for conversation:', conversationId);
      const response = await messageService.getMessages();
      console.log('Messages response:', response.data);
      
      // Filter messages for this conversation
      const conversationMessages = response.data?.filter(
        (msg: Message) => msg.conversation === conversationId
      ) || [];
      
      setMessages(prev => ({
        ...prev,
        [conversationId]: conversationMessages
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Fallback to mock data
      setMessages(prev => ({
        ...prev,
        [conversationId]: [
          {
            id: 1,
            content: 'Hello there!',
            created_at: new Date().toISOString(),
            sender: 2,
            conversation: conversationId
          },
          {
            id: 2,
            content: 'Hi! How are you doing?',
            created_at: new Date().toISOString(),
            sender: 1,
            conversation: conversationId
          }
        ]
      }));
    }
  };

  const sendMessage = async (conversationId: number) => {
    if (!messageText.trim()) return;

    try {
      console.log('Sending message:', { conversationId, content: messageText });
      const response = await messageService.sendMessage(conversationId, messageText);
      console.log('Message sent:', response.data);

      const newMessage: Message = {
        id: response.data.id || Date.now(),
        content: messageText,
        created_at: new Date().toISOString(),
        sender: 1, // Current user ID
        conversation: conversationId,
      };

      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), newMessage],
      }));

      setMessageText('');
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChatSelect = (chatId: number) => {
    setActiveChat(chatId);
    if (!messages[chatId]) {
      fetchMessages(chatId);
    }
  };

  const selectedChat = conversations.find((chat) => chat.id === activeChat);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pb-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
                <h1 className="text-xl font-semibold">Messages</h1>
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
                onClick={() => handleChatSelect(conversation.id)}
              >
                <div className="relative mr-3">
                  <img
                    src={`https://picsum.photos/50/50?random=${conversation.id}`}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{conversation.name}</h3>
                  <p className="text-sm text-gray-500">
                    {conversation.lastMessage || 'No messages yet'}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(conversation.created_at).toLocaleDateString()}
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
                  src={`https://picsum.photos/50/50?random=${selectedChat?.id}`}
                  alt={selectedChat?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h1 className="font-medium">{selectedChat?.name}</h1>
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
            style={{ height: 'calc(100vh - 140px)' }}
          >
            <AnimatePresence>
              {messages[activeChat]?.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 1 ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
                      message.sender === 1
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-900 rounded-tl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 1 ? 'text-blue-100' : 'text-gray-500'}`}>
                      {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
                onKeyPress={(e) => e.key === 'Enter' && activeChat && sendMessage(activeChat)}
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
