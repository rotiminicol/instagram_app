
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/services';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(formData.email, formData.password);
      console.log('Login response:', response.data);
      
      // Store authentication data
      localStorage.setItem('authToken', response.data.authToken || response.data.token || 'demo-token');
      localStorage.setItem('token', response.data.authToken || response.data.token || 'demo-token');
      localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
      
      navigate('/home');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // For demo purposes, simulate successful login
    localStorage.setItem('authToken', 'demo-token');
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      email: `demo@${provider}.com`,
      username: `demo_${provider}`,
      name: `Demo ${provider} User`
    }));
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        {/* Instagram Logo */}
        <div className="text-center mb-8">
          <svg
            width="175"
            height="51"
            viewBox="0 0 175 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto text-black"
          >
            <path d="M57.3359 0.640625V50H62.8047V0.640625H57.3359Z" fill="currentColor" />
            <path d="M75.457 14.4531C81.5508 14.4531 85.7617 18.2422 85.7617 25.3203C85.7617 32.3984 81.5508 36.1875 75.457 36.1875C69.3633 36.1875 65.1523 32.3984 65.1523 25.3203C65.1523 18.2422 69.3633 14.4531 75.457 14.4531ZM75.457 19.1406C72.1133 19.1406 70.2148 21.4648 70.2148 25.3203C70.2148 29.1758 72.1133 31.5 75.457 31.5C78.8008 31.5 80.6992 29.1758 80.6992 25.3203C80.6992 21.4648 78.8008 19.1406 75.457 19.1406Z" fill="currentColor" />
            <path d="M97.2656 14.4531C101.902 14.4531 104.93 17.0977 104.93 21.2734V35.5H99.8672V22.2422C99.8672 19.8477 98.6367 18.8047 96.6602 18.8047C94.5742 18.8047 93.0977 20.1953 93.0977 22.8398V35.5H88.0352V15.1406H93.0977V17.457C94.2578 15.7734 96.2695 14.4531 97.2656 14.4531Z" fill="currentColor" />
            <path d="M116.402 14.4531C121.465 14.4531 124.598 17.1328 124.598 21.7344V35.5H119.535V32.6836C118.727 34.3672 116.785 36.1875 113.371 36.1875C109.301 36.1875 106.344 33.9609 106.344 30.3125C106.344 26.6289 109.512 24.5078 114.504 24.5078H119.535V21.8281C119.535 19.6016 118.129 18.6289 115.734 18.6289C113.23 18.6289 111.965 19.7539 111.965 21.4375H106.902C106.902 17.1328 110.457 14.4531 116.402 14.4531ZM119.535 27.7383H115.242C112.637 27.7383 111.441 28.6406 111.441 30.2422C111.441 31.8789 112.848 32.8164 115.242 32.8164C117.777 32.8164 119.535 31.1328 119.535 28.8359V27.7383Z" fill="currentColor" />
            <path d="M136.391 14.4531C140.355 14.4531 143.277 16.8125 144.367 20.2812L139.656 21.9648C139.023 19.8828 137.652 18.8047 135.793 18.8047C133.145 18.8047 131.281 21.2383 131.281 25.3203C131.281 29.4023 133.145 31.8359 135.793 31.8359C137.652 31.8359 139.023 30.7578 139.656 28.6758L144.367 30.3594C143.277 33.8281 140.355 36.1875 136.391 36.1875C129.98 36.1875 125.77 32.2617 125.77 25.3203C125.77 18.3789 129.98 14.4531 136.391 14.4531Z" fill="currentColor" />
            <path d="M155.527 14.4531C160.16 14.4531 163.188 17.0977 163.188 21.2734V35.5H158.125V22.2422C158.125 19.8477 156.895 18.8047 154.918 18.8047C152.832 18.8047 151.355 20.1953 151.355 22.8398V35.5H146.293V15.1406H151.355V17.457C152.516 15.7734 154.527 14.4531 155.527 14.4531Z" fill="currentColor" />
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Phone number, username, or email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0095F6] hover:bg-[#0095F6]/90 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => handleSocialLogin('google')}
            variant="outline"
            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <Button
            onClick={() => handleSocialLogin('apple')}
            variant="outline"
            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </Button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/register')}
            className="text-sm text-gray-600"
          >
            Don't have an account?{' '}
            <span className="text-[#0095F6] font-semibold">Sign up</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
