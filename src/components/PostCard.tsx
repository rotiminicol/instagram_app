import { Heart, Share2, Bookmark, MessageCircle, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState } from 'react';

interface Post {
  id: number;
  user: {
    username: string;
    avatar: string;
    verified: boolean;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  bookmarked: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onBookmark: (postId: number) => void;
}

export const PostCard = ({ post, onLike, onBookmark }: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const controls = useAnimation();
  const likeControls = useAnimation();

  const handleLike = async () => {
    if (!post.liked) {
      await likeControls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.3 }
      });
    }
    onLike(post.id);
  };

  const handleDoubleClick = () => {
    if (!post.liked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
      onLike(post.id);
    }
  };

  const handleBookmark = () => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    });
    onBookmark(post.id);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900">{post.user.username}</h3>
              {post.user.verified && (
                <motion.div 
                  className="w-4 h-4 text-blue-500"
                  whileHover={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </div>
            <p className="text-sm text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <motion.button 
          className="text-gray-400 hover:text-gray-600"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreHorizontal className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Post Image */}
      <div 
        className="relative cursor-pointer"
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.img
          src={post.image}
          alt="Post content"
          className="w-full aspect-square object-cover"
          animate={{
            filter: isHovered ? 'brightness(0.95)' : 'brightness(1)'
          }}
          transition={{ duration: 0.2 }}
        />
        
        <AnimatePresence>
          {showHeart && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Heart 
                className="w-24 h-24 text-white drop-shadow-lg" 
                fill="currentColor"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleLike}
              className="p-1"
              animate={likeControls}
              whileTap={{ scale: 0.9 }}
            >
              <Heart 
                className="w-6 h-6" 
                fill={post.liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={1.5}
              />
            </motion.button>
            
            <motion.button 
              className="p-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle 
                className="w-6 h-6" 
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              />
            </motion.button>
            
            <motion.button 
              className="p-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 
                className="w-6 h-6" 
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              />
            </motion.button>
          </div>
          
          <motion.button
            onClick={handleBookmark}
            animate={controls}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark 
              className="w-6 h-6" 
              fill={post.bookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </motion.button>
        </div>

        <div className="space-y-2">
          <motion.p 
            className="font-semibold text-gray-900"
            key={`likes-${post.likes}-${post.liked}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {post.likes.toLocaleString()} likes
          </motion.p>
          
          <div className="flex">
            <span className="font-semibold text-gray-900">{post.user.username}</span>
            <span className="text-gray-700 ml-2">{post.caption}</span>
          </div>
          
          {post.comments > 0 && (
            <motion.button 
              className="text-gray-500 text-sm hover:text-gray-700"
              whileHover={{ x: 2 }}
            >
              View all {post.comments} comments
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};