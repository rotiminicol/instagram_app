
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="flex flex-col min-h-screen bg-white px-4 py-10">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-10">
            Instagram
          </h1>
          
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-500">
                Forgot password?
              </Link>
            </div>
            
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Log In
            </Button>
          </form>
          
          <div className="mt-6 flex items-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <button className="mt-6 w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md">
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#3b5998" d="M44,24c0,11.046-8.954,20-20,20S4,35.046,4,24S12.954,4,24,4S44,12.954,44,24z"/>
              <path fill="#fff" d="M28.8,31.2h-3.6v-9h-2.4v-3.6h2.4v-2.4c0-3.305,0.936-5.4,5.4-5.4h3.6v3.6h-2.4c-1.572,0-1.8,0.618-1.8,1.8v2.4h4.2l-0.6,3.6h-3.6V31.2z"/>
            </svg>
            <span className="text-sm font-medium">Continue with Facebook</span>
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 py-4 mt-10">
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
