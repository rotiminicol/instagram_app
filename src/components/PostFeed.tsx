
import { PostCard } from './PostCard';

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

interface PostFeedProps {
  posts: Post[];
  onLike: (postId: number) => void;
  onBookmark: (postId: number) => void;
}

export const PostFeed = ({ posts, onLike, onBookmark }: PostFeedProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  );
};
