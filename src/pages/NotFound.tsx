import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error("404 Error", {
      path: location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
    });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, navigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        role="alert"
        aria-live="assertive"
      >
        <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-4"
          >
            404
          </motion.h1>
          <p className="text-xl text-gray-700 mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Redirecting to home in {countdown} seconds...
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Return to homepage"
          >
            Return to Home
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotFound;