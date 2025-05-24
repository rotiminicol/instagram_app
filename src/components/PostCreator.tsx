
import { useState, useCallback } from "react";
import { Image, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { postService } from "../api/services";

interface PostCreatorProps {
  onPost?: (post: { image: string; caption: string }) => void;
}

export const PostCreator = ({ onPost }: PostCreatorProps) => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sampleImages = [
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop",
  ];

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setShowPreview(true);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const handlePost = async () => {
    if (selectedImage && caption.trim()) {
      setLoading(true);
      try {
        console.log('Creating post with:', { image: selectedImage, caption });
        const response = await postService.createPost({ 
          caption, 
          image: selectedImage 
        });
        console.log('Post created:', response.data);
        
        if (onPost) {
          onPost({ image: selectedImage, caption });
        }
        
        // Reset form
        setCaption("");
        setSelectedImage("");
        setShowPreview(false);
        setError(null);
      } catch (err: any) {
        console.error('Post creation error:', err);
        setError("Failed to create post. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-b border-gray-200 p-4"
    >
      <div className="flex items-center space-x-3 mb-4">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
          alt="Your profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          placeholder="What's on your mind?"
          className="flex-1 resize-none border-none outline-none text-sm placeholder-gray-500"
          rows={3}
          disabled={loading}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mb-4 px-4 py-2 bg-red-50 rounded-lg"
        >
          {error}
        </motion.p>
      )}

      {!selectedImage && (
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {sampleImages.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedImage(image);
                  setShowPreview(true);
                  setError(null);
                }}
                className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                <img
                  src={image}
                  alt={`Sample ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
          
          <label
            htmlFor="image-upload"
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span className="text-sm font-medium">Add Photo/Video</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={loading}
          />
        </div>
      )}

      <AnimatePresence>
        {selectedImage && showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full max-h-96 object-cover rounded-lg"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedImage("");
                  setShowPreview(false);
                }}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80 transition-all"
                disabled={loading}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-blue-500">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
            disabled={loading}
          >
            <Image className="w-5 h-5" />
            <span className="text-sm font-medium">Photo/Video</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePost}
          disabled={!selectedImage || !caption.trim() || loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Sharing...' : 'Share'}
        </motion.button>
      </div>
    </motion.div>
  );
};
