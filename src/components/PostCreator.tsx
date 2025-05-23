import { useState, useCallback } from "react";
import { Image, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";

interface PostCreatorProps {
  onPost: (post: { image: string; caption: string }) => void;
}

export const PostCreator = ({ onPost }: PostCreatorProps) => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const debouncedCaptionChange = useCallback(
    debounce((value: string) => setCaption(value), 300),
    []
  );

  const handlePost = () => {
    if (selectedImage && caption.trim()) {
      try {
        onPost({ image: selectedImage, caption });
        setCaption("");
        setSelectedImage("");
        setShowPreview(false);
        setError(null);
      } catch (err) {
        setError("Failed to create post. Please try again.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
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
        onChange={(e) => debouncedCaptionChange(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        rows={3}
        aria-label="Post caption"
      />

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}

      {!selectedImage && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Choose an image:</p>
          <div className="grid grid-cols-4 gap-2">
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
                aria-label={`Select sample image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Sample ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
          <div className="mt-4">
            <label
              htmlFor="image-upload"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium">Upload Image</span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedImage && showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
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
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80 transition-all"
                aria-label="Remove selected image"
              >
                ×
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
          aria-label="Add image"
        >
          <Image className="w-5 h-5" />
          <span className="text-sm font-medium">Add Image</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePost}
          disabled={!selectedImage || !caption.trim()}
          className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Submit post"
        >
          Post
        </motion.button>
      </div>
    </motion.div>
  );
};