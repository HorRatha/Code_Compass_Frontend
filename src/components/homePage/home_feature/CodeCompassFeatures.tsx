'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CodeCompassFeatures() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(new Set<string>());

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId: number;
    let targetProgress: number = 0;
    let currentProgress: number = 0;

    const handleScroll = () => {
      if (featuresContainerRef.current) {
        const container = featuresContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const viewportHeight = window.innerHeight;

        targetProgress = Math.max(0, Math.min(1,
          (viewportHeight / 2 - containerTop) / containerHeight
        ));
      }
    };

    const smoothUpdate = (): void => {
      const diff = targetProgress - currentProgress;
      currentProgress += diff * 0.1;

      if (Math.abs(diff) > 0.001) {
        setScrollProgress(currentProgress);
      }

      rafId = requestAnimationFrame(smoothUpdate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(smoothUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = entry.target.getAttribute('data-index');
        if (index) {
          setVisibleCards(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            } else {
              newSet.delete(index);
            }
            return newSet;
          });
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('[data-index]');
    cards.forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Hero Section - Sticky */}
      <div className="top-0 z-1 flex items-center justify-center px-6 py-25">
       <div className="text-center relative">
         <div className="absolute inset-0 bg-gradient-to-r from-background/8 to-background/3 rounded-2xl border-l-4 border-lime-400/30 -m-4"></div>
         
         <h6 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 relative">
           <span className="bg-gradient-to-r from-lime-400 via-black to-lime-400 dark:from-lime-400 dark:via-white dark:to-lime-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
             Our Features 
           </span>
         </h6>
         <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative">
           Empowering developers with cutting-edge tools for learning and competition
         </p>
       </div>
      </div>
      
      {/* Section Divider */}
      <div className="max-w-xs mx-auto h-0.5 mb-16" style={{
        background: 'linear-gradient(to right, transparent, #CCF301, transparent)'
      }} />

      {/* Features Container with Center Line */}
      <div ref={featuresContainerRef} className="relative" style={{ perspective: '1000px' }}>
        
        {/* Center Line Wrapper */}
        <div className="absolute left-1/2 top-0 w-52 h-full -translate-x-1/2 pointer-events-none z-[1] hidden lg:block">
          {/* Main vertical line */}
          <div className="absolute left-1/2 top-0 w-0.5 h-full -translate-x-1/2" style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, transparent 0%, rgba(204, 243, 1, 0.5) 10%, rgba(204, 243, 1, 0.5) 90%, transparent 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(11, 19, 28, 0.5) 10%, rgba(11, 19, 28, 0.5) 90%, transparent 100%)'
          }} />
          
          {/* Progress indicator */}
          <div 
            className="fixed left-1/2 top-0 w-0.5 -translate-x-1/2 z-[5]"
            style={{
              height: `${scrollProgress * 100}%`,
              background: isDarkMode 
                ? 'linear-gradient(to bottom, #CCF301, #CCF301)' 
                : 'linear-gradient(to bottom, #0b131c, #0b131c)',
              boxShadow: isDarkMode
                ? '0 0 20px rgba(204, 243, 1, 0.7)'
                : '0 0 20px rgba(11, 19, 28, 0.7)',
              transition: 'none'
            }}
          />
          
          {/* Animated glowing dot at the end of progress line */}
          <div 
            className="fixed left-1/2 -translate-x-1/2 z-[6]"
            style={{
              top: `${scrollProgress * 100}%`,
              opacity: scrollProgress > 0 ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            {/* Outer glow rings */}
            <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute w-12 h-12 rounded-full animate-ping" style={{
                background: isDarkMode
                  ? 'radial-gradient(circle, rgba(204, 243, 1, 0.4) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(11, 19, 28, 0.4) 0%, transparent 70%)',
                animationDuration: '2s'
              }} />
              <div className="absolute w-8 h-8 rounded-full animate-pulse" style={{
                background: isDarkMode
                  ? 'radial-gradient(circle, rgba(204, 243, 1, 0.6) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(11, 19, 28, 0.6) 0%, transparent 70%)',
                animationDuration: '1.5s'
              }} />
              <div className="absolute w-5 h-5 rounded-full" style={{
                background: isDarkMode
                  ? 'radial-gradient(circle, rgba(204, 243, 1, 0.8) 0%, transparent 80%)'
                  : 'radial-gradient(circle, rgba(11, 19, 28, 0.8) 0%, transparent 80%)',
                animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
            </div>
            
            {/* Core dot */}
            <div 
              className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(circle, #ffffff 0%, #CCF301 50%, #CCF301 100%)'
                  : 'radial-gradient(circle, #ffffff 0%, #0b131c 50%, #0b131c 100%)',
                boxShadow: isDarkMode
                  ? '0 0 15px rgba(204, 243, 1, 1), 0 0 30px rgba(204, 243, 1, 0.8), 0 0 45px rgba(204, 243, 1, 0.5), 0 0 60px rgba(204, 243, 1, 0.3)'
                  : '0 0 15px rgba(11, 19, 28, 1), 0 0 30px rgba(11, 19, 28, 0.8), 0 0 45px rgba(11, 19, 28, 0.5), 0 0 60px rgba(11, 19, 28, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-20 lg:space-y-32 relative z-[2]">
          
          {/* Feature 1: Code Submission */}
          <div 
            data-index="0"
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
              visibleCards.has('0') 
                ? 'opacity-100 translate-y-0 translate-x-0' 
                : 'opacity-0 lg:-translate-x-16 translate-y-16'
            }`}
          >
            <div className="relative p-10 rounded-3xl backdrop-blur-xl border transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl" style={{
              background: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.1)' : 'rgba(30, 41, 59, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Connector line (left) */}
              <div 
                className={`hidden lg:block absolute top-1/2 left-full ml-8 h-0.5 transition-all duration-800 ${
                  visibleCards.has('0') ? 'w-16 opacity-100' : 'w-0 opacity-0'
                }`}
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(to right, rgba(204, 243, 1, 0.5), transparent)'
                    : 'linear-gradient(to right, rgba(11, 19, 28, 0.5), transparent)'
                }}
              />
              
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-5" style={{ 
                color: isDarkMode ? '#CCF301' : '#0b131c' 
              }}>
                Code Submission
              </h2>
              <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
                Lets you write in a powerful editor, supports many languages, and shows live judge status updates
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border backdrop-blur-xl shadow-xl" style={{
              background: isDarkMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.3)',
              borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.1)' : 'rgba(30, 41, 59, 0.1)',
              aspectRatio: '16/10'
            }}>
              <Image
                src="/code submission.png"
                alt="Code Submission"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Feature 2: Discussion */}
          <div 
            data-index="1"
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
              visibleCards.has('1') 
                ? 'opacity-100 translate-y-0 translate-x-0' 
                : 'opacity-0 lg:translate-x-16 translate-y-16'
            }`}
          >
            <div className="relative p-10 rounded-3xl backdrop-blur-xl border transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl lg:order-2" style={{
              background: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.1)' : 'rgba(30, 41, 59, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Connector line (right) */}
              <div 
                className={`hidden lg:block absolute top-1/2 right-full mr-8 h-0.5 transition-all duration-800 ${
                  visibleCards.has('1') ? 'w-16 opacity-100' : 'w-0 opacity-0'
                }`}
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(to left, rgba(204, 243, 1, 0.5), transparent)'
                    : 'linear-gradient(to left, rgba(11, 19, 28, 0.5), transparent)'
                }}
              />
              
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-5" style={{ 
                color: isDarkMode ? '#CCF301' : '#0b131c' 
              }}>
                Discussion
              </h2>
              <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
                Let users dive into problem-specific threads to ask questions, share solutions, and learn from others—all in a focused, supportive space.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border backdrop-blur-xl shadow-xl lg:order-1" style={{
              background: isDarkMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.3)',
              borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.1)' : 'rgba(30, 41, 59, 0.1)',
              aspectRatio: '16/10'
            }}>
              <Image
                src="/leaderboard.png"
                alt="CodeCompass Discussion"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Feature 3: Leaderboard Ranking */}
          <div 
            data-index="2"
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
              visibleCards.has('2') 
                ? 'opacity-100 translate-y-0 translate-x-0' 
                : 'opacity-0 lg:-translate-x-16 translate-y-16'
            }`}
          >
            <div className="relative p-10 rounded-3xl backdrop-blur-xl border transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl" style={{
              background: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.1)' : 'rgba(30, 41, 59, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Connector line (left) */}
              <div 
                className={`hidden lg:block absolute top-1/2 left-full ml-8 h-0.5 transition-all duration-800 ${
                  visibleCards.has('2') ? 'w-16 opacity-100' : 'w-0 opacity-0'
                }`}
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(to right, rgba(204, 243, 1, 0.5), transparent)'
                    : 'linear-gradient(to right, rgba(11, 19, 28, 0.5), transparent)'
                }}
              />
              
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-5" style={{ 
                color: isDarkMode ? '#CCF301' : '#0b131c' 
              }}>
                Leaderboard Ranking
              </h2>
              <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
                A competitive ranking system where users with the highest stars appear at the top—motivating progress and engagement.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border backdrop-blur-xl shadow-xl" style={{
              background: isDarkMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.3)',
              borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.1)' : 'rgba(30, 41, 59, 0.1)',
              aspectRatio: '16/10'
            }}>
              <Image
                src="/leaderboard.png"
                alt="CodeCompass LeaderBoard"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-32" />

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 5s linear infinite;
        }
      `}</style>
    </div>
  );
}