import { useState, useRef, useEffect } from 'react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Bell, ChevronDown, MessageCircle, PlusCircle, Heart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface User {
  username: string;
  avatar: string;
  verified: boolean;
}

interface Post {
  id: number;
  user: User;
  image?: string;
  video?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  bookmarked: boolean;
  isCarousel?: boolean;
  carouselImages?: string[];
}

interface Story {
  id: number;
  username: string;
  avatar: string;
  image: string;
  isYourStory?: boolean;
  hasNewStory?: boolean;
  isLive?: boolean;
  duration?: number; // Added for Story component compatibility
}

const PostFeed: React.FC<{
  posts: Post[];
  onLike: (postId: number) => void;
  onBookmark: (postId: number) => void;
}> = ({ posts, onLike, onBookmark }) => {
  return (
    <div className="divide-y divide-gray-200">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onDoubleClick={() => onLike(post.id)}
        >
          <div className="flex items-center mb-3">
            <Link to={`/profile/${post.user.username}`} className="flex items-center">
              <img
                src={post.user.avatar}
                alt={post.user.username}
                className="w-10 h-10 rounded-full object-cover mr-3"
                onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?random=0')}
              />
              <span className="font-semibold text-gray-900">{post.user.username}</span>
              {post.user.verified && (
                <Check className="w-4 h-4 ml-1 text-blue-500 bg-blue-100 rounded-full" />
              )}
            </Link>
            <button
              className="ml-auto text-gray-500 hover:text-gray-700"
              onClick={() => onBookmark(post.id)}
            >
              <svg
                className={`w-6 h-6 ${post.bookmarked ? 'fill-gray-800' : 'fill-none'}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
            {post.video ? (
              <video
                src={post.video}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onError={(e) => console.error('Video failed to load:', post.video)}
              />
            ) : post.isCarousel ? (
              <div className="relative">
                <img
                  src={post.carouselImages?.[0] || post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover lazy-load"
                  onError={(e) => (e.currentTarget.src = 'https://picsum.photos/600/600?random=0')}
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {post.carouselImages?.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-white/80"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover lazy-load"
                onError={(e) => (e.currentTarget.src = 'https://picsum.photos/600/600?random=0')}
                loading="lazy"
              />
            )}
            {post.liked && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.8 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-12 h-12 text-red-500 fill-red-500" />
              </motion.div>
            )}
          </div>
          <div className="flex items-center mb-2">
            <button
              className="flex items-center mr-4"
              onClick={() => onLike(post.id)}
            >
              <Heart
                className={`w-6 h-6 mr-1 ${post.liked ? 'text-red-500 fill-red-500' : 'text-gray-800'}`}
                fill={post.liked ? 'currentColor' : 'none'}
              />
              <span className="text-sm text-gray-600">{post.likes.toLocaleString()}</span>
            </button>
            <Link to={`/post/${post.id}/comments`} className="flex items-center">
              <svg
                className="w-6 h-6 mr-1 text-gray-800"
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
              <span className="text-sm text-gray-600">{post.comments.toLocaleString()}</span>
            </Link>
          </div>
          <p className="text-sm text-gray-900">
            <span className="font-semibold">{post.user.username}</span> {post.caption}
          </p>
          <p className="text-xs text-gray-500 mt-1">{post.timestamp}</p>
        </motion.div>
      ))}
    </div>
  );
};

const Home = () => {
  const [showForYouDropdown, setShowForYouDropdown] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ['0px 2px 4px rgba(0, 0, 0, 0.02)', '0px 6px 16px rgba(0, 0, 0, 0.1)']
  );

  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 1)']
  );

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { username: 'johndoe', avatar: 'https://picsum.photos/100/100?random=1', verified: true },
      image: 'https://picsum.photos/600/600?random=2',
      caption: 'Chasing sunsets by the lake 🌅 #nature #photography',
      likes: 1247,
      comments: 89,
      timestamp: '2h',
      liked: false,
      bookmarked: false,
    },
    {
      id: 2,
      user: { username: 'sarahwilson', avatar: 'https://picsum.photos/100/100?random=3', verified: false },
      video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-clouds-time-lapse-32657-large.mp4',
      caption: 'Morning run vibes 🏃‍♀️ #fitness #sunrise',
      likes: 892,
      comments: 156,
      timestamp: '4h',
      liked: true,
      bookmarked: true,
    },
    {
      id: 3,
      user: { username: 'techexplorer', avatar: 'https://picsum.photos/100/100?random=4', verified: true },
      image: 'https://picsum.photos/600/600?random=5',
      caption: 'Late night coding session 💻 #coding #tech',
      likes: 2156,
      comments: 243,
      timestamp: '6h',
      liked: false,
      bookmarked: false,
    },
    {
      id: 4,
      user: { username: 'foodieheaven', avatar: 'https://picsum.photos/100/100?random=6', verified: false },
      image: 'https://picsum.photos/600/600?random=7',
      caption: 'Homemade pasta perfection 🍝 #food #cooking',
      likes: 1784,
      comments: 198,
      timestamp: '8h',
      liked: true,
      bookmarked: false,
    },
    {
      id: 5,
      user: { username: 'travelbug', avatar: 'https://picsum.photos/100/100?random=8', verified: true },
      isCarousel: true,
      carouselImages: [
        'https://picsum.photos/600/600?random=9',
        'https://picsum.photos/600/600?random=10',
        'https://picsum.photos/600/600?random=11',
      ],
      caption: 'Exploring the mountains 🏔️ #travel #adventure',
      likes: 3201,
      comments: 287,
      timestamp: '10h',
      liked: false,
      bookmarked: true,
    },
    {
      id: 6,
      user: { username: 'artvibes', avatar: 'https://picsum.photos/100/100?random=12', verified: false },
      image: 'https://picsum.photos/600/600?random=13',
      caption: 'New mural in progress 🎨 #art #creativity',
      likes: 987,
      comments: 134,
      timestamp: '12h',
      liked: false,
      bookmarked: false,
    },
    {
      id: 7,
      user: { username: 'fitlife', avatar: 'https://picsum.photos/100/100?random=14', verified: true },
      video: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-against-a-white-wall-40609-large.mp4',
      caption: 'Dance workout session 💪 #fitness #dance',
      likes: 2543,
      comments: 321,
      timestamp: '14h',
      liked: true,
      bookmarked: false,
    },
    {
      id: 8,
      user: { username: 'petlover', avatar: 'https://picsum.photos/100/100?random=15', verified: false },
      image: 'https://picsum.photos/600/600?random=16',
      caption: 'My pup enjoying the park 🐶 #pets #dog',
      likes: 1456,
      comments: 178,
      timestamp: '16h',
      liked: false,
      bookmarked: true,
    },
  ]);

  const stories: Story[] = [
    {
      id: 0,
      username: 'your_story',
      avatar: 'https://picsum.photos/100/100?random=0',
      image: '',
      isYourStory: true,
      duration: 5000,
    },
    ...Array(14).fill(0).map((_, index) => ({
      id: index + 1,
      username: `user_${index + 1}`,
      avatar: `https://picsum.photos/100/100?random=${index + 20}`,
      image: `https://picsum.photos/600/600?random=${index + 34}`,
      hasNewStory: Math.random() > 0.5,
      isLive: index % 4 === 0,
      duration: 5000,
    })),
  ];

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest: number) => {
      setHeaderScrolled(latest > 10);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || img.src;
          }
        });
      },
      { threshold: 0.1 }
    );

    const images = document.querySelectorAll('.lazy-load');
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = storiesRef.current;
    if (!container) return;

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;
    let velocity = 0;
    let lastX: number;
    let animationFrame: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      lastX = startX;
      cancelAnimationFrame(animationFrame);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
      velocity = (x - lastX) * 0.1;
      lastX = x;
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const animate = () => {
        container.scrollLeft -= velocity;
        velocity *= 0.95;
        if (Math.abs(velocity) > 0.1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleLike = (postId: number) => {
    setPosts(posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
    ));
  };

  const forYouOptions = ['Following', 'Favorites', 'Explore', 'Friends'];

  return (
    <div className="pb-20 relative bg-gray-50 min-h-screen font-sans">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50"
        style={{
          backdropFilter: 'blur(12px)',
          boxShadow: headerShadow,
          background: headerBackground,
        }}
      >
        <div className="flex items-center justify-between p-4 max-w-screen-md mx-auto w-full">
          <div className="relative">
            <motion.button
              className="flex items-center space-x-1 font-bold text-lg"
              onClick={() => setShowForYouDropdown(!showForYouDropdown)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                For You
              </span>
              <motion.div
                animate={{ rotate: showForYouDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-gray-800" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {showForYouDropdown && (
                <motion.div
                  className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-2 w-40 border border-gray-100/50 z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                  {forYouOptions.map((option) => (
                    <motion.button
                      key={option}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 text-sm"
                      onClick={() => setShowForYouDropdown(false)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex space-x-5">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/notifications">
                <Bell className="w-6 h-6 text-gray-800" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/messages">
                <MessageCircle className="w-6 h-6 text-gray-800" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="pt-16 max-w-screen-md mx-auto">
        <div className="relative bg-white py-4 shadow-sm">
          <div
            className="overflow-x-auto no-scrollbar px-4 py-2 scroll-snap-x"
            ref={storiesRef}
          >
            <div className="flex space-x-4">
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  className="flex flex-col items-center space-y-1 relative flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: story.id * 0.05, type: 'spring' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setActiveStory(story.id)}
                  onHoverEnd={() => setActiveStory(null)}
                >
                  <Link
                    to={story.isYourStory ? '/create-story' : `/stories/${story.id}`}
                    className="flex flex-col items-center group"
                  >
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full p-[2px] ${
                          story.isYourStory
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                            : story.hasNewStory
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                            : 'bg-gradient-to-r from-gray-300 to-gray-400'
                        }`}
                      ></div>
                      <div className="relative rounded-full p-0.5 bg-white">
                        <img
                          src={story.avatar}
                          alt={story.username}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white lazy-load"
                          data-src={story.avatar}
                          onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?random=0')}
                          loading="lazy"
                        />
                        {story.isYourStory && (
                          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                            <PlusCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {story.isLive && (
                          <div className="absolute bottom-0 left-0 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full border-2 border-white">
                            Live
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 truncate max-w-[70px] group-hover:text-gray-900 transition-colors">
                      {story.username}
                    </span>
                  </Link>
                  {activeStory === story.id && !story.isYourStory && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-t-xl overflow-hidden shadow-sm"
        >
          <PostFeed posts={posts} onLike={handleLike} onBookmark={handleBookmark} />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-40"
      >
        <MobileNavbar />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 z-50"
        style={{ scaleX: useTransform(scrollY, [0, 500], [0, 1]) }}
      />
    </div>
  );
};

export default Home;