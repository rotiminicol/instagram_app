
import { useState } from 'react';
import { PostFeed } from '@/components/PostFeed';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Bell, ChevronDown, MessageCircle, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showForYouDropdown, setShowForYouDropdown] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop',
      caption: 'Beautiful sunset at the lake 🌅 #nature #photography',
      likes: 1247,
      comments: 89,
      timestamp: '2h',
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      user: {
        username: 'sarahwilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face',
        verified: false
      },
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=600&fit=crop',
      caption: 'My little furry friend enjoying the afternoon sun ☀️ #cats #pets',
      likes: 892,
      comments: 156,
      timestamp: '4h',
      liked: true,
      bookmarked: true
    },
    {
      id: 3,
      user: {
        username: 'techexplorer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=600&fit=crop',
      caption: 'Late night coding session with my setup 💻 #coding #tech #developer',
      likes: 2156,
      comments: 243,
      timestamp: '6h',
      liked: false,
      bookmarked: false
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  // Options for "For You" dropdown
  const forYouOptions = ['Following', 'Favorites'];

  return (
    <div className="pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="relative">
            <button 
              className="flex items-center space-x-1 font-semibold text-lg"
              onClick={() => setShowForYouDropdown(!showForYouDropdown)}
            >
              <span>For You</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showForYouDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 w-40 border border-gray-100 z-50">
                {forYouOptions.map(option => (
                  <button 
                    key={option} 
                    className="w-full text-left p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setShowForYouDropdown(false)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-5">
            <Link to="/notifications">
              <Bell className="w-6 h-6 text-gray-800" />
            </Link>
            <Link to="/messages">
              <MessageCircle className="w-6 h-6 text-gray-800" />
            </Link>
            <button className="focus:outline-none">
              <Camera className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="pt-16 px-0">
        <div className="overflow-x-auto whitespace-nowrap px-4 py-4 border-b border-gray-200 flex space-x-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="flex flex-col items-center space-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                <div className="bg-white rounded-full w-full h-full p-[2px]">
                  <img
                    src={`https://images.unsplash.com/photo-${1507000000000 + item * 1000000}?w=50&h=50&fit=crop&crop=face`}
                    alt={`Story ${item}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="text-xs">user_{item}</span>
            </div>
          ))}
        </div>
        
        <PostFeed 
          posts={posts} 
          onLike={handleLike}
          onBookmark={handleBookmark}
        />
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Home;
