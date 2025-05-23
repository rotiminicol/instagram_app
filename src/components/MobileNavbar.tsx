
import { Home, Search, PlusSquare, Clapperboard, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around h-16">
      <Link to="/home" className="flex flex-col items-center justify-center w-full">
        <Home className={`w-6 h-6 ${path === '/home' ? 'text-black' : 'text-gray-500'}`} />
        <span className="text-xs mt-1 font-medium">Home</span>
      </Link>
      <Link to="/search" className="flex flex-col items-center justify-center w-full">
        <Search className={`w-6 h-6 ${path === '/search' ? 'text-black' : 'text-gray-500'}`} />
        <span className="text-xs mt-1 font-medium">Search</span>
      </Link>
      <Link to="/create" className="flex flex-col items-center justify-center w-full">
        <PlusSquare className={`w-6 h-6 ${path === '/create' ? 'text-black' : 'text-gray-500'}`} />
        <span className="text-xs mt-1 font-medium">Post</span>
      </Link>
      <Link to="/reels" className="flex flex-col items-center justify-center w-full">
        <Clapperboard className={`w-6 h-6 ${path === '/reels' ? 'text-black' : 'text-gray-500'}`} />
        <span className="text-xs mt-1 font-medium">Reels</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center justify-center w-full">
        <User className={`w-6 h-6 ${path === '/profile' ? 'text-black' : 'text-gray-500'}`} />
        <span className="text-xs mt-1 font-medium">Profile</span>
      </Link>
    </div>
  );
};
