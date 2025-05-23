
import { Home, Search, PlusSquare, Clapperboard, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-gray-200/30 flex justify-around h-16">
      <Link to="/home" className="flex flex-col items-center justify-center w-full">
        <Home className={`w-7 h-7 transition-all duration-300 ${path === '/home' ? 'text-black scale-110 stroke-[2.5px]' : 'text-gray-500'}`} />
      </Link>
      <Link to="/search" className="flex flex-col items-center justify-center w-full">
        <Search className={`w-7 h-7 transition-all duration-300 ${path === '/search' ? 'text-black scale-110 stroke-[2.5px]' : 'text-gray-500'}`} />
      </Link>
      <Link to="/create" className="flex flex-col items-center justify-center w-full">
        <PlusSquare className={`w-7 h-7 transition-all duration-300 ${path === '/create' ? 'text-black scale-110 stroke-[2.5px]' : 'text-gray-500'}`} />
      </Link>
      <Link to="/reels" className="flex flex-col items-center justify-center w-full">
        <Clapperboard className={`w-7 h-7 transition-all duration-300 ${path === '/reels' ? 'text-black scale-110 stroke-[2.5px]' : 'text-gray-500'}`} />
      </Link>
      <Link to="/profile" className="flex flex-col items-center justify-center w-full">
        <User className={`w-7 h-7 transition-all duration-300 ${path === '/profile' ? 'text-black scale-110 stroke-[2.5px]' : 'text-gray-500'}`} />
      </Link>
    </div>
  );
};
