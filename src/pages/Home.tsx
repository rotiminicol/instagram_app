
import { useState, useRef, useEffect } from 'react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { postService, likeService, storyService } from '../api/services';

interface User {
  id: number;
  username: string;
  profile_image?: string;
  name: string;
}

interface Post {
  id: number;
  caption: string;
  image?: string;
  created_at: string;
  user_id: number;
  user?: User;
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
  is_bookmarked?: boolean;
}

interface Story {
  id: number;
  user: User;
  media: string;
  created_at: string;
  viewed?: boolean;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const storiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();
    fetchStories();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      const response = await postService.getPosts();
      setPosts(response.data || []);
    } catch (err: any) {
      console.error('Posts error:', err);
      // Use placeholder data for demo
      setPosts([
        {
          id: 1,
          caption: 'Beautiful sunset! 🌅',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
          created_at: '2h',
          user_id: 1,
          user: {
            id: 1,
            username: 'joshua_l',
            name: 'Joshua',
            profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
          },
          likes_count: 101,
          comments_count: 0,
          is_liked: false,
          is_bookmarked: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStories = async () => {
    try {
      const response = await storyService.getStories();
      setStories(response.data || []);
    } catch (err: any) {
      // Use placeholder data
      setStories([
        {
          id: 1,
          user: { id: 1, username: 'Your story', name: 'Your story', profile_image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face' },
          media: '',
          created_at: 'now',
          viewed: false
        },
        {
          id: 2,
          user: { id: 2, username: 'karennne', name: 'Karennne', profile_image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face' },
          media: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop',
          created_at: '2h',
          viewed: false
        }
      ]);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      await likeService.likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              is_liked: !post.is_liked,
              likes_count: (post.likes_count || 0) + (post.is_liked ? -1 : 1)
            }
          : post
      ));
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, is_bookmarked: !post.is_bookmarked }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 max-w-screen-md mx-auto">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Instagram
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/notifications" className="relative">
              <Heart className="w-6 h-6 text-black" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </Link>
            <Link to="/messages">
              <Send className="w-6 h-6 text-black" />
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Stories */}
        <div className="border-b border-gray-200 bg-white">
          <div 
            ref={storiesRef}
            className="flex items-center space-x-4 px-4 py-3 overflow-x-auto scrollbar-hide"
          >
            {stories.map((story) => (
              <motion.div
                key={story.id}
                className="flex flex-col items-center space-y-1 flex-shrink-0"
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  {story.id === 1 ? (
                    <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                      <Camera className="w-6 h-6 text-gray-400" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white text-xs font-bold">+</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={`absolute -inset-1 rounded-full ${!story.viewed ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-gray-300'}`} />
                      <img
                        src={story.user.profile_image}
                        alt={story.user.username}
                        className="relative w-16 h-16 rounded-full object-cover border-2 border-white"
                      />
                    </>
                  )}
                </div>
                <span className="text-xs text-gray-900 max-w-[60px] truncate">
                  {story.user.username}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.user?.profile_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'}
                    alt={post.user?.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      {post.user?.username}
                    </p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative aspect-square">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-full object-cover"
                    onDoubleClick={() => handleLike(post.id)}
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => handleLike(post.id)}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart 
                        className={`w-6 h-6 ${post.is_liked ? 'text-red-500' : 'text-black'}`}
                        fill={post.is_liked ? 'currentColor' : 'none'}
                      />
                    </motion.button>
                    <MessageCircle className="w-6 h-6 text-black" />
                    <Send className="w-6 h-6 text-black" />
                  </div>
                  <motion.button
                    onClick={() => handleBookmark(post.id)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark 
                      className={`w-6 h-6 text-black`}
                      fill={post.is_bookmarked ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                </div>

                {/* Likes */}
                {(post.likes_count || 0) > 0 && (
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    {post.likes_count?.toLocaleString()} likes
                  </p>
                )}

                {/* Caption */}
                <div className="text-sm text-gray-900">
                  <span className="font-semibold">{post.user?.username}</span>
                  <span className="ml-2">{post.caption}</span>
                </div>

                {/* Comments */}
                {(post.comments_count || 0) > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    View all {post.comments_count} comments
                  </p>
                )}

                {/* Timestamp */}
                <p className="text-xs text-gray-500 mt-2 uppercase">
                  {post.created_at}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <MobileNavbar />
    </div>
  );
};

export default Home;
