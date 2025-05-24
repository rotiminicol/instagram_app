import { useState, useRef, useEffect } from 'react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Bell, ChevronDown, MessageCircle, PlusCircle, Heart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import socialAPI from '../api/socialAPI';

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
  duration?: number;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');

      try {
        console.log('Fetching posts...');
        const response = await socialAPI.get('/post');
        console.log('Posts response:', response.data);
        setPosts(response.data.map((post: any) => ({
          id: post.id,
          user: {
            username: post.user?.username || 'unknown',
            avatar: post.user?.avatar || `https://picsum.photos/100/100?random=${post.id}`,
            verified: post.user?.verified || false,
          },
          image: post.image_url,
          video: post.video_url,
          caption: post.caption || '',
          likes: post.likes_count || 0,
          comments: post.comments_count || 0,
          timestamp: post.created_at || 'Recent',
          liked: post.is_liked || false,
          bookmarked: post.is_bookmarked || false,
          isCarousel: post.is_carousel || false,
          carouselImages: post.carousel_images || [],
        })));
      } catch (err: any) {
        console.error('Posts error:', err.response?.data || err.message);
        // Show placeholder data if API fails
        setPosts([
          {
            id: 1,
            user: { username: 'john_doe', avatar: 'https://picsum.photos/100/100?random=1', verified: true },
            image: 'https://picsum.photos/600/600?random=1',
            caption: 'Beautiful sunset today! 🌅',
            likes: 234,
            comments: 12,
            timestamp: '2h',
            liked: false,
            bookmarked: false,
          },
          {
            id: 2,
            user: { username: 'jane_smith', avatar: 'https://picsum.photos/100/100?random=2', verified: false },
            image: 'https://picsum.photos/600/600?random=2',
            caption: 'Coffee and code ☕💻',
            likes: 89,
            comments: 5,
            timestamp: '4h',
            liked: true,
            bookmarked: true,
          }
        ]);
        setError('Using demo data. Connect to see real posts.');
      } finally {
        setLoading(false);
      }
    };

    const fetchStories = async () => {
      try {
        console.log('Fetching stories...');
        // Since stories endpoint might not exist, use placeholder data
        setStories([
          { id: 1, username: 'Your Story', avatar: 'https://picsum.photos/100/100?random=20', image: 'https://picsum.photos/600/600?random=34', isYourStory: true, hasNewStory: false },
          { id: 2, username: 'alex_photo', avatar: 'https://picsum.photos/100/100?random=21', image: 'https://picsum.photos/600/600?random=35', hasNewStory: true, isLive: false },
          { id: 3, username: 'travel_life', avatar: 'https://picsum.photos/100/100?random=22', image: 'https://picsum.photos/600/600?random=36', hasNewStory: true, isLive: true },
        ]);
      } catch (err: any) {
        console.error('Stories error:', err.response?.data || err.message);
      }
    };

    fetchPosts();
    fetchStories();
  }, []);

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

  const handleLike = async (postId: number) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      console.log('Liking post:', postId);
      await socialAPI.post('/like', { post_id: postId });
      setPosts(posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      ));
    } catch (err: any) {
      console.error('Like error:', err.response?.data || err.message);
      // Still update UI optimistically
      setPosts(posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      ));
    }
  };

  const handleBookmark = async (postId: number) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      console.log('Bookmarking post:', postId);
      await socialAPI.patch(`/post/${postId}`, { is_bookmarked: !post.bookmarked });
      setPosts(posts.map((p) =>
        p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
      ));
    } catch (err: any) {
      console.error('Bookmark error:', err.response?.data || err.message);
      // Still update UI optimistically
      setPosts(posts.map((p) =>
        p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
      ));
    }
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
          <div className="flex items-center">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0C17.4903 0 16.6667 0.0276923 14.1077 0.144C11.5487 0.260308 9.80564 0.666615 8.27939 1.26C6.69128 1.88308 5.35354 2.69539 4.02667 4.02667C2.69538 5.35354 1.88308 6.69128 1.26 8.27939C0.666615 9.80564 0.260308 11.5487 0.144 14.1077C0.0276923 16.6667 0 17.4903 0 24C0 30.5097 0.0276923 31.3333 0.144 33.8923C0.260308 36.4513 0.666615 38.1944 1.26 39.7206C1.88308 41.3087 2.69539 42.6465 4.02667 43.9733C5.35354 45.3046 6.69128 46.1169 8.27939 46.74C9.80564 47.3334 11.5487 47.7397 14.1077 47.856C16.6667 47.9723 17.4903 48 24 48C30.5097 48 31.3333 47.9723 33.8923 47.856C36.4513 47.7397 38.1944 47.3334 39.7206 46.74C41.3087 46.1169 42.6465 45.3046 43.9733 43.9733C45.3046 42.6465 46.1169 41.3087 46.74 39.7206C47.3334 38.1944 47.7397 36.4513 47.856 33.8923C47.9723 31.3333 48 30.5097 48 24C48 17.4903 47.9723 16.6667 47.856 14.1077C47.7397 11.5487 47.3334 9.80564 46.74 8.27939C46.1169 6.69128 45.3046 5.35354 43.9733 4.02667C42.6465 2.69538 41.3087 1.88308 39.7206 1.26C38.1944 0.666615 36.4513 0.260308 33.8923 0.144C31.3333 0.0276923 30.5097 0 24 0Z"
                fill="url(#paint0_radial)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(12 48) rotate(-90) scale(48 48.0016)"
                >
                  <stop stopColor="#FFDD55" />
                  <stop offset="0.1" stopColor="#FFDD55" />
                  <stop offset="0.5" stopColor="#FF543E" />
                  <stop offset="1" stopColor="#C837AB" />
                </radialGradient>
              </defs>
            </svg>
            <div className="relative">
              <motion.button
                className="flex items-center text-lg font-semibold text-gray-900"
                onClick={() => setShowForYouDropdown(!showForYouDropdown)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                For You
                <ChevronDown className="w-5 h-5 ml-1" />
              </motion.button>
              <AnimatePresence>
                {showForYouDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-10 left-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-40"
                  >
                    {forYouOptions.map((option) => (
                      <button
                        key={option}
                        className="w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100"
                        onClick={() => {
                          setShowForYouDropdown(false);
                          // TODO: Implement feed filtering logic
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/create-post" className="text-gray-600 hover:text-gray-900">
              <PlusCircle className="w-6 h-6" />
            </Link>
            <Link to="/notifications" className="text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-gray-900">
              <MessageCircle className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="pt-16 max-w-screen-md mx-auto w-full">
        {error && (
          <motion.p
            className="text-center text-red-500 mx-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <div
              ref={storiesRef}
              className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide"
            >
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  className="flex flex-col items-center w-20 flex-shrink-0"
                  onClick={() => setActiveStory(story.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div
                      className={`absolute -inset-1 rounded-full ${
                        story.hasNewStory
                          ? 'bg-gradient-to-tr from-purple-400 to-pink-400'
                          : 'bg-gray-200'
                      }`}
                    />
                    <img
                      src={story.avatar}
                      alt={story.username}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-white"
                      onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?random=0')}
                    />
                    {story.isLive && (
                      <div className="absolute bottom-0 right-0 bg-red-500 text-white text-xs px-1 rounded">
                        LIVE
                      </div>
                    )}
                    {story.isYourStory && (
                      <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-200">
                        <PlusCircle className="w-4 h-4 text-purple-500" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-900 truncate w-full text-center">
                    {story.isYourStory ? 'Your Story' : story.username}
                  </span>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {activeStory !== null && (
                <motion.div
                  className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.img
                    src={stories.find((s) => s.id === activeStory)?.image}
                    alt="Story"
                    className="max-h-full max-w-full object-contain"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => (e.currentTarget.src = 'https://picsum.photos/600/600?random=0')}
                  />
                  <button
                    className="absolute top-4 right-4 text-white"
                    onClick={() => setActiveStory(null)}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <PostFeed posts={posts} onLike={handleLike} onBookmark={handleBookmark} />
          </>
        )}
      </main>

      <MobileNavbar />
    </div>
  );
};

export default Home;
