import { useState, useRef } from 'react';
import { PostCreator } from '@/components/PostCreator';
import { PostFeed } from '@/components/PostFeed';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useDebounce } from 'use-debounce';

const Index = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop',
      caption: 'Beautiful sunset at the lake 🌅 #nature #photography',
      likes: 1247,
      comments: 89,
      timestamp: '2h',
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      user: {
        username: 'sarahwilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face',
        verified: false
      },
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=600&fit=crop',
      caption: 'My little furry friend enjoying the afternoon sun ☀️ #cats #pets',
      likes: 892,
      comments: 156,
      timestamp: '4h',
      liked: true,
      bookmarked: true
    },
    {
      id: 3,
      user: {
        username: 'techexplorer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=600&fit=crop',
      caption: 'Late night coding session with my setup 💻 #coding #tech #developer',
      likes: 2156,
      comments: 243,
      timestamp: '6h',
      liked: false,
      bookmarked: false
    }
  ]);

  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [debouncedIsCreating] = useDebounce(isCreatingPost, 300);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: containerRef
  });

  // Dynamic effects based on scroll
  const headerShadow = useTransform(
    scrollY,
    [0, 10],
    ['0px 2px 4px rgba(0, 0, 0, 0.02)', '0px 4px 12px rgba(0, 0, 0, 0.08)']
  );

  const headerOpacity = useTransform(
    scrollY,
    [0, 50],
    [1, 0.98]
  );

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  type NewPost = {
    image: string;
    caption: string;
  };

  const handleNewPost = (newPost: NewPost) => {
    setIsCreatingPost(true);
    
    setTimeout(() => {
      const post = {
        id: posts.length + 1,
        user: {
          username: 'currentuser',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
          verified: false
        },
        ...newPost,
        likes: 0,
        comments: 0,
        timestamp: 'now',
        liked: false,
        bookmarked: false
      };
      
      setPosts([post, ...posts]);
      setIsCreatingPost(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Navbar */}
      <motion.div
        style={{
          boxShadow: headerShadow,
          opacity: headerOpacity,
          backdropFilter: 'blur(12px)'
        }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80"
      >
        <Navbar />
      </motion.div>

      <div className="flex max-w-6xl mx-auto pt-16">
        {/* Sidebar with subtle animation */}
        <motion.div 
          className="hidden lg:block w-64 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sidebar />
        </motion.div>

        {/* Main Content */}
        <div 
          ref={containerRef}
          className="flex-1 max-w-2xl mx-auto p-4 overflow-y-auto"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PostCreator 
              onPost={handleNewPost} 
            />
          </motion.div>

          {/* Loading state for new post */}
          <AnimatePresence>
            {debouncedIsCreating && (
              <motion.div
                className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center justify-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="text-blue-500"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                    />
                  </svg>
                </motion.div>
                <span className="ml-2 text-gray-600">Creating your post...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Post Feed with staggered animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <PostFeed 
              posts={posts} 
              onLike={handleLike}
              onBookmark={handleBookmark}
            />
          </motion.div>
        </div>

        {/* Suggestions Sidebar */}
        <motion.div 
          className="hidden xl:block w-80 p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-4 sticky top-20"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <h3 className="font-semibold text-gray-900 mb-4">Suggested for you</h3>
            <div className="space-y-3">
              {[
                { username: 'alexphoto', name: 'Alex Photography', mutual: '5 mutual friends' },
                { username: 'foodielove', name: 'Foodie Adventures', mutual: '12 mutual friends' },
                { username: 'travelbug', name: 'Travel Explorer', mutual: '3 mutual friends' }
              ].map((user, index) => (
                <motion.div 
                  key={user.username}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.mutual}</p>
                    </div>
                  </div>
                  <motion.button 
                    className="text-blue-500 text-sm font-medium hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Follow
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            className="mt-4 text-xs text-gray-400 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-wrap gap-2">
              {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations'].map((item) => (
                <motion.a 
                  key={item}
                  href="#"
                  className="hover:underline"
                  whileHover={{ color: '#000' }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <p>© {new Date().getFullYear()} SOCIALAPP</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;