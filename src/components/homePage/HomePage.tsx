'use client';

import React from 'react';
import HeroSection from "@/components/homePage/hero_section/hero-section";
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";
import CodeCompassFeatures from "@/components/homePage/home_feature/CodeCompassFeatures";
// import CodeCompassOrbiting from "@/components/homePage/hero_section/CodeCompassOrbiting";
import WhyChooseSection from "@/components/homePage/WhyChooseSection";
import ChooseLanguage from '@/components/homePage/ChooseLanguage';
import Questions from '@/components/homePage/question';

const Homepage = () => {
  return (
    <div className="relative w-full">
      {/* Unified Background */}
      <div className="absolute inset-0 bg-white dark:bg-black">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black"></div>
        
        {/* Subtle accent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-50/20 to-transparent dark:from-transparent dark:via-lime-900/10 dark:to-transparent"></div>
        
        {/* Optional: Add a radial glow effect */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-400/5 dark:bg-lime-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroScrollDemo />
        {/* <LogoMarquee/> */}
        <CodeCompassFeatures />
        <ChooseLanguage/>
        {/* <CodeCompassOrbiting /> */}
        <WhyChooseSection />
        <Questions/>

      </div>
    </div>
  );
};

export default Homepage;