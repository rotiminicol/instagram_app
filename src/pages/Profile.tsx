
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, MessageCircle, Bookmark, Settings } from 'lucide-react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  
  // Sample profile data
  const profile = {
    username: 'currentuser',
    name: 'Current User',
    bio: 'Photography • Travel • Design | Based in New York',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    stats: {
      posts: 127,
      followers: 1452,
      following: 568,
    },
  };
  
  // Sample posts data
  const posts = Array(9).fill(0).map((_, index) => ({
    id: index + 1,
    image: `https://images.unsplash.com/photo-${1500000000 + index * 5000000}?w=300&h=300&fit=crop`,
  }));
  
  return (
    <div className="pb-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">{profile.username}</h1>
          <Link to="/settings">
            <Settings className="w-6 h-6 text-gray-800" />
          </Link>
        </div>
      </header>
      
      <div className="pt-16 px-4">
        <div className="flex items-center pb-6">
          <div className="mr-6">
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 flex-1 text-center">
            <div>
              <div className="font-semibold">{profile.stats.posts}</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div>
              <div className="font-semibold">{profile.stats.followers}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div>
              <div className="font-semibold">{profile.stats.following}</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>
        </div>
        
        <div className="pb-6">
          <h2 className="font-semibold">{profile.name}</h2>
          <p className="text-sm">{profile.bio}</p>
        </div>
        
        <div className="flex space-x-2 pb-6">
          <Button className="flex-1">Edit Profile</Button>
          <Button variant="outline" className="px-4">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex border-t border-gray-200">
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === 'posts'
                ? 'border-t-2 border-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            <Grid className="mx-auto w-5 h-5" />
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === 'saved'
                ? 'border-t-2 border-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark className="mx-auto w-5 h-5" />
          </button>
        </div>
        
        <div className="pt-2">
          {activeTab === 'posts' ? (
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square">
                  <img
                    src={post.image}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-6 text-center">
              <h3 className="font-medium text-gray-900 mb-2">Save</h3>
              <p className="text-sm text-gray-500 mb-6">Save photos and videos that you want to see again.</p>
            </div>
          )}
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Profile;
