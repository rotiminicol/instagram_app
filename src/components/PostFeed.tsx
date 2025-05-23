import { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { PostCard } from "./PostCard";

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

const PostCardErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Error rendering PostCard:", error);
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Failed to render post. Please try again.
      </div>
    );
  }
};

export const PostFeed = memo(({ posts, onLike, onBookmark }: PostFeedProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".post-card").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [posts]);

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="post-card"
        >
          <PostCardErrorBoundary>
            <PostCard post={post} onLike={onLike} onBookmark={onBookmark} />
          </PostCardErrorBoundary>
        </motion.div>
      ))}
    </div>
  );
});