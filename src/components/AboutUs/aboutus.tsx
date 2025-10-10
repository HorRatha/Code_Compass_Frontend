"use client"

import { HeroSection } from "./hero"
import { OurMissionSection, CodeDesignSection } from "./our-mission"
import { OurTeamSection, CreatorCTASection } from "./our-team"

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
      
      {/* Styles */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .group-hover\:rotate-360:hover {
          transform: rotate(360deg);
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .hover-spin:hover svg {
          animation: spin-once 0.6s ease-in-out;
        }
      `}</style>

      {/* Hero Section - Pure Colors */}
      <HeroSection />

      {/* Body Sections - Gradient Background */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black transition-colors duration-300">
        
        {/* Code & Design Section */}
        <CodeDesignSection />

        {/* Mission Section */}
        <OurMissionSection />

        {/* Team Section */}
        <OurTeamSection />

        {/* Creator CTA Section */}
        <CreatorCTASection />

      </div>
    </div>
  )
}