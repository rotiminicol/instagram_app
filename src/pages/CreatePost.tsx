
import { useState } from 'react';
import { ArrowLeft, Image, Film } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MobileNavbar } from '@/components/MobileNavbar';

const CreatePost = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'post' | 'reel'>('post');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  
  const sampleImages = [
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop'
  ];
  
  const handlePost = () => {
    // Mock post creation
    // This would connect to the backend in a real app
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="focus:outline-none">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold">
            {activeTab === 'post' ? 'New Post' : 'New Reel'}
          </h1>
          <Button 
            onClick={handlePost} 
            variant="ghost" 
            className="text-blue-500 hover:text-blue-700"
            disabled={!selectedImage || !caption.trim()}
          >
            Share
          </Button>
        </div>
        
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'post'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('post')}
          >
            <div className="flex justify-center items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Post</span>
            </div>
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'reel'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('reel')}
          >
            <div className="flex justify-center items-center space-x-2">
              <Film className="w-5 h-5" />
              <span>Reel</span>
            </div>
          </button>
        </div>
      </header>
      
      <div className="pt-28 px-4">
        {!selectedImage ? (
          <div>
            <p className="text-lg font-medium text-center mb-6">Select an image to share</p>
            <div className="grid grid-cols-2 gap-4">
              {sampleImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img
                    src={image}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button
                onClick={() => setSelectedImage('')}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
              >
                ×
              </button>
            </div>
            
            <div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={4}
              />
            </div>
          </div>
        )}
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default CreatePost;
