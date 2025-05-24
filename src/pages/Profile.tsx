import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Bookmark, Settings, Edit3, Camera, Heart, Link as LinkIcon } from 'lucide-react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { authService, postService, followService } from '../api/services';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profile, setProfile] = useState({
    username: 'currentuser',
    name: 'Current User',
    bio: 'Photography • Travel • Design | Based in New York | 📩 DM for collabs',
    website: 'https://example.com',
    avatar: 'https://picsum.photos/100/100?random=1',
    cover: 'https://picsum.photos/1600/400?random=2',
    stats: {
      posts: 0,
      followers: 0,
      following: 0,
    },
  });
  const [posts, setPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const coverOpacity = useTransform(scrollY, [0, 200], [1, 0.7]);
  const coverScale = useTransform(scrollY, [0, 200], [1, 1.1]);

  const savedPosts = Array(6).fill(0).map((_, index) => ({
    id: index + 1,
    image: `https://picsum.photos/300/300?random=${index + 15}`,
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 50) + 5,
  }));

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('Fetching profile data...');
        const [userResponse, postsResponse] = await Promise.all([
          authService.getMe(),
          postService.getPosts()
        ]);

        console.log('User data:', userResponse.data);
        console.log('Posts data:', postsResponse.data);

        const userData = userResponse.data;
        setProfile(prev => ({
          ...prev,
          username: userData.username || prev.username,
          name: userData.name || prev.name,
          bio: userData.bio || prev.bio,
          avatar: userData.profile_image || prev.avatar,
          stats: {
            posts: postsResponse.data?.length || 0,
            followers: 0, // Will be updated when we implement followers count
            following: 0, // Will be updated when we implement following count
          }
        }));

        setPosts(postsResponse.data || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const updateData = {
        name: formData.get('name') as string,
        username: formData.get('username') as string,
        bio: formData.get('bio') as string,
      };

      await authService.updateProfile(updateData);
      
      setProfile((prev) => ({
        ...prev,
        ...updateData,
      }));
      setShowEditProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-gray-50 font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold text-gray-900">{profile.username}</h1>
          <div className="flex items-center space-x-4">
            <button className="focus:outline-none" onClick={() => setShowEditProfile(true)}>
              <Edit3 className="w-5 h-5 text-gray-800" />
            </button>
            <Link to="/settings">
              <Settings className="w-5 h-5 text-gray-800" />
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-16" ref={containerRef}>
        {/* Cover Photo */}
        <motion.div className="relative h-48 w-full overflow-hidden" style={{ opacity: coverOpacity, scale: coverScale }}>
          <img
            src={profile.cover}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = 'https://picsum.photos/1600/400?random=0')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        </motion.div>

        <div className="px-4">
          <div className="flex items-center pb-6 relative">
            <motion.div
              className="mr-6 relative -mt-16"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={profile.avatar}
                alt={profile.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?random=0')}
              />
              <button className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1.5 shadow-md">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </motion.div>
            <div className="grid grid-cols-3 gap-4 flex-1 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CountUp end={profile.stats.posts} duration={2} className="font-semibold text-lg text-gray-900" />
                <div className="text-xs text-gray-600">Posts</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CountUp end={profile.stats.followers} duration={2} className="font-semibold text-lg text-gray-900" />
                <div className="text-xs text-gray-600">Followers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CountUp end={profile.stats.following} duration={2} className="font-semibold text-lg text-gray-900" />
                <div className="text-xs text-gray-600">Following</div>
              </motion.div>
            </div>
          </div>

          <div className="pb-6">
            <h2 className="font-semibold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-700">{profile.bio}</p>
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 flex items-center mt-1"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                {profile.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>

          <div className="flex space-x-2 pb-6">
            <Button
              variant="outline"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:from-purple-700 hover:to-pink-700"
              onClick={() => setShowEditProfile(true)}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="px-4 bg-white border-gray-300 hover:bg-gray-100"
            >
              Share Profile
            </Button>
          </div>

          <div className="overflow-x-auto whitespace-nowrap py-4 px-2 no-scrollbar">
            <style>
              {`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}
            </style>
            <div className="flex space-x-4">
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-purple-400 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 shadow-sm">
                  <span className="text-2xl text-purple-600">+</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">New</span>
              </motion.div>
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div
                  key={item}
                  className="flex flex-col items-center space-y-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 rounded-full border-2 border-purple-300/50 shadow-sm">
                    <img
                      src={`https://picsum.photos/50/50?random=${item + 20}`}
                      alt={`Highlight ${item}`}
                      className="w-full h-full object-cover rounded-full lazy-load"
                      data-src={`https://picsum.photos/50/50?random=${item + 20}`}
                      onError={(e) => (e.currentTarget.src = 'https://picsum.photos/50/50?random=0')}
                    />
                  </div>
                  <span className="text-xs text-gray-600">Highlight {item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex border-t border-gray-200">
            <button
              className={`flex-1 py-3 text-center ${
                activeTab === 'posts'
                  ? 'border-t-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              <Grid className="mx-auto w-5 h-5" />
            </button>
            <button
              className={`flex-1 py-3 text-center ${
                activeTab === 'saved'
                  ? 'border-t-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark className="mx-auto w-5 h-5" />
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-2"
          >
            {activeTab === 'posts' ? (
              <div className="grid grid-cols-3 gap-2">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    onDoubleClick={() => handleLike(post.id)}
                  >
                    <img
                      src={post.image || `https://picsum.photos/300/300?random=${post.id}`}
                      alt={`Post ${post.id}`}
                      className="w-full h-full object-cover lazy-load"
                      onError={(e) => (e.currentTarget.src = 'https://picsum.photos/300/300?random=0')}
                      loading="lazy"
                    />
                    {likedPosts[post.id] && (
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
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {savedPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={post.image}
                      alt={`Saved post ${post.id}`}
                      className="w-full h-full object-cover lazy-load"
                      data-src={post.image}
                      onError={(e) => (e.currentTarget.src = 'https://picsum.photos/300/300?random=0')}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <MobileNavbar />

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="p-6 rounded-2xl max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold text-gray-900">Edit Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveProfile} className="py-4 flex flex-col space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-20 h-20 rounded-full object-cover shadow-md"
                  onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?random=0')}
                />
                <button className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1.5 shadow-md">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <button type="button" className="text-blue-600 text-sm font-medium hover:underline">Change Profile Photo</button>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Name</label>
              <input
                name="name"
                type="text"
                defaultValue={profile.name}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Username</label>
              <input
                name="username"
                type="text"
                defaultValue={profile.username}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Bio</label>
              <textarea
                name="bio"
                defaultValue={profile.bio}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Website</label>
              <input
                name="website"
                type="text"
                defaultValue={profile.website}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>

            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 w-full text-white hover:from-purple-700 hover:to-pink-700">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
