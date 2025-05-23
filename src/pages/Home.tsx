
import { useState } from 'react';
import { PostFeed } from '@/components/PostFeed';
import { MobileNavbar } from '@/components/MobileNavbar';
import { Bell, ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="flex items-center justify-between p-4">
          <div className="relative">
            <button 
              className="flex items-center space-x-1 font-semibold text-lg animate-fade-in"
              onClick={() => setShowForYouDropdown(!showForYouDropdown)}
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">For You</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showForYouDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showForYouDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-2 w-40 border border-gray-100/50 z-50 animate-scale">
                {forYouOptions.map(option => (
                  <button 
                    key={option} 
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 hover-scale"
                    onClick={() => setShowForYouDropdown(false)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-5">
            <Link to="/notifications" className="transition-transform hover:scale-110">
              <Bell className="w-6 h-6 text-gray-800" />
            </Link>
            <Link to="/messages" className="transition-transform hover:scale-110">
              <MessageCircle className="w-6 h-6 text-gray-800" />
            </Link>
          </div>
        </div>
      </header>
      
      <div className="pt-16 px-0">
        <ScrollArea className="w-full h-20 whitespace-nowrap">
          <div className="px-4 py-4 border-b border-gray-200/50 flex space-x-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="flex flex-col items-center space-y-1 animate-fade-in" style={{animationDelay: `${item * 0.1}s`}}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px] hover-scale">
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
        </ScrollArea>
        
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
