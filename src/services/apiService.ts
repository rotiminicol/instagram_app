
import socialAPI from '../api/socialAPI';
import authAPI from '../api/authAPI';

// Auth Services
export const authService = {
  login: (email: string, password: string) => 
    authAPI.post('/auth/login', { email, password }),
  
  signup: (email: string, name: string, password: string) => 
    authAPI.post('/auth/signup', { email, name, password }),
  
  getMe: () => 
    authAPI.get('/auth/me'),
  
  updateProfile: (data: any) => 
    authAPI.patch('/auth/me', data),
};

// Post Services
export const postService = {
  getAllPosts: () => 
    socialAPI.get('/post'),
  
  getPost: (postId: number) => 
    socialAPI.get(`/post/${postId}`),
  
  createPost: (postData: any) => 
    socialAPI.post('/post', postData),
  
  updatePost: (postId: number, data: any) => 
    socialAPI.patch(`/post/${postId}`, data),
  
  deletePost: (postId: number) => 
    socialAPI.delete(`/post/${postId}`),
};

// Like Services
export const likeService = {
  getAllLikes: () => 
    socialAPI.get('/like'),
  
  likePost: (postId: number) => 
    socialAPI.post('/like', { post_id: postId }),
  
  unlikePost: (likeId: number) => 
    socialAPI.delete(`/like/${likeId}`),
  
  getLike: (likeId: number) => 
    socialAPI.get(`/like/${likeId}`),
};

// Comment Services
export const commentService = {
  getAllComments: () => 
    socialAPI.get('/comment'),
  
  getComment: (commentId: number) => 
    socialAPI.get(`/comment/${commentId}`),
  
  createComment: (commentData: any) => 
    socialAPI.post('/comment', commentData),
  
  updateComment: (commentId: number, data: any) => 
    socialAPI.patch(`/comment/${commentId}`, data),
  
  deleteComment: (commentId: number) => 
    socialAPI.delete(`/comment/${commentId}`),
};

// Follow Services
export const followService = {
  getAllFollows: () => 
    socialAPI.get('/follow'),
  
  followUser: (userId: number) => 
    socialAPI.post('/follow', { followee_id: userId }),
  
  unfollowUser: (followId: number) => 
    socialAPI.delete(`/follow/${followId}`),
  
  getFollow: (followId: number) => 
    socialAPI.get(`/follow/${followId}`),
  
  updateFollow: (followId: number, data: any) => 
    socialAPI.patch(`/follow/${followId}`, data),
};

// Repost Services
export const repostService = {
  getAllReposts: () => 
    socialAPI.get('/repost'),
  
  createRepost: (postId: number) => 
    socialAPI.post('/repost', { post_id: postId }),
  
  deleteRepost: (repostId: number) => 
    socialAPI.delete(`/repost/${repostId}`),
  
  getRepost: (repostId: number) => 
    socialAPI.get(`/repost/${repostId}`),
  
  updateRepost: (repostId: number, data: any) => 
    socialAPI.patch(`/repost/${repostId}`, data),
};
