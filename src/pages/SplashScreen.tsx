
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-500 via-pink-500 to-pink-400">
      <div className="animate-scale card-3d">
        <div className="w-24 h-24 mb-6 relative animate-pulse">
          <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl"></div>
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 0C17.4903 0 16.6667 0.0276923 14.1077 0.144C11.5487 0.260308 9.80564 0.666615 8.27939 1.26C6.69128 1.88308 5.35354 2.69539 4.02667 4.02667C2.69538 5.35354 1.88308 6.69128 1.26 8.27939C0.666615 9.80564 0.260308 11.5487 0.144 14.1077C0.0276923 16.6667 0 17.4903 0 24C0 30.5097 0.0276923 31.3333 0.144 33.8923C0.260308 36.4513 0.666615 38.1944 1.26 39.7206C1.88308 41.3087 2.69539 42.6465 4.02667 43.9733C5.35354 45.3046 6.69128 46.1169 8.27939 46.74C9.80564 47.3334 11.5487 47.7397 14.1077 47.856C16.6667 47.9723 17.4903 48 24 48C30.5097 48 31.3333 47.9723 33.8923 47.856C36.4513 47.7397 38.1944 47.3334 39.7206 46.74C41.3087 46.1169 42.6465 45.3046 43.9733 43.9733C45.3046 42.6465 46.1169 41.3087 46.74 39.7206C47.3334 38.1944 47.7397 36.4513 47.856 33.8923C47.9723 31.3333 48 30.5097 48 24C48 17.4903 47.9723 16.6667 47.856 14.1077C47.7397 11.5487 47.3334 9.80564 46.74 8.27939C46.1169 6.69128 45.3046 5.35354 43.9733 4.02667C42.6465 2.69538 41.3087 1.88308 39.7206 1.26C38.1944 0.666615 36.4513 0.260308 33.8923 0.144C31.3333 0.0276923 30.5097 0 24 0Z"
              fill="url(#paint0_radial)"
            />
            <defs>
              <radialGradient
                id="paint0_radial"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(12 48) rotate(-90) scale(48 48.0016)"
              >
                <stop stopColor="#FFDD55" />
                <stop offset="0.1" stopColor="#FFDD55" />
                <stop offset="0.5" stopColor="#FF543E" />
                <stop offset="1" stopColor="#C837AB" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <h1 className="text-white text-2xl font-bold animate-slide-up mt-4 drop-shadow-lg">
        Instagram
      </h1>
      
      <div className="absolute bottom-10 animate-pulse">
        <div className="w-3 h-3 bg-white/70 rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
