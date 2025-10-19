'use client';

import React from 'react';
import HeroSection from "@/components/homePage/hero_section/hero-section";
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";
import CodeCompassFeatures from "@/components/homePage/home_feature/CodeCompassFeatures";
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