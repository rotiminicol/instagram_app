
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Camera } from "lucide-react";
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
      navigate('/home');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="p-4 flex items-center justify-between">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`h-1 rounded-full ${i <= step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'} ${i < 3 ? 'w-12' : 'w-12'} transition-all duration-500`}
            ></div>
          ))}
        </div>
        <button 
          className="text-gray-500 hover:text-gray-800 transition-colors"
          onClick={() => navigate('/home')}
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 py-8 animate-fade-in">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Set up your profile</h1>
            <p className="text-gray-500 mb-8">Add a profile photo so your friends know it's you</p>
            
            <div className="flex justify-center mb-10">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center relative group hover-scale card-3d">
                <button className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8" />
                </button>
                <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-purple-600 font-medium">Add Photo</span>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Select your interests</h1>
            <p className="text-gray-500 mb-8">We'll help you find content based on what you like</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {interests.map((interest, index) => (
                <Card 
                  key={interest}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover-scale animate-fade-in ${
                    selectedInterests.includes(interest) 
                      ? 'border-purple-600 bg-purple-50 shadow-md shadow-purple-100' 
                      : 'border-gray-200'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                  onClick={() => toggleInterest(interest)}
                >
                  <span>{interest}</span>
                  {selectedInterests.includes(interest) && (
                    <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Find people to follow</h1>
            <p className="text-gray-500 mb-8">Follow people to see their photos and videos in your feed</p>
            
            <div className="space-y-5 mb-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover-scale animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-300 to-pink-300 opacity-60 blur-sm"></div>
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000 + i * 10000000}?w=50&h=50&fit=crop&crop=face`}
                        alt={`User ${i}`} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white relative z-10" 
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">user_{i}</p>
                      <p className="text-xs text-gray-500">Suggested for you</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-sm h-9 rounded-full px-5 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-colors"
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
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-xl font-medium shadow-lg shadow-purple-100 hover:translate-y-[-2px] transition-all duration-300"
          onClick={handleNext}
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
      </div>
    </div>
  );
};

export default Onboarding;
