// components/AboutUs/our-mission.tsx
"use client"

import React, { useEffect, useRef, useState, useMemo } from 'react';

// Define types for Lottie
interface LottiePlayer {
  loadAnimation: (params: {
    container: HTMLDivElement | null;
    renderer: string;
    loop: boolean;
    autoplay: boolean;
    path: string;
  }) => void;
}

declare global {
  interface Window {
    lottie?: LottiePlayer;
  }
}

// Custom hook for scroll animations
function useInView() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isInView };
}

export function OurMissionSection() {
  const missionView = useInView();
  const lottieRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Move MISSION_ITEMS to useMemo to prevent re-creation on every render
  const MISSION_ITEMS = useMemo(() => [
    {
      title: "Algorithm Mastery",
      desc: "Master data structures and algorithms through progressive problem sets designed for technical excellence.",
      animationPath: "/animation-video/Code updating..json",
      delay: "delay-100"
    },
    {
      title: "Interview Ready",
      desc: "Prepare with real interview questions from top tech companies and comprehensive mock sessions.",
      animationPath: "/animation-video/Test Consulting.json",
      delay: "delay-300"
    },
    {
      title: "Competitive Edge",
      desc: "Sharpen your skills through weekly contests and compete with developers worldwide.",
      animationPath: "/animation-video/Competition Ranking Animation.json",
      delay: "delay-500"
    }
  ], []);

  // Load Lottie library and initialize animations
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lottie-web/build/player/lottie.min.js';
    script.async = true;
    script.onload = () => {
      MISSION_ITEMS.forEach((item, index) => {
        if (lottieRefs.current[index] && window.lottie) {
          window.lottie.loadAnimation({
            container: lottieRefs.current[index],
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: item.animationPath
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
  }, [MISSION_ITEMS]);

  return (
    <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div ref={missionView.ref} className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${missionView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6">
            Our <span className="bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">Mission</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Providing world-class algorithmic training and interview preparation through challenging problems,
            competitive programming, and comprehensive system design education.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {MISSION_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`
                group relative bg-white dark:bg-gray-900/50 backdrop-blur-xl
                p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl 
                shadow-lg dark:shadow-2xl
                border-2 border-gray-200 dark:border-gray-800
                hover:border-[#0b131c] dark:hover:border-[#CCF301]
                transition-all duration-500 hover:scale-105
                min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]
                ${missionView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${item.delay}
              `}
            >
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                {/* Lottie Animation Container */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-[#0b131c]/10 dark:from-[#CCF301]/10 to-transparent flex items-center justify-center  transition-transform duration-500 border-2 border-[#0b131c]/20 dark:border-[#CCF301]/30">
                  <div 
                    ref={(el) => { lottieRefs.current[i] = el; }}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                  ></div>
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-[#0b131c] dark:group-hover:text-[#CCF301] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Code & Design Section
export function CodeDesignSection() {
  const codeView = useInView();

  return (
    <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div ref={codeView.ref} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${codeView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight">
              Where Code Meets <br />
              <span className="bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">
                Design Excellence
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              CodeCompass provides a comprehensive suite of coding challenges, from basic algorithms to advanced
              system design. Our platform mirrors real technical interviews with{" "}
              <span className="font-semibold text-[#0b131c] dark:text-[#CCF301]">
                curated problems from FAANG companies
              </span>{" "}
              and competitive programming contests.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['Algorithm Mastery', 'System Design', 'FAANG Problems', 'UI/UX Integration'].map((item, i) => (
                <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700/50 text-xs sm:text-sm font-medium hover:border-[#0b131c] dark:hover:border-[#CCF301] transition-all duration-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Code Block */}
          <div className={`transition-all duration-1000 delay-400 ${codeView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-200 dark:border-gray-800 hover:border-[#0b131c] dark:hover:border-[#CCF301] transition-all duration-500">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-mono">CodeCompass.js</span>
              </div>
              <pre className="text-xs sm:text-sm font-mono overflow-auto bg-gray-50 dark:bg-gray-950/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
                <code className="text-gray-800 dark:text-gray-200">
{`// Two Sum - Classic Algorithm
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
}

// Time: O(n), Space: O(n)`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}