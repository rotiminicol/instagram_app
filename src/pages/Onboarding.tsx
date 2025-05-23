
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="p-4 flex items-center justify-between">
        <div className="flex space-x-1">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`h-1 rounded-full ${i <= step ? 'bg-purple-600' : 'bg-gray-200'} ${i < 3 ? 'w-12' : 'w-12'}`}
            ></div>
          ))}
        </div>
        <button 
          className="text-gray-500"
          onClick={() => navigate('/')}
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 py-8">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-4">Set up your profile</h1>
            <p className="text-gray-500 mb-6">Add a profile photo so your friends know it's you</p>
            
            <div className="flex justify-center mb-10">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <button className="text-purple-600 font-medium">Add Photo</button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-4">Select your interests</h1>
            <p className="text-gray-500 mb-6">We'll help you find content based on what you like</p>
            
            <div className="grid grid-cols-2 gap-3 mb-10">
              {interests.map((interest) => (
                <Card 
                  key={interest}
                  className={`p-3 flex items-center justify-between cursor-pointer ${
                    selectedInterests.includes(interest) 
                      ? 'border-purple-600 bg-purple-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  <span>{interest}</span>
                  {selectedInterests.includes(interest) && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold mb-4">Find people to follow</h1>
            <p className="text-gray-500 mb-6">Follow people to see their photos and videos in your feed</p>
            
            <div className="space-y-4 mb-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000 + i * 10000000}?w=50&h=50&fit=crop&crop=face`}
                      alt={`User ${i}`} 
                      className="w-12 h-12 rounded-full object-cover mr-3" 
                    />
                    <div>
                      <p className="font-medium">user_{i}</p>
                      <p className="text-xs text-gray-500">Suggested for you</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-sm h-8 rounded-full px-4"
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-lg font-medium"
          onClick={handleNext}
        >
          {step === 3 ? (
            "Get Started"
          ) : (
            <div className="flex items-center justify-center w-full">
              Next
              <ArrowRight className="ml-1 w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
