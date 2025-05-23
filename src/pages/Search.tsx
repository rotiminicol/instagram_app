import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useDebounce } from 'use-debounce';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [activePost, setActivePost] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { scrollY } = useScroll();

  // Dynamic header effects
  const headerShadow = useTransform(
    scrollY,
    [0, 10],
    ['0px 2px 4px rgba(0, 0, 0, 0.02)', '0px 4px 12px rgba(0, 0, 0, 0.08)']
  );

  const headerBackground = useTransform(
    scrollY,
    [0, 10],
    ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.98)']
  );

  // Sample data for explore posts with Picsum images
  const explorePosts = Array(15).fill(0).map((_, index) => ({
    id: index + 1,
    image: `https://picsum.photos/300/300?random=${index + 1}`,
    likes: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 100) + 10,
  }));

  // Mock search results with Picsum images
  const searchResults = debouncedQuery
    ? Array(4).fill(0).map((_, index) => ({
        id: index + 1,
        username: `user_${debouncedQuery.toLowerCase().replace(/\s+/g, '_')}_${index}`,
        avatar: `https://picsum.photos/50/50?random=${index + 1}`,
        isFollowing: Math.random() > 0.5,
      }))
    : [];

  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 800);
      return () => clearTimeout(timer);
    }
  }, [debouncedQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  // Fallback image for error handling
  const fallbackImage = 'https://picsum.photos/300/300?random=0';

  return (
    <div className="pb-16 relative">
      {/* Animated Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 backdrop-blur-sm"
        style={{
          boxShadow: headerShadow,
          background: headerBackground,
        }}
      >
        <div className="p-4">
          <motion.div
            className="relative"
            initial={false}
            animate={{
              scale: searchQuery ? 1 : 1,
            }}
          >
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.header>

      {/* Content Area */}
      <div className="pt-20 px-1">
        <AnimatePresence mode="wait">
          {debouncedQuery ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {isSearching ? (
                <motion.div
                  className="flex justify-center items-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                </motion.div>
              ) : (
                <>
                  <div className="px-4">
                    <h3 className="font-semibold text-lg mb-3">Accounts</h3>
                    {searchResults.length > 0 ? (
                      <div className="space-y-3">
                        {searchResults.map((user) => (
                          <motion.div
                            key={user.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                                <img
                                  src={user.avatar}
                                  alt={user.username}
                                  className="w-full h-full object-cover rounded-full border-2 border-white"
                                  onError={(e) => (e.currentTarget.src = 'https://picsum.photos/50/50?random=0')}
                                />
                              </div>
                              <div>
                                <p className="font-medium">{user.username}</p>
                                <p className="text-xs text-gray-500">
                                  {user.isFollowing ? 'Following' : 'Suggested for you'}
                                </p>
                              </div>
                            </div>
                            <button
                              className={`px-4 py-1.5 text-sm rounded-lg font-medium ${
                                user.isFollowing
                                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                  : 'bg-purple-500 text-white hover:bg-purple-600'
                              }`}
                            >
                              {user.isFollowing ? 'Following' : 'Follow'}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        className="py-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-gray-500">No results found for "{debouncedQuery}"</p>
                        <p className="text-sm text-gray-400 mt-1">Try searching for something else</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="px-4 pt-6">
                    <h3 className="font-semibold text-lg mb-3">Posts</h3>
                    <div className="grid grid-cols-3 gap-1">
                      {explorePosts.slice(0, 6).map((post) => (
                        <motion.div
                          key={post.id}
                          className="relative aspect-square rounded-md overflow-hidden shadow-sm"
                          whileHover={{ scale: 0.98 }}
                          whileTap={{ scale: 0.95 }}
                          onHoverStart={() => setActivePost(post.id)}
                          onHoverEnd={() => setActivePost(null)}
                        >
                          <img
                            src={post.image}
                            alt={`Search result ${post.id}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => (e.currentTarget.src = fallbackImage)}
                          />
                          <AnimatePresence>
                            {activePost === post.id && (
                              <motion.div
                                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="flex space-x-4 text-white">
                                  <span className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                      />
                                    </svg>
                                    {post.likes.toLocaleString()}
                                  </span>
                                  <span className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                      />
                                    </svg>
                                    {post.comments.toLocaleString()}
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="explore-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-3 gap-1"
            >
              {explorePosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="relative aspect-square rounded-md overflow-hidden shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03, type: 'spring', stiffness: 400 }}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setActivePost(post.id)}
                  onHoverEnd={() => setActivePost(null)}
                >
                  <img
                    src={post.image}
                    alt={`Explore post ${post.id}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = fallbackImage)}
                  />
                  <AnimatePresence>
                    {activePost === post.id && (
                      <motion.div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex space-x-4 text-white">
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            {post.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            {post.comments.toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
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

export default Search;