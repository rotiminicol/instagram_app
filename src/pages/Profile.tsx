
import { useState, useEffect } from 'react';
import { Settings, MoreHorizontal, Grid, Bookmark, UserPlus, UserCheck } from 'lucide-react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { authService, postService, followService } from '../api/services';
import { motion } from 'framer-motion';

interface User {
  id: number;
  username: string;
  name: string;
  bio?: string;
  profile_image?: string;
  posts_count?: number;
  followers_count?: number;
  following_count?: number;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authService.getMe();
      setUser({
        ...response.data,
        posts_count: 0,
        followers_count: 0,
        following_count: 0
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await postService.getPosts();
      // Filter posts by current user (you'll need to implement this properly)
      setPosts([]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pb-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">{user?.username}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Settings className="w-6 h-6" />
            <MoreHorizontal className="w-6 h-6" />
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {user?.profile_image ? (
              <img
                src={user.profile_image}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <div className="font-semibold text-lg">{user?.posts_count || 0}</div>
                <div className="text-gray-500 text-sm">Posts</div>
              </div>
              <div>
                <div className="font-semibold text-lg">{user?.followers_count || 0}</div>
                <div className="text-gray-500 text-sm">Followers</div>
              </div>
              <div>
                <div className="font-semibold text-lg">{user?.following_count || 0}</div>
                <div className="text-gray-500 text-sm">Following</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-gray-900">{user?.name}</h2>
          {user?.bio && (
            <p className="text-gray-700 mt-1">{user.bio}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-medium">
            Edit Profile
          </button>
          <button className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-medium">
            Share Profile
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 flex items-center justify-center ${
              activeTab === 'posts' ? 'border-b-2 border-black' : ''
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 flex items-center justify-center ${
              activeTab === 'saved' ? 'border-b-2 border-black' : ''
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <Grid className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Posts Yet</h3>
              <p className="text-gray-500">When you share photos, they'll appear on your profile.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post: any) => (
                <div key={post.id} className="aspect-square bg-gray-100">
                  <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
};

export default Profile;
