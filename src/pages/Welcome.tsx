
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        {/* Instagram Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <svg
            width="175"
            height="51"
            viewBox="0 0 175 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M6.5 0C2.9 0 0 2.9 0 6.5V44.5C0 48.1 2.9 51 6.5 51H44.5C48.1 51 51 48.1 51 44.5V6.5C51 2.9 48.1 0 44.5 0H6.5ZM25.5 12.75C30.9 12.75 38.25 13.26 38.25 25.5C38.25 37.74 30.9 38.25 25.5 38.25C20.1 38.25 12.75 37.74 12.75 25.5C12.75 13.26 20.1 12.75 25.5 12.75ZM25.5 17.85C22.44 17.85 17.85 18.36 17.85 25.5C17.85 32.64 22.44 33.15 25.5 33.15C28.56 33.15 33.15 32.64 33.15 25.5C33.15 18.36 28.56 17.85 25.5 17.85ZM39.78 12.75C41.31 12.75 42.84 14.28 42.84 15.81C42.84 17.34 41.31 18.87 39.78 18.87C38.25 18.87 36.72 17.34 36.72 15.81C36.72 14.28 38.25 12.75 39.78 12.75Z"
              fill="currentColor"
            />
            <path
              d="M57.3359 0.640625V50H62.8047V0.640625H57.3359Z"
              fill="currentColor"
            />
            <path
              d="M75.457 14.4531C81.5508 14.4531 85.7617 18.2422 85.7617 25.3203C85.7617 32.3984 81.5508 36.1875 75.457 36.1875C69.3633 36.1875 65.1523 32.3984 65.1523 25.3203C65.1523 18.2422 69.3633 14.4531 75.457 14.4531ZM75.457 19.1406C72.1133 19.1406 70.2148 21.4648 70.2148 25.3203C70.2148 29.1758 72.1133 31.5 75.457 31.5C78.8008 31.5 80.6992 29.1758 80.6992 25.3203C80.6992 21.4648 78.8008 19.1406 75.457 19.1406Z"
              fill="currentColor"
            />
            <path
              d="M97.2656 14.4531C101.902 14.4531 104.93 17.0977 104.93 21.2734V35.5H99.8672V22.2422C99.8672 19.8477 98.6367 18.8047 96.6602 18.8047C94.5742 18.8047 93.0977 20.1953 93.0977 22.8398V35.5H88.0352V15.1406H93.0977V17.457C94.2578 15.7734 96.2695 14.4531 97.2656 14.4531Z"
              fill="currentColor"
            />
            <path
              d="M116.402 14.4531C121.465 14.4531 124.598 17.1328 124.598 21.7344V35.5H119.535V32.6836C118.727 34.3672 116.785 36.1875 113.371 36.1875C109.301 36.1875 106.344 33.9609 106.344 30.3125C106.344 26.6289 109.512 24.5078 114.504 24.5078H119.535V21.8281C119.535 19.6016 118.129 18.6289 115.734 18.6289C113.23 18.6289 111.965 19.7539 111.965 21.4375H106.902C106.902 17.1328 110.457 14.4531 116.402 14.4531ZM119.535 27.7383H115.242C112.637 27.7383 111.441 28.6406 111.441 30.2422C111.441 31.8789 112.848 32.8164 115.242 32.8164C117.777 32.8164 119.535 31.1328 119.535 28.8359V27.7383Z"
              fill="currentColor"
            />
            <path
              d="M136.391 14.4531C140.355 14.4531 143.277 16.8125 144.367 20.2812L139.656 21.9648C139.023 19.8828 137.652 18.8047 135.793 18.8047C133.145 18.8047 131.281 21.2383 131.281 25.3203C131.281 29.4023 133.145 31.8359 135.793 31.8359C137.652 31.8359 139.023 30.7578 139.656 28.6758L144.367 30.3594C143.277 33.8281 140.355 36.1875 136.391 36.1875C129.98 36.1875 125.77 32.2617 125.77 25.3203C125.77 18.3789 129.98 14.4531 136.391 14.4531Z"
              fill="currentColor"
            />
            <path
              d="M155.527 14.4531C160.16 14.4531 163.188 17.0977 163.188 21.2734V35.5H158.125V22.2422C158.125 19.8477 156.895 18.8047 154.918 18.8047C152.832 18.8047 151.355 20.1953 151.355 22.8398V35.5H146.293V15.1406H151.355V17.457C152.516 15.7734 154.527 14.4531 155.527 14.4531Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        {/* Phone mockup with app preview */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="w-64 h-[500px] bg-black rounded-[40px] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
              {/* Status bar */}
              <div className="h-6 bg-white flex items-center justify-between px-6 text-xs font-medium">
                <span>9:41</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
              </div>
              
              {/* App preview */}
              <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 mb-1">Share moments</h3>
                    <p className="text-xs text-gray-600">with friends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Instagram
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm">
            Sign up to see photos and videos from your friends and discover accounts you'll love.
          </p>
        </motion.div>
      </div>

      {/* Bottom section with buttons */}
      <div className="px-8 pb-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-3"
        >
          <Button
            className="w-full bg-[#0095F6] hover:bg-[#0095F6]/90 text-white py-3 rounded-lg font-semibold h-12"
            onClick={() => navigate("/register")}
          >
            Create new account
          </Button>

          <div className="text-center">
            <span className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#0095F6] font-semibold hover:underline"
              >
                Log in
              </button>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
