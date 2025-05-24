import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import axios from 'axios';

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
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting signup with:', { email, name, password });
      const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:9Y3R7lds/auth/signup', {
        email,
        name,
        password,
      });
      console.log('Signup response:', response.data);
      const { authToken } = response.data;
      localStorage.setItem('token', authToken);
      navigate('/onboarding');
    } catch (err: any) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    alert('Google signup not implemented. Configure OAuth in Xano at /api:9Y3R7lds/auth/google.');
  };

  const handleAppleRegister = () => {
    alert('Apple signup not implemented. Configure OAuth in Xano at /api:9Y3R7lds/auth/apple.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <motion.div
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-6">
          Instagram
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Sign up to see photos and videos from your friends.
        </p>  

        {error && (
          <motion.p
            className="text-center text-red-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <div className="space-y-2 mb-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={handleGoogleRegister}
              disabled={loading}
            >
              <FcGoogle size={20} />
              <span>Sign up with Google</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={handleAppleRegister}
              disabled={loading}
            >
              <FaApple size={20} />
              <span>Sign up with Apple</span>
            </Button>
          </motion.div>
        </div>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <motion.form
          variants={formContainer}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <motion.div variants={fieldVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </motion.div>
        </motion.form>

        <p className="mt-4 text-center text-xs text-gray-500">
          By signing up, you agree to our Terms, Privacy Policy, and Cookies Policy.
        </p>

        <p className="mt-4 text-center text-gray-600">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;