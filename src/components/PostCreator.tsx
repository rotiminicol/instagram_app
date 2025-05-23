
import { useState } from 'react';
import { Image } from 'lucide-react';

interface PostCreatorProps {
  onPost: (post: { image: string; caption: string }) => void;
}

export const PostCreator = ({ onPost }: PostCreatorProps) => {
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const sampleImages = [
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop'
  ];

  const handlePost = () => {
    if (selectedImage && caption.trim()) {
      onPost({ image: selectedImage, caption });
      setCaption('');
      setSelectedImage('');
      setShowPreview(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
          alt="Your profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">Create a post</p>
          <p className="text-sm text-gray-500">Share what's on your mind</p>
        </div>
      </div>

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows={3}
      />

      {!selectedImage && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Choose an image:</p>
          <div className="grid grid-cols-4 gap-2">
            {sampleImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(image);
                  setShowPreview(true);
                }}
                className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
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
      )}

      {selectedImage && showPreview && (
        <div className="mt-4">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full max-h-96 object-cover rounded-lg"
            />
            <button
              onClick={() => {
                setSelectedImage('');
                setShowPreview(false);
              }}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
          <Image className="w-5 h-5" />
          <span className="text-sm font-medium">Add Image</span>
        </button>
        
        <button
          onClick={handlePost}
          disabled={!selectedImage || !caption.trim()}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Post
        </button>
      </div>
    </div>
  );
};
