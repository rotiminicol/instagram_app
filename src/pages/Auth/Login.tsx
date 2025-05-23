import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

// Animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// Animation variants for form fields
const formContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameOrEmail && password) {
      localStorage.setItem('authToken', 'dummy-token');
      navigate('/home');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleGoogleLogin = () => {
    localStorage.setItem('authToken', 'dummy-token');
    navigate('/home');
  };

  const handleAppleLogin = () => {
    localStorage.setItem('authToken', 'dummy-token');
    navigate('/home');
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
          Log in to see photos and videos from your friends.
        </p>

        <motion.form
          variants={formContainer}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <motion.div variants={fieldVariants}>
            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              id="usernameOrEmail"
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Log In
            </Button>
          </motion.div>
        </motion.form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="space-y-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={20} />
              <span>Log in with Google</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={handleAppleLogin}
            >
              <FaApple size={20} />
              <span>Log in with Apple</span>
            </Button>
          </motion.div>
        </div>

        <p className="mt-4 text-center text-gray-600">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </p>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;