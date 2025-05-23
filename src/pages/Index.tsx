
import { useState } from 'react';
import { PostCreator } from '@/components/PostCreator';
import { PostFeed } from '@/components/PostFeed';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

const Index = () => {
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

  const handleNewPost = (newPost: any) => {
    const post = {
      id: posts.length + 1,
      user: {
        username: 'currentuser',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        verified: false
      },
      ...newPost,
      likes: 0,
      comments: 0,
      timestamp: 'now',
      liked: false,
      bookmarked: false
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex max-w-6xl mx-auto pt-16">
        <div className="hidden lg:block w-64 p-4">
          <Sidebar />
        </div>
        <div className="flex-1 max-w-2xl mx-auto p-4">
          <PostCreator onPost={handleNewPost} />
          <PostFeed 
            posts={posts} 
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        </div>
        <div className="hidden xl:block w-80 p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">Suggested for you</h3>
            <div className="space-y-3">
              {[
                { username: 'alexphoto', name: 'Alex Photography', mutual: '5 mutual friends' },
                { username: 'foodielove', name: 'Foodie Adventures', mutual: '12 mutual friends' },
                { username: 'travelbug', name: 'Travel Explorer', mutual: '3 mutual friends' }
              ].map((user) => (
                <div key={user.username} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.mutual}</p>
                    </div>
                  </div>
                  <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
