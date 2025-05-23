
import { Home, Search, PlusSquare, Clapperboard, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-gray-200/30 flex justify-around h-16">
      <Link to="/home" className="flex items-center justify-center w-full relative">
        <div className={`absolute -top-3 w-12 h-1 rounded-full transition-all duration-300 ${path === '/home' ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-100' : 'opacity-0'}`}></div>
        <Home 
          className={`w-7 h-7 transition-all duration-300 ${path === '/home' 
            ? 'text-black scale-110 stroke-[2.5px] drop-shadow-md' 
            : 'text-gray-500'}`} 
          strokeWidth={path === '/home' ? 2.5 : 2}
        />
      </Link>
      <Link to="/search" className="flex items-center justify-center w-full relative">
        <div className={`absolute -top-3 w-12 h-1 rounded-full transition-all duration-300 ${path === '/search' ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-100' : 'opacity-0'}`}></div>
        <Search 
          className={`w-7 h-7 transition-all duration-300 ${path === '/search' 
            ? 'text-black scale-110 stroke-[2.5px] drop-shadow-md' 
            : 'text-gray-500'}`} 
          strokeWidth={path === '/search' ? 2.5 : 2}
        />
      </Link>
      <Link to="/create" className="flex items-center justify-center w-full relative">
        <div className={`absolute -top-3 w-12 h-1 rounded-full transition-all duration-300 ${path === '/create' ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-100' : 'opacity-0'}`}></div>
        <PlusSquare 
          className={`w-7 h-7 transition-all duration-300 ${path === '/create' 
            ? 'text-black scale-110 stroke-[2.5px] drop-shadow-md' 
            : 'text-gray-500'}`} 
          strokeWidth={path === '/create' ? 2.5 : 2}
        />
      </Link>
      <Link to="/reels" className="flex items-center justify-center w-full relative">
        <div className={`absolute -top-3 w-12 h-1 rounded-full transition-all duration-300 ${path === '/reels' ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-100' : 'opacity-0'}`}></div>
        <Clapperboard 
          className={`w-7 h-7 transition-all duration-300 ${path === '/reels' 
            ? 'text-black scale-110 stroke-[2.5px] drop-shadow-md' 
            : 'text-gray-500'}`} 
          strokeWidth={path === '/reels' ? 2.5 : 2}
        />
      </Link>
      <Link to="/profile" className="flex items-center justify-center w-full relative">
        <div className={`absolute -top-3 w-12 h-1 rounded-full transition-all duration-300 ${path === '/profile' ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-100' : 'opacity-0'}`}></div>
        <User 
          className={`w-7 h-7 transition-all duration-300 ${path === '/profile' 
            ? 'text-black scale-110 stroke-[2.5px] drop-shadow-md' 
            : 'text-gray-500'}`} 
          strokeWidth={path === '/profile' ? 2.5 : 2}
        />
      </Link>
    </div>
  );
};
