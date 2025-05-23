
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Bookmark, Settings, Edit3, Camera } from 'lucide-react';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [showEditProfile, setShowEditProfile] = useState(false);
  
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
    <div className="pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">{profile.username}</h1>
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
      
      <div className="pt-16 px-4">
        <div className="flex items-center pb-6">
          <div className="mr-6 relative">
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-20 h-20 rounded-full object-cover border border-gray-200"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <Camera className="w-4 h-4 text-white" />
            </button>
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
          <Button 
            variant="outline"
            className="flex-1 bg-white"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile
          </Button>
          <Button variant="outline" className="px-4 bg-white">
            Share Profile
          </Button>
        </div>
        
        <div className="overflow-x-auto whitespace-nowrap py-4 px-2">
          <div className="flex space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <span className="text-2xl text-gray-400">+</span>
              </div>
              <span className="text-xs mt-1 text-gray-500">New</span>
            </div>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col items-center space-y-1">
                <div className="w-16 h-16 rounded-full border border-gray-200">
                  <img
                    src={`https://images.unsplash.com/photo-${1507000000000 + item * 1000000}?w=50&h=50&fit=crop&crop=face`}
                    alt={`Highlight ${item}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-xs">Highlight {item}</span>
              </div>
            ))}
          </div>
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

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 flex flex-col space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <button className="text-blue-500 text-sm font-medium">Change Profile Photo</button>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Name</label>
              <input 
                type="text"
                defaultValue={profile.name}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Username</label>
              <input 
                type="text"
                defaultValue={profile.username}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Bio</label>
              <textarea
                defaultValue={profile.bio}
                className="w-full border border-gray-300 rounded-md p-2 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Website</label>
              <input 
                type="text"
                placeholder="Website"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
