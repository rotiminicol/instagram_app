
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { MobileNavbar } from '@/components/MobileNavbar';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for explore posts
  const explorePosts = Array(15).fill(0).map((_, index) => ({
    id: index + 1,
    image: `https://images.unsplash.com/photo-${1500000000 + index * 7000000}?w=300&h=300&fit=crop`
  }));
  
  return (
    <div className="pb-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </header>
      
      <div className="pt-20 px-1">
        {searchQuery ? (
          <div className="space-y-4">
            {/* Search results would go here */}
            <p className="px-4 text-gray-500">No results found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {explorePosts.map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img
                  src={post.image}
                  alt={`Explore post ${post.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Search;
