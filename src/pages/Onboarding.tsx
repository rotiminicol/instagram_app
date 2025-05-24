import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import authAPI from '../api/authAPI';
import socialAPI from '../api/socialAPI';

const stepVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.5, ease: "easeOut" } },
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [suggestedUsers, setSuggestedUsers] = useState<{ id: number; username: string; avatar: string; followed: boolean }[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const interests = [
    "Photography", "Travel", "Food", "Fashion",
    "Fitness", "Music", "Art", "Gaming",
    "Technology", "Nature", "Sports", "Beauty"
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('profile_photo', file);

      try {
        console.log('Uploading profile photo to /auth/me...');
        await authAPI.patch('/auth/me', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Profile photo uploaded');
      } catch (err: any) {
        console.error('Photo upload error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to upload profile photo.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInterestsSave = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Saving interests to /auth/me:', selectedInterests);
      await authAPI.patch('/auth/me', { interests: selectedInterests });
      console.log('Interests saved');
    } catch (err: any) {
      console.error('Interests save error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save interests.');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: number) => {
    setLoading(true);
    setError('');

    try {
      console.log('Following user:', userId);
      await socialAPI.post('/follow', { followee_id: userId });
      setSuggestedUsers(suggestedUsers.map(user =>
        user.id === userId ? { ...user, followed: true } : user
      ));
      console.log('User followed');
    } catch (err: any) {
      console.error('Follow error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to follow user.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (step === 2) {
      await handleInterestsSave();
    }
    if (step === 3) {
      navigate('/home');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="p-4 flex items-center justify-between">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full ${i <= step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'} ${i < 3 ? 'w-12' : 'w-12'}`}
              initial={{ width: 0 }}
              animate={{ width: i <= step ? '3rem' : '0.75rem' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
          ))}
        </div>
        <button
          className="text-gray-500 hover:text-gray-800 transition-colors"
          onClick={() => navigate('/home')}
          disabled={loading}
        >
          Skip
        </button>
      </div>

      {error && (
        <motion.p
          className="text-center text-red-500 mx-6 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      <div className="flex-1 flex flex-col px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Set up your profile</h1>
              <p className="text-gray-500 mb-8">Add a profile photo so your friends know it's you</p>
              
              <div className="flex justify-center mb-10">
                <motion.div
                  className="w-36 h-36 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={loading}
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8" />
                  </button>
                  <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-purple-600 font-medium">{profilePhoto ? 'Photo Selected' : 'Add Photo'}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Select your interests</h1>
              <p className="text-gray-500 mb-8">We'll help you find content based on what you like</p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                          selectedInterests.includes(interest)
                            ? 'border-purple-600 bg-purple-50 shadow-md shadow-purple-100'
                            : 'border-gray-200'
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        <span>{interest}</span>
                        {selectedInterests.includes(interest) && (
                          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Find people to follow</h1>
              <p className="text-gray-500 mb-8">Follow people to see their photos and videos in your feed</p>
              
              <div className="space-y-5 mb-10">
                {suggestedUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: user.id * 0.1 }}
                  >
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-300 to-pink-300 opacity-60 blur-sm" />
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white relative z-10"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500">Suggested for you</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className={`text-sm h-9 rounded-full px-5 ${user.followed ? 'bg-purple-50 text-purple-600 border-purple-300' : 'hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300'} transition-colors`}
                        onClick={() => handleFollow(user.id)}
                        disabled={loading || user.followed}
                      >
                        {user.followed ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-xl font-medium shadow-lg shadow-purple-100 transition-all duration-300"
            onClick={handleNext}
            disabled={loading}
          >
            {step === 3 ? (
              "Get Started"
            ) : (
              <div className="flex items-center justify-center w-full">
                Next
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
