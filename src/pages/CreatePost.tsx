import { useState, useRef } from 'react';
import { ArrowLeft, Image, Film, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useDebounce } from 'use-debounce';

const CreatePost = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'post' | 'reel'>('post');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [debouncedCaption] = useDebounce(caption, 300);
  
  // Animation values for the header
  const scrollY = useMotionValue(0);
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 4]);
  
  const sampleImages = [
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop'
  ];
  
  const handlePost = async () => {
    setIsPosting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/');
  };
  
  const handleTabChange = (tab: 'post' | 'reel') => {
    if (tab !== activeTab) {
      setSelectedImage('');
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Animated Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm"
        style={{
          opacity: headerOpacity,
          backdropFilter: headerBlur
        }}
      >
        <div className="flex items-center justify-between p-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="focus:outline-none">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </motion.div>
          
          <motion.h1 
            className="text-lg font-semibold"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'post' ? 'New Post' : 'New Reel'}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button 
              onClick={handlePost} 
              variant="ghost" 
              className="text-blue-500 hover:text-blue-700"
              disabled={!selectedImage || !debouncedCaption.trim() || isPosting}
            >
              {isPosting ? (
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="mr-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                      />
                    </svg>
                  </motion.div>
                  Posting...
                </motion.div>
              ) : 'Share'}
            </Button>
          </motion.div>
        </div>
        
        <div className="flex border-b border-gray-200">
          <motion.button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'post' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('post')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-center items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Post</span>
            </div>
            {activeTab === 'post' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="underline"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
          
          <motion.button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'reel' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('reel')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-center items-center space-x-2">
              <Film className="w-5 h-5" />
              <span>Reel</span>
            </div>
            {activeTab === 'reel' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="underline"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        </div>
      </motion.header>
      
      <div className="pt-28 px-4">
        <AnimatePresence mode="wait">
          {!selectedImage ? (
            <motion.div
              key="image-selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className="text-lg font-medium text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeTab === 'post' ? 'Select an image to share' : 'Select a video to share'}
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, staggerChildren: 0.1 }}
              >
                {sampleImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="aspect-square rounded-lg overflow-hidden relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                    />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="post-creation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <motion.div 
                className="relative rounded-xl overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full aspect-square object-cover"
                />
                <motion.button
                  onClick={() => setSelectedImage('')}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={`Write a caption... ${activeTab === 'reel' ? 'Add hashtags to reach more people' : ''}`}
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
                  rows={4}
                />
                <motion.div 
                  className="text-right text-xs text-gray-500 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {debouncedCaption.length}/2,200
                </motion.div>
              </motion.div>
              
              {activeTab === 'post' && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-medium">Advanced options</h3>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Hide like and view counts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mobile Navbar with subtle animation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <MobileNavbar />
      </motion.div>
    </div>
  );
};

export default CreatePost;