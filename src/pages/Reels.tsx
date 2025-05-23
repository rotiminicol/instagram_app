import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music, Check, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileNavbar } from '@/components/MobileNavbar';
import { motion, AnimatePresence } from 'framer-motion';

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
  audioThumbnail: string;
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
        avatar: 'https://picsum.photos/100/100?random=1',
        verified: true,
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-clouds-time-lapse-32657-large.mp4',
      caption: 'Chasing sunsets in the mountains! 🌄 #travel #adventure',
      audio: 'Original Audio - Sunset Vibes',
      audioThumbnail: 'https://picsum.photos/50/50?random=101',
      likes: 24563,
      comments: 342,
      liked: false,
    },
    {
      id: 2,
      user: {
        username: 'food_lover',
        avatar: 'https://picsum.photos/100/100?random=2',
        verified: false,
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-preparing-a-delicious-pasta-dish-34632-large.mp4',
      caption: 'Whipping up my signature pasta! 🍝 #foodie #cooking',
      audio: 'Cooking Time - Chill Lo-Fi',
      audioThumbnail: 'https://picsum.photos/50/50?random=102',
      likes: 15784,
      comments: 198,
      liked: true,
    },
    {
      id: 3,
      user: {
        username: 'dance_crew',
        avatar: 'https://picsum.photos/100/100?random=3',
        verified: true,
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-against-a-white-wall-40609-large.mp4',
      caption: 'New dance routine alert! 💃 #dance #choreography',
      audio: 'Beat Drop - Dance Crew',
      audioThumbnail: 'https://picsum.photos/50/50?random=103',
      likes: 32010,
      comments: 456,
      liked: false,
    },
  ]);

  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({});
  const [doubleTap, setDoubleTap] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const reelId = parseInt(video.dataset.reelId || '0');
          if (entry.isIntersecting) {
            video.play();
            setCurrentReelIndex(reels.findIndex((reel) => reel.id === reelId));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [reels]);

  const handleLike = (reelId: number) => {
    setReels(reels.map((reel) =>
      reel.id === reelId
        ? {
            ...reel,
            liked: !reel.liked,
            likes: reel.liked ? reel.likes - 1 : reel.likes + 1,
          }
        : reel
    ));
  };

  const handleDoubleTap = (reelId: number) => {
    if (!reels.find((reel) => reel.id === reelId)?.liked) {
      handleLike(reelId);
      setDoubleTap(reelId);
      setTimeout(() => setDoubleTap(null), 1000);
    }
  };

  const handleToggleFollow = (username: string) => {
    setFollowing((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.muted = !isMuted;
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const reelHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / reelHeight);
    if (newIndex !== currentReelIndex && newIndex >= 0 && newIndex < reels.length) {
      setCurrentReelIndex(newIndex);
    }
  };

  return (
    <div className="h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-20 p-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Reels</h1>
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleMute}
            className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
          <Link to="/" className="hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
            </svg>
          </Link>
        </div>
      </div>

      <div
        className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        onScroll={handleScroll}
      >
        <AnimatePresence>
          {reels.map((reel, index) => (
            <motion.div
              key={reel.id}
              className="h-screen w-full snap-start relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              onDoubleClick={() => handleDoubleTap(reel.id)}
            >
              <video
                ref={(el) => (videoRefs.current[reel.id] = el)}
                data-reel-id={reel.id}
                src={reel.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                preload="metadata"
                onError={() => console.error(`Failed to load video for reel ${reel.id}`)}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>

              {doubleTap === reel.id && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.8 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="w-24 h-24 text-red-500 fill-red-500" />
                </motion.div>
              )}

              <div className="absolute bottom-24 left-4 right-16 z-10">
                <div className="flex items-center mb-3">
                  <Link to={`/profile/${reel.user.username}`} className="flex items-center">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 opacity-80 blur-sm"></div>
                      <img
                        src={reel.user.avatar}
                        alt={reel.user.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white relative z-10"
                        onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?random=0')}
                      />
                    </div>
                    <span className="text-white font-medium mx-2">{reel.user.username}</span>
                    {reel.user.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleFollow(reel.user.username)}
                    className={`ml-2 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm transition-colors ${
                      following[reel.user.username]
                        ? 'bg-gray-500/30 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}
                  >
                    {following[reel.user.username] ? 'Following' : 'Follow'}
                  </motion.button>
                </div>

                <motion.p
                  className="text-white mb-3 max-w-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {reel.caption}
                </motion.p>

                <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                  <Music className="w-4 h-4 text-white mr-2" />
                  <p className="text-white text-xs">{reel.audio}</p>
                </div>
              </div>

              <div className="absolute right-4 bottom-32 z-10 flex flex-col items-center space-y-8">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(reel.id)}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full ${reel.liked ? 'bg-red-500' : 'bg-black/50 backdrop-blur-sm'} flex items-center justify-center`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Heart
                      className={`w-6 h-6 ${reel.liked ? 'text-white fill-white' : 'text-white'}`}
                      fill={reel.liked ? 'currentColor' : 'none'}
                    />
                  </motion.div>
                  <span className="text-white text-xs mt-1.5">{reel.likes.toLocaleString()}</span>
                </motion.button>

                <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-white text-xs mt-1.5">{reel.comments.toLocaleString()}</span>
                </motion.button>

                <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Share2 className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-white text-xs mt-1.5">Share</span>
                </motion.button>

                <Link to={`/audio/${reel.audio}`} className="overflow-hidden border-2 border-white mt-2 rounded-full">
                  <img
                    src={reel.audioThumbnail}
                    alt="Audio thumbnail"
                    className="w-10 h-10 object-cover"
                    onError={(e) => (e.currentTarget.src = 'https://picsum.photos/50/50?random=0')}
                  />
                </Link>
              </div>

              <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/30 rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: currentReelIndex === index ? '100%' : 0 }}
                  transition={{ duration: 10, ease: 'linear' }}
                />
              </div>
yme
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <MobileNavbar />
    </div>
  );
};

export default Reels;