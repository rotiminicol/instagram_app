import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin);

const SplashScreen = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => navigate('/welcome')
    });

    // Initial setup
    gsap.set([logoRef.current, titleRef.current, dotRef.current], { opacity: 0 });
    gsap.set(logoRef.current, { scale: 0.8, transformOrigin: 'center' });
    gsap.set(dotRef.current, { y: 20 });

    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1.1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    })
    .to(logoRef.current, {
      scale: 1,
      duration: 0.4
    }, '+=0.2')
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, '-=0.3')
    .to(dotRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4
    }, '-=0.2')
    .to(containerRef.current, {
      backgroundColor: '#ffffff',
      duration: 0.8,
      ease: 'power2.in'
    }, '+=0.5')
    .to([logoRef.current, titleRef.current], {
      opacity: 0,
      duration: 0.4
    }, '-=0.6')
    .to(dotRef.current, {
      scale: 12,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Particle effects
    if (containerRef.current) {
      createParticles(containerRef.current);
    }

    return () => {
      tl.kill();
    };
  }, [navigate]);

  const createParticles = (container: HTMLDivElement) => {
    const particleCount = 30;
    const colors = ['#FFDD55', '#FF543E', '#C837AB', '#FFFFFF'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      
      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      gsap.set(particle, {
        width: size,
        height: size,
        backgroundColor: color,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0
      });
      
      container.appendChild(particle);
      
      // Animate particles
      gsap.to(particle, {
        opacity: 0.6,
        y: `+=${(Math.random() - 0.5) * 100}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-purple-500 via-pink-500 to-pink-400 overflow-hidden relative"
    >
      {/* Main logo with refined gradient and shadow */}
      <div className="relative z-10 mb-8">
        <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl transform scale-95"></div>
        <svg 
          ref={logoRef}
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="relative z-10 w-28 h-28 drop-shadow-lg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 0C17.4903 0 16.6667 0.0276923 14.1077 0.144C11.5487 0.260308 9.80564 0.666615 8.27939 1.26C6.69128 1.88308 5.35354 2.69539 4.02667 4.02667C2.69538 5.35354 1.88308 6.69128 1.26 8.27939C0.666615 9.80564 0.260308 11.5487 0.144 14.1077C0.0276923 16.6667 0 17.4903 0 24C0 30.5097 0.0276923 31.3333 0.144 33.8923C0.260308 36.4513 0.666615 38.1944 1.26 39.7206C1.88308 41.3087 2.69539 42.6465 4.02667 43.9733C5.35354 45.3046 6.69128 46.1169 8.27939 46.74C9.80564 47.3334 11.5487 47.7397 14.1077 47.856C16.6667 47.9723 17.4903 48 24 48C30.5097 48 31.3333 47.9723 33.8923 47.856C36.4513 47.7397 38.1944 47.3334 39.7206 46.74C41.3087 46.1169 42.6465 45.3046 43.9733 43.9733C45.3046 42.6465 46.1169 41.3087 46.74 39.7206C47.3334 38.1944 47.7397 36.4513 47.856 33.8923C47.9723 31.3333 48 30.5097 48 24C48 17.4903 47.9723 16.6667 47.856 14.1077C47.7397 11.5487 47.3334 9.80564 46.74 8.27939C46.1169 6.69128 45.3046 5.35354 43.9733 4.02667C42.6465 2.69538 41.3087 1.88308 39.7206 1.26C38.1944 0.666615 36.4513 0.260308 33.8923 0.144C31.3333 0.0276923 30.5097 0 24 0Z"
            fill="url(#paint0_radial)"
          />
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(12 48) rotate(-90) scale(48 48.0016)"
            >
              <stop offset="0%" stopColor="#FFDD55" />
              <stop offset="25%" stopColor="#FFDD55" />
              <stop offset="50%" stopColor="#FF543E" />
              <stop offset="75%" stopColor="#C837AB" />
              <stop offset="100%" stopColor="#833AB4" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Title with subtle animation */}
      <h1 
        ref={titleRef}
        className="text-white text-3xl font-bold tracking-tight drop-shadow-lg relative z-10"
        style={{ fontFamily: "'Helvetica Neue', sans-serif", textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      >
        Instagram
      </h1>
      
      {/* Animated dot that expands into transition */}
      <div 
        ref={dotRef}
        className="absolute bottom-12 w-3 h-3 bg-white rounded-full z-20"
      />
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              opacity: 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;