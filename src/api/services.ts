
import socialAPI from './socialAPI';
import authAPI from './authAPI';

// Auth Services
export const authService = {
  login: (email: string, password: string) => 
    authAPI.post('/auth/login', { email, password }),
  
  signup: (email: string, name: string, password: string, username?: string) => 
    authAPI.post('/auth/signup', { email, name, password, username }),
  
  getMe: () => authAPI.get('/auth/me'),
  
  updateProfile: (data: any) => authAPI.patch('/auth/me', data),
};

// Post Services
export const postService = {
  getPosts: () => socialAPI.get('/post'),
  
  createPost: (data: { caption: string; image?: string }) => 
    socialAPI.post('/post', data),
  
  getPost: (postId: number) => socialAPI.get(`/post/${postId}`),
  
  updatePost: (postId: number, data: any) => 
    socialAPI.patch(`/post/${postId}`, data),
  
  deletePost: (postId: number) => socialAPI.delete(`/post/${postId}`),
};

// Like Services
export const likeService = {
  getLikes: () => socialAPI.get('/like'),
  
  likePost: (postId: number) => 
    socialAPI.post('/like', { post_id: postId }),
  
  unlikePost: (likeId: number) => socialAPI.delete(`/like/${likeId}`),
  
  getLike: (likeId: number) => socialAPI.get(`/like/${likeId}`),
};

// Comment Services
export const commentService = {
  getComments: () => socialAPI.get('/comment'),
  
  createComment: (postId: number, content: string) => 
    socialAPI.post('/comment', { post_id: postId, content }),
  
  getComment: (commentId: number) => socialAPI.get(`/comment/${commentId}`),
  
  updateComment: (commentId: number, content: string) => 
    socialAPI.patch(`/comment/${commentId}`, { content }),
  
  deleteComment: (commentId: number) => socialAPI.delete(`/comment/${commentId}`),
};

// Follow Services
export const followService = {
  getFollows: () => socialAPI.get('/follow'),
  
  followUser: (followedId: number) => 
    socialAPI.post('/follow', { followed_id: followedId }),
  
  unfollowUser: (followId: number) => socialAPI.delete(`/follow/${followId}`),
  
  getFollow: (followId: number) => socialAPI.get(`/follow/${followId}`),
};

// Story Services
export const storyService = {
  getStories: () => socialAPI.get('/story'),
  
  createStory: (data: { media: string }) => 
    socialAPI.post('/story', data),
  
  getStory: (storyId: number) => socialAPI.get(`/story/${storyId}`),
  
  updateStory: (storyId: number, data: any) => 
    socialAPI.patch(`/story/${storyId}`, data),
  
  deleteStory: (storyId: number) => socialAPI.delete(`/story/${storyId}`),
};

// Message Services
export const messageService = {
  getMessages: () => socialAPI.get('/message'),
  
  sendMessage: (conversationId: number, content: string) => 
    socialAPI.post('/message', { conversation: conversationId, content }),
  
  getMessage: (messageId: number) => socialAPI.get(`/message/${messageId}`),
  
  updateMessage: (messageId: number, content: string) => 
    socialAPI.patch(`/message/${messageId}`, { content }),
  
  deleteMessage: (messageId: number) => socialAPI.delete(`/message/${messageId}`),
};

// Notification Services
export const notificationService = {
  getNotifications: () => socialAPI.get('/notification'),
  
  createNotification: (data: any) => 
    socialAPI.post('/notification', data),
  
  getNotification: (notificationId: number) => 
    socialAPI.get(`/notification/${notificationId}`),
  
  markAsRead: (notificationId: number) => 
    socialAPI.patch(`/notification/${notificationId}`, { is_read: true }),
  
  deleteNotification: (notificationId: number) => 
    socialAPI.delete(`/notification/${notificationId}`),
};

// Search Services
export const searchService = {
  search: (query: string) => socialAPI.get(`/search?q=${query}`),
  
  getSearchHistory: () => socialAPI.get('/search'),
  
  saveSearch: (query: string) => socialAPI.post('/search', { query }),
};

// Repost Services
export const repostService = {
  getReposts: () => socialAPI.get('/repost'),
  
  repost: (postId: number) => 
    socialAPI.post('/repost', { post_id: postId }),
  
  unrepost: (repostId: number) => socialAPI.delete(`/repost/${repostId}`),
  
  getRepost: (repostId: number) => socialAPI.get(`/repost/${repostId}`),
};
