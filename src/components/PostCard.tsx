
import { Heart, Share2 } from 'lucide-react';

interface Post {
  id: number;
  user: {
    username: string;
    avatar: string;
    verified: boolean;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  bookmarked: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onBookmark: (postId: number) => void;
}

export const PostCard = ({ post, onLike, onBookmark }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900">{post.user.username}</h3>
              {post.user.verified && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img
          src={post.image}
          alt="Post content"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(post.id)}
              className={`p-1 transition-colors ${
                post.liked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
              }`}
            >
              <Heart 
                className="w-6 h-6" 
                fill={post.liked ? 'currentColor' : 'none'}
              />
            </button>
            <button className="p-1 text-gray-700 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="p-1 text-gray-700 hover:text-gray-900 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => onBookmark(post.id)}
            className={`p-1 transition-colors ${
              post.bookmarked ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <svg 
              className="w-6 h-6" 
              fill={post.bookmarked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-gray-900">
            {post.likes.toLocaleString()} likes
          </p>
          <div>
            <span className="font-semibold text-gray-900">{post.user.username}</span>
            <span className="text-gray-700 ml-2">{post.caption}</span>
          </div>
          {post.comments > 0 && (
            <button className="text-gray-500 text-sm hover:text-gray-700">
              View all {post.comments} comments
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
