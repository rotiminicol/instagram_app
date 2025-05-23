
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around h-14">
      <Link to="/" className="flex flex-col items-center justify-center w-full">
        <Home className={`w-6 h-6 ${path === '/' ? 'text-black' : 'text-gray-500'}`} />
      </Link>
      <Link to="/search" className="flex flex-col items-center justify-center w-full">
        <Search className={`w-6 h-6 ${path === '/search' ? 'text-black' : 'text-gray-500'}`} />
      </Link>
      <Link to="/create" className="flex flex-col items-center justify-center w-full">
        <PlusSquare className={`w-6 h-6 ${path === '/create' ? 'text-black' : 'text-gray-500'}`} />
      </Link>
      <Link to="/notifications" className="flex flex-col items-center justify-center w-full">
        <Heart className={`w-6 h-6 ${path === '/notifications' ? 'text-black' : 'text-gray-500'}`} />
      </Link>
      <Link to="/profile" className="flex flex-col items-center justify-center w-full">
        <User className={`w-6 h-6 ${path === '/profile' ? 'text-black' : 'text-gray-500'}`} />
      </Link>
    </div>
  );
};
