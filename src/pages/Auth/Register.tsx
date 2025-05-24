
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { authService } from '../../api/services';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const formContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting signup with:', { email, name, username, password });
      const response = await authService.signup(email, name, password, username);
      console.log('Signup response:', response.data);
      
      const { authToken } = response.data;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('token', authToken); // For API calls
      
      navigate('/home');
    } catch (err: any) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    alert('Google signup not implemented. Configure OAuth in Xano.');
  };

  const handleAppleRegister = () => {
    alert('Apple signup not implemented. Configure OAuth in Xano.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <motion.div
        className="w-full max-w-sm rounded-lg bg-white p-8 border border-gray-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold">Instagram</h1>
        </div>
        
        <p className="text-center text-gray-500 text-sm mb-6 font-semibold">
          Sign up to see photos and videos from your friends.
        </p>

        <div className="space-y-3 mb-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 py-2 border-blue-300 text-white bg-blue-500 hover:bg-blue-600 font-semibold"
              onClick={handleGoogleRegister}
              disabled={loading}
            >
              <FcGoogle size={20} />
              <span>Log in with Google</span>
            </Button>
          </motion.div>
        </div>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm font-semibold">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <motion.form
          variants={formContainer}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <motion.div variants={fieldVariants}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
          </motion.div>
        </motion.form>

        <p className="mt-6 text-center text-xs text-gray-500">
          By signing up, you agree to our Terms, Privacy Policy, and Cookies Policy.
        </p>
      </motion.div>

      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
