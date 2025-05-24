
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/services';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState('');

  const interests = [
    'Photography', 'Travel', 'Food', 'Fashion', 'Art', 'Music',
    'Technology', 'Sports', 'Nature', 'Fitness', 'Gaming', 'Books'
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      // Update user profile with interests and image
      await authService.updateProfile({
        profile_image: profileImage,
        interests: selectedInterests
      });
      
      navigate('/home');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Continue to home even if update fails
      navigate('/home');
    }
  };

  const steps = [
    {
      title: "Add a profile photo",
      subtitle: "Choose a photo that represents you",
      content: (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {sampleImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setProfileImage(image)}
                className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors"
              >
                <img src={image} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "What are you interested in?",
      subtitle: "Choose topics to customize your experience",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                selectedInterests.includes(interest)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "You're all set!",
      subtitle: "Welcome to Instagram",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
          <p className="text-gray-600">Start sharing your moments and connect with friends!</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 p-6 max-w-md mx-auto w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full mx-1 ${
                  step <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">
            Step {currentStep + 1} of 3
          </p>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {steps[currentStep].content}
        </motion.div>
      </div>

      <div className="p-6">
        <Button
          onClick={handleNext}
          disabled={currentStep === 0 && !profileImage}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {currentStep === 2 ? 'Get Started' : 'Next'}
        </Button>
        
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full mt-3 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
