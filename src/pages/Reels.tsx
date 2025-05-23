
import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileNavbar } from '@/components/MobileNavbar';

interface Reel {
  id: number;
  user: {
    username: string;
    avatar: string;
    verified: boolean;
  };
  videoUrl: string;
  caption: string;
  audio: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const Reels = () => {
  const [reels, setReels] = useState<Reel[]>([
    {
      id: 1,
      user: {
        username: 'travel_adventures',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face',
        verified: true,
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-clouds-time-lapse-32657-large.mp4',
      caption: 'Amazing sunset views from our hike today! 🌄 #travel #adventure #sunset',
      audio: 'Original Audio - travel_adventures',
      likes: 24563,
      comments: 342,
      liked: false,
    },
    {
      id: 2,
      user: {
        username: 'food_lover',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: false,
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-preparing-a-delicious-pasta-dish-34632-large.mp4',
      caption: 'Making my favorite pasta recipe! 🍝 #food #cooking #homemade',
      audio: 'Cooking Time - food_lover',
      likes: 15784,
      comments: 198,
      liked: true,
    },
  ]);

  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const videoRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});
  
  useEffect(() => {
    // Pause all videos and play only the current one
    Object.keys(videoRefs.current).forEach((id) => {
      const videoId = parseInt(id);
      if (videoRefs.current[videoId]) {
        if (videoId === reels[currentReelIndex]?.id) {
          videoRefs.current[videoId]?.play();
        } else {
          videoRefs.current[videoId]?.pause();
        }
      }
    });
  }, [currentReelIndex, reels]);

  const handleLike = (reelId: number) => {
    setReels(reels.map(reel => 
      reel.id === reelId 
        ? { 
            ...reel, 
            liked: !reel.liked, 
            likes: reel.liked ? reel.likes - 1 : reel.likes + 1 
          }
        : reel
    ));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const reelHeight = container.clientHeight;
    
    // Calculate which reel is currently most visible
    const newIndex = Math.round(scrollPosition / reelHeight);
    if (newIndex !== currentReelIndex && newIndex >= 0 && newIndex < reels.length) {
      setCurrentReelIndex(newIndex);
    }
  };

  return (
    <div className="h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-20 p-4 flex justify-between text-white">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Reels</h1>
        <Link to="/" className="hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
          </svg>
        </Link>
      </div>
      
      <div 
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        onScroll={handleScroll}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="h-screen w-full snap-start relative"
          >
            <video
              ref={el => videoRefs.current[reel.id] = el}
              src={reel.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              playsInline
              muted
              preload="auto"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
            
            <div className="absolute bottom-24 left-4 right-16 z-10 animate-fade-in">
              <div className="flex items-center mb-3">
                <Link to={`/profile/${reel.user.username}`} className="flex items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-300 to-pink-300 opacity-70 blur-sm"></div>
                    <img
                      src={reel.user.avatar}
                      alt={reel.user.username}
                      className="w-9 h-9 rounded-full object-cover border-2 border-white relative z-10"
                    />
                  </div>
                  <span className="text-white font-medium mx-2">{reel.user.username}</span>
                  {reel.user.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </Link>
                <button className="ml-2 text-white text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">Follow</button>
              </div>
              
              <p className="text-white mb-3">{reel.caption}</p>
              
              <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                <Music className="w-3 h-3 text-white mr-2" />
                <p className="text-white text-xs">{reel.audio}</p>
              </div>
            </div>
            
            <div className="absolute right-4 bottom-32 z-10 flex flex-col items-center space-y-8">
              <button 
                className="flex flex-col items-center animate-fade-in"
                onClick={() => handleLike(reel.id)}
                style={{animationDelay: '0.2s'}}
              >
                <div className={`w-11 h-11 rounded-full ${reel.liked ? 'bg-red-500' : 'bg-black/30 backdrop-blur-sm'} flex items-center justify-center hover:scale-110 transition-transform`}>
                  <Heart 
                    className={`w-6 h-6 ${reel.liked ? 'text-white fill-white' : 'text-white'}`}
                    fill={reel.liked ? 'currentColor' : 'none'}
                  />
                </div>
                <span className="text-white text-xs mt-1.5">{reel.likes.toLocaleString()}</span>
              </button>
              
              <button className="flex flex-col items-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs mt-1.5">{reel.comments.toLocaleString()}</span>
              </button>
              
              <button className="flex flex-col items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs mt-1.5">Share</span>
              </button>
              
              <Link to={`/profile/${reel.user.username}`} className="overflow-hidden border-2 border-white mt-2 animate-pulse animate-fade-in rounded-full" style={{animationDelay: '0.5s'}}>
                <img
                  src={reel.user.avatar}
                  alt="Music thumbnail"
                  className="w-8 h-8 object-cover"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Reels;
