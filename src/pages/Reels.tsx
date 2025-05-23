
import { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Music } from 'lucide-react';
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

  const videoRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});
  
  return (
    <div className="h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-20 p-4 flex justify-between text-white">
        <h1 className="text-xl font-bold">Reels</h1>
        <Link to="/">
          <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
          </svg>
        </Link>
      </div>
      
      <div className="h-full overflow-y-scroll snap-y snap-mandatory">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="h-screen w-full snap-start relative"
          >
            <video
              ref={el => videoRefs.current[reel.id] = el}
              src={reel.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              autoPlay
              muted
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20"></div>
            
            <div className="absolute bottom-20 left-4 right-12 z-10">
              <div className="flex items-center mb-3">
                <img
                  src={reel.user.avatar}
                  alt={reel.user.username}
                  className="w-8 h-8 rounded-full object-cover mr-2 border border-white"
                />
                <span className="text-white font-medium mr-1">{reel.user.username}</span>
                {reel.user.verified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                <button className="ml-2 text-white text-sm font-medium">Follow</button>
              </div>
              
              <p className="text-white mb-3">{reel.caption}</p>
              
              <div className="flex items-center">
                <Music className="w-3 h-3 text-white mr-2" />
                <p className="text-white text-xs">{reel.audio}</p>
              </div>
            </div>
            
            <div className="absolute right-4 bottom-32 z-10 flex flex-col items-center space-y-6">
              <button 
                className="flex flex-col items-center"
                onClick={() => handleLike(reel.id)}
              >
                <Heart 
                  className={`w-7 h-7 ${reel.liked ? 'text-red-500 fill-red-500' : 'text-white'}`}
                  fill={reel.liked ? 'currentColor' : 'none'}
                />
                <span className="text-white text-xs mt-1">{reel.likes.toLocaleString()}</span>
              </button>
              
              <button className="flex flex-col items-center">
                <MessageCircle className="w-7 h-7 text-white" />
                <span className="text-white text-xs mt-1">{reel.comments.toLocaleString()}</span>
              </button>
              
              <button className="flex flex-col items-center">
                <Share2 className="w-7 h-7 text-white" />
                <span className="text-white text-xs mt-1">Share</span>
              </button>
              
              <button className="rounded-md overflow-hidden border-2 border-white mt-2">
                <img
                  src={reel.user.avatar}
                  alt="Music thumbnail"
                  className="w-8 h-8 object-cover"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Reels;
