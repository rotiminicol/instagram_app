import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Heart, Bookmark, MessageCircle, MoreHorizontal, Check, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
  id: number;
  username: string;
  avatar: string;
  image: string;
  isYourStory?: boolean;
  hasNewStory?: boolean;
  isLive?: boolean;
  duration: number;
  verified?: boolean;
}

const Story = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(parseInt(id || '1') - 1);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const stories: Story[] = [
    {
      id: 0,
      username: 'your_story',
      avatar: 'https://picsum.photos/100/100?random=0',
      image: '',
      isYourStory: true,
      duration: 5000,
      verified: false,
    },
    ...Array(14).fill(0).map((_, index) => ({
      id: index + 1,
      username: `user_${index + 1}`,
      avatar: `https://picsum.photos/100/100?random=${index + 20}`,
      image: `https://picsum.photos/600/600?random=${index + 34}`,
      hasNewStory: Math.random() > 0.5,
      isLive: index % 4 === 0,
      duration: 5000,
      verified: Math.random() > 0.5,
    })),
  ];

  useEffect(() => {
    if (paused || stories[currentStoryIndex].isYourStory) return;

    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        goToNextStory();
      }
    }, stories[currentStoryIndex].duration / 100);

    return () => clearTimeout(timer);
  }, [progress, paused, currentStoryIndex, stories]);

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      window.history.back();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      goToNextStory();
    } else {
      goToPrevStory();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 font-sans">
      <div className="absolute top-4 left-0 right-0 flex gap-1 px-2 z-50">
        {stories.map((story, index) => (
          <div key={story.id} className="h-1 bg-gray-600 rounded-full flex-1">
            {index === currentStoryIndex && !story.isYourStory && (
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            )}
            {index < currentStoryIndex && (
              <div className="h-full bg-white rounded-full" />
            )}
          </div>
        ))}
      </div>

      <div
        className="relative h-full w-full flex items-center justify-center"
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {stories[currentStoryIndex].isYourStory ? (
          <div className="flex flex-col items-center justify-center text-white">
            <PlusCircle className="w-16 h-16 mb-4" />
            <span className="text-lg font-semibold">Create Your Story</span>
          </div>
        ) : (
          <img
            src={stories[currentStoryIndex].image}
            alt={`Story ${stories[currentStoryIndex].id}`}
            className="max-h-full max-w-full object-contain lazy-load"
            onError={(e) => (e.currentTarget.src = 'https://picsum.photos/600/600?random=0')}
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 flex">
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={() => handleSwipe('right')}
          />
          <div
            className="w-1/3 h-full"
          />
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={() => handleSwipe('left')}
          />
        </div>

        <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 pt-6">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-white">
              <X className="w-8 h-8" />
            </Link>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <div className="relative rounded-full p-0.5 bg-black">
                  <img
                    src={stories[currentStoryIndex].avatar}
                    alt={stories[currentStoryIndex].username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-black lazy-load"
                    data-src={stories[currentStoryIndex].avatar}
                    onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?random=0')}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Link to={`/profile/${stories[currentStoryIndex].username}`}>
                  <span className="text-white font-semibold text-sm">
                    {stories[currentStoryIndex].username}
                  </span>
                </Link>
                {stories[currentStoryIndex].verified && (
                  <Check className="w-4 h-4 text-blue-500 bg-blue-100 rounded-full" />
                )}
              </div>
            </div>
          </div>
          <button className="text-white">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        {!stories[currentStoryIndex].isYourStory && (
          <div className="absolute bottom-4 left-0 right-0 px-4 pb-6">
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Send message"
                className="bg-black/50 text-white border border-white/30 rounded-full px-4 py-2 flex-1 max-w-md focus:outline-none focus:border-white/50 text-sm"
              />
              <div className="flex space-x-4 ml-4">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Heart className="w-6 h-6 text-white" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <MessageCircle className="w-6 h-6 text-white" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Bookmark className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Story;
