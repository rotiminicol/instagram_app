
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Camera, X } from "lucide-react";
import { authService } from '../api/services';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const interests = [
    "Photography", "Travel", "Food", "Fashion",
    "Fitness", "Music", "Art", "Gaming",
    "Technology", "Nature", "Sports", "Beauty"
  ];

  const suggestedUsers = [
    { id: 1, username: 'john_doe', avatar: 'https://picsum.photos/50/50?random=1', followed: false },
    { id: 2, username: 'jane_smith', avatar: 'https://picsum.photos/50/50?random=2', followed: false },
    { id: 3, username: 'mike_wilson', avatar: 'https://picsum.photos/50/50?random=3', followed: false },
    { id: 4, username: 'sarah_jones', avatar: 'https://picsum.photos/50/50?random=4', followed: false },
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
      formData.append('profile_image', file);

      try {
        console.log('Uploading profile photo to /auth/me...');
        await authService.updateProfile(formData);
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
      await authService.updateProfile({ interests: selectedInterests });
      console.log('Interests saved');
    } catch (err: any) {
      console.error('Interests save error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save interests.');
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
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/welcome')}
          disabled={loading}
        >
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>
        
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 w-16 rounded-full ${i <= step ? 'bg-[#0095F6]' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <button
          className="text-[#0095F6] font-semibold hover:text-[#0095F6]/80"
          onClick={() => navigate('/home')}
          disabled={loading}
        >
          Skip
        </button>
      </div>

      {error && (
        <motion.div
          className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-red-600 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="text-center mb-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Add a profile photo
                </h1>
                <p className="text-gray-600 text-base">
                  Add a profile photo so your friends know it's you.
                </p>
              </div>
              
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                  {profilePhoto ? (
                    <img
                      src={URL.createObjectURL(profilePhoto)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={loading}
                />
                {loading && (
                  <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                className="text-[#0095F6] font-semibold"
                onClick={() => document.querySelector('input[type="file"]')?.click()}
                disabled={loading}
              >
                {profilePhoto ? 'Change photo' : 'Add photo'}
              </Button>
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
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  What are you into?
                </h1>
                <p className="text-gray-600 text-base">
                  Choose 3 or more categories so we can customize your experience.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedInterests.includes(interest)
                        ? 'border-[#0095F6] bg-[#0095F6]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{interest}</span>
                      {selectedInterests.includes(interest) && (
                        <div className="w-5 h-5 rounded-full bg-[#0095F6] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
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
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Follow accounts you're interested in
                </h1>
                <p className="text-gray-600 text-base">
                  Follow accounts to start seeing the photos and videos they share.
                </p>
              </div>
              
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.username}</p>
                        <p className="text-sm text-gray-500">Suggested for you</p>
                      </div>
                    </div>
                    <Button
                      variant={user.followed ? "outline" : "default"}
                      className={user.followed ? "border-gray-300" : "bg-[#0095F6] hover:bg-[#0095F6]/90"}
                      size="sm"
                    >
                      {user.followed ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom button */}
      <div className="p-6 border-t border-gray-200">
        <Button
          className="w-full bg-[#0095F6] hover:bg-[#0095F6]/90 text-white py-3 rounded-lg font-semibold"
          onClick={handleNext}
          disabled={loading || (step === 2 && selectedInterests.length < 3)}
        >
          {step === 3 ? 'Done' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
