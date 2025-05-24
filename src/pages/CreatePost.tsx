
import { useState, useRef } from 'react';
import { ArrowLeft, Image, Film, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { postService } from '../api/services';

const CreatePost = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'post' | 'reel'>('post');
  const [caption, setCaption] = useState('');
  const [selectedMedia, setSelectedMedia] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedMedia(reader.result as string);
        setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!selectedMedia || !caption.trim()) {
      setError('Please select media and add a caption');
      return;
    }

    setIsPosting(true);
    setError('');

    try {
      console.log('Creating post with:', { caption, media: selectedMedia, type: mediaType });
      
      const postData = {
        caption: caption,
        image: selectedMedia,
        is_reel: activeTab === 'reel'
      };

      const response = await postService.createPost(postData);
      console.log('Post created:', response.data);
      navigate('/home');
    } catch (err: any) {
      console.error('Post creation error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleTabChange = (tab: 'post' | 'reel') => {
    if (tab !== activeTab) {
      setSelectedMedia('');
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h1 className="text-lg font-semibold">
            {activeTab === 'post' ? 'New Post' : 'New Reel'}
          </h1>
          
          <Button 
            onClick={handlePost} 
            variant="ghost" 
            className="text-blue-500 hover:text-blue-700"
            disabled={!selectedMedia || !caption.trim() || isPosting}
          >
            {isPosting ? 'Posting...' : 'Share'}
          </Button>
        </div>
        
        <div className="flex border-b border-gray-200">
          <motion.button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'post' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('post')}
          >
            <div className="flex justify-center items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Post</span>
            </div>
            {activeTab === 'post' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="underline"
              />
            )}
          </motion.button>
          
          <motion.button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'reel' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('reel')}
          >
            <div className="flex justify-center items-center space-x-2">
              <Film className="w-5 h-5" />
              <span>Reel</span>
            </div>
            {activeTab === 'reel' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="underline"
              />
            )}
          </motion.button>
        </div>
      </header>
      
      <div className="pt-28 px-4">
        {error && (
          <motion.p
            className="text-center text-red-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {!selectedMedia ? (
            <motion.div
              key="media-selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === 'post' ? 'Share a photo' : 'Share a video'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {activeTab === 'post' 
                    ? 'Select a photo from your device' 
                    : 'Select a video from your device'
                  }
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Choose {activeTab === 'post' ? 'Photo' : 'Video'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={activeTab === 'post' ? 'image/*' : 'video/*'}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="post-creation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="relative rounded-xl overflow-hidden">
                {mediaType === 'image' ? (
                  <img
                    src={selectedMedia}
                    alt="Selected"
                    className="w-full aspect-square object-cover"
                  />
                ) : (
                  <video
                    src={selectedMedia}
                    className="w-full aspect-square object-cover"
                    controls
                  />
                )}
                <button
                  onClick={() => setSelectedMedia('')}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={`Write a caption... ${activeTab === 'reel' ? 'Add hashtags to reach more people' : ''}`}
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {caption.length}/2,200
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default CreatePost;
