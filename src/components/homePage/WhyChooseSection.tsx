import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Code, Lightbulb, Trophy, BarChart3, Target, Globe, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  animationPath: string;
  animationSize: { width: number; height: number };
  mobileAnimationSize: { width: number; height: number };
}

interface LottieWindow extends Window {
  lottie?: {
    loadAnimation: (options: {
      container: HTMLDivElement | null;
      renderer: string;
      loop: boolean;
      autoplay: boolean;
      path: string;
    }) => void;
  };
}

const WhyChooseSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lottieRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Use useMemo to prevent the features array from being recreated on every render
  const features: Feature[] = useMemo(() => [
    {
      icon: Code,
      title: "Powerful Editor",
      description: "Code in our modern code editor, real-time syntax highlighting.",
      animationPath: "/animation-video/Code updating..json",
      animationSize: { width: 120, height: 120 },
      mobileAnimationSize: { width: 80, height: 80 }
    },
    {
      icon: Lightbulb,
      title: "Smart Hints",
      description: "Step-by-step hints to guide users through solving problems.",
      animationPath: "/animation-video/Idea emoji.json",
      animationSize: { width: 150, height: 150 },
      mobileAnimationSize: { width: 100, height: 100 }
    },
    {
      icon: Trophy,
      title: "Competitive",
      description: "Compete in weekly contests, climb leaderboards.",
      animationPath: "/animation-video/Competition Ranking Animation.json",
      animationSize: { width: 120, height: 120 },
      mobileAnimationSize: { width: 80, height: 80 }
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Tailored to meet individual needs perfectly balanced.",
      animationPath: "/animation-video/profit growth.json",
      animationSize: { width: 120, height: 120 },
      mobileAnimationSize: { width: 80, height: 80 }
    },
    {
      icon: Target,
      title: "Interview Prep",
      description: "Prepare for technical interviews with curated problem sets from FAANG companies and realistic mock interview sessions.",
      animationPath: "/animation-video/Test Consulting.json",
      animationSize: { width: 120, height: 120 },
      mobileAnimationSize: { width: 80, height: 80 }
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with millions of developers, share solutions, discuss algorithms, and learn from the global coding community.",
      animationPath: "/animation-video/Globe.json",
      animationSize: { width: 150, height: 150 },
      mobileAnimationSize: { width: 100, height: 100 }
    }
  ], []);

  useEffect(() => {
    // Check if window is available (client-side)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Load Lottie library
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lottie-web/build/player/lottie.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize all Lottie animations
      features.forEach((feature, index) => {
        if (lottieRefs.current[index] && (window as LottieWindow).lottie) {
          (window as LottieWindow).lottie?.loadAnimation({
            container: lottieRefs.current[index],
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: feature.animationPath
          });
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [features]); // Now features is stable due to useMemo

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
        if (entry.isIntersecting) {
          setVisibleCards(prev => new Set([...prev, index]));
        } else {
          setVisibleCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
        }
      });
    }, observerOptions);

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [features.length]); // Add features.length as dependency since we're using it in the initialization effect

  // Initialize ref arrays
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, features.length);
    lottieRefs.current = lottieRefs.current.slice(0, features.length);
  }, [features.length]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  const setLottieRef = (index: number) => (el: HTMLDivElement | null) => {
    lottieRefs.current[index] = el;
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 overflow-visible" ref={containerRef}>
      {/* Animated floating elements - Hidden on mobile for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/10 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile & Tablet Title - Properly spaced above cards */}
        <div className="mb-12 lg:mb-0 lg:hidden">
          <div 
            ref={titleRef}
            className="flex items-center justify-center text-center mb-8"
          >
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                <span className="bg-gradient-to-r from-primary via-[#000000] to-primary dark:from-primary dark:via-white dark:to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                  Why Choose
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-[#000000] to-primary dark:from-primary dark:via-white dark:to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                  CodeCompass?
                </span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 rounded mb-4 mx-auto"></div>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto px-4" style={{ fontFamily: 'Barlow, sans-serif' }}>
                CodeCompass helps you strengthen your coding skills with clear, step-by-step problem-solving guidance.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Feature Cards - Full width on mobile, 2/3 on desktop */}
          <div className="w-full lg:w-2/3 space-y-8 md:space-y-12 lg:space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={setCardRef(index)}
                className={`group relative rounded-2xl transition-all duration-700 ease-out min-h-[200px] md:min-h-[250px] lg:min-h-[300px] hover:scale-[1.02] hover:-translate-y-1 ${
                  visibleCards.has(index) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8 lg:translate-x-24'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                tabIndex={0}
              >
                {/* Card Container with Integrated Border */}
                <div className="relative rounded-2xl p-[2px] md:p-[3px] bg-transparent">
                  {/* Animated Border Layers - Hidden on mobile for better performance */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden hidden md:block">
                    <div className="absolute inset-0 rounded-2xl border-layer-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 rounded-2xl border-layer-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-2xl border-layer-3 opacity-0 group-hover:opacity-100 transition-opacity duration-900"></div>
                    <div className="absolute inset-0 rounded-2xl border-layer-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1100"></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative rounded-2xl p-6 md:p-8 lg:p-12 min-h-[200px] md:min-h-[250px] lg:min-h-[300px] flex items-center z-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-[#0e1526] dark:via-[#0e1526] dark:to-[#0e1526]">
  {/* Content Background Overlay */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100 border-3 dark:from-[#0e1526] dark:via-[#0e1526] dark:to-[#0e1526] z-0"></div>
  
  {/* Green Gradient Overlay on Hover */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-[#CCF301]/5 to-[#CCF301]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl z-0"></div>
  
  {/* Main Content - Stack on mobile, row on larger screens */}
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 w-full relative z-10">
    {/* Lottie Animation Container */}
    <div className="flex-shrink-0 relative">
      <div 
        ref={setLottieRef(index)}
        className="transition-all duration-500 ease-out group-hover:scale-110 mx-auto sm:mx-0"
        style={{ 
          width: `${isMobile ? feature.mobileAnimationSize.width : feature.animationSize.width}px`, 
          height: `${isMobile ? feature.mobileAnimationSize.height : feature.animationSize.height}px` 
        }}
      ></div>
    </div>
    
    <div className="flex-1 text-center sm:text-left">
      <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: '"Source Code Pro", monospace' }}>
        {feature.title}
      </h4>
      <p className="text-sm md:text-base lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
        {feature.description}
      </p>
    </div>

    <div className="absolute bottom-4 right-4 w-4 h-4 md:w-6 md:h-6 border-2 border-primary/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 group-hover:border-[#CCF301]/40 hidden sm:block"></div>
  </div>
  
  {/* Bottom Accent Line */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
</div>

                </div>
              </div>
            ))}
          </div>

          {/* Desktop Sticky Title - Hidden on mobile/tablet */}
          <div className="hidden lg:block lg:w-1/3">
            <div 
              ref={titleRef}
              className="lg:sticky lg:top-24 flex items-start justify-center lg:justify-start lg:min-h-[calc(1vh-6rem)] lg:pl-8"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                  <span className="bg-gradient-to-r from-primary via-[#000000] to-primary dark:from-primary dark:via-white dark:to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                    Why Choose
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-[#000000] to-primary dark:from-primary dark:via-white dark:to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                    CodeCompass?
                  </span>
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 rounded mb-6 mx-auto lg:mx-0"></div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  CodeCompass helps you strengthen your coding skills with clear, step-by-step problem-solving guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        /* Animated Border Styles - Optimized for smooth appearance */
        .border-layer-1::before {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: conic-gradient(transparent, #CCF301 8%, transparent 15%, transparent 50%, #CCF301 57%, transparent 65%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          transition: transform 1.5s ease-out;
          z-index: -1;
          opacity: 0.8;
        }
        
        .border-layer-2::before {
          content: '';
          position: absolute;
          width: 420px;
          height: 420px;
          background: conic-gradient(transparent, #8CAE00 5%, transparent 12%, transparent 50%, #8CAE00 55%, transparent 62%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          transition: transform 1.8s ease-out;
          z-index: -1;
          opacity: 0.6;
        }
        
        .border-layer-3::before {
          content: '';
          position: absolute;
          width: 440px;
          height: 440px;
          background: conic-gradient(transparent, #D4F76E 7%, transparent 14%, transparent 50%, #D4F76E 58%, transparent 68%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
          transition: transform 2.1s ease-out;
          z-index: -1;
          opacity: 0.4;
        }
        
        .border-layer-4::before {
          content: '';
          position: absolute;
          width: 460px;
          height: 460px;
          background: conic-gradient(transparent, #CCF301 6%, transparent 13%, transparent 50%, #CCF301 56%, transparent 63%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(135deg);
          transition: transform 2.4s ease-out;
          z-index: -1;
          opacity: 0.3;
        }
        
        /* Hover effects - Smoother rotations */
        .group:hover .border-layer-1::before {
          transform: translate(-50%, -50%) rotate(180deg);
        }
        
        .group:hover .border-layer-2::before {
          transform: translate(-50%, -50%) rotate(225deg);
        }
        
        .group:hover .border-layer-3::before {
          transform: translate(-50%, -50%) rotate(270deg);
        }
        
        .group:hover .border-layer-4::before {
          transform: translate(-50%, -50%) rotate(315deg);
        }
        
        /* Focus effects - More dramatic rotations */
        .group:focus-within .border-layer-1::before {
          transform: translate(-50%, -50%) rotate(360deg);
          transition-duration: 2s;
        }
        
        .group:focus-within .border-layer-2::before {
          transform: translate(-50%, -50%) rotate(405deg);
          transition-duration: 2.2s;
        }
        
        .group:focus-within .border-layer-3::before {
          transform: translate(-50%, -50%) rotate(450deg);
          transition-duration: 2.4s;
        }
        
        .group:focus-within .border-layer-4::before {
          transform: translate(-50%, -50%) rotate(495deg);
          transition-duration: 2.6s;
        }
        
        /* Subtle glow effect on hover */
        .group:hover {
          filter: drop-shadow(0 0 12px rgba(204, 243, 1, 0.3));
        }

        /* Smooth transitions for all animated elements */
        .group {
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .group {
            transform: none !important;
          }
          
          .group:hover {
            transform: scale(1.01) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSection;