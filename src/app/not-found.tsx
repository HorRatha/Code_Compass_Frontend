'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Search, FileCode } from 'lucide-react';

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [dotSize, setDotSize] = useState(14); // Default for desktop

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 0.6 : 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set initial dot size based on window width
    const updateDotSize = () => {
      if (window.innerWidth < 640) {
        setDotSize(6);
      } else if (window.innerWidth < 768) {
        setDotSize(10);
      } else {
        setDotSize(14);
      }
    };

    updateDotSize();
    window.addEventListener('resize', updateDotSize);
    return () => window.removeEventListener('resize', updateDotSize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dot matrix pattern for "404"
  const dotPattern = [
    // "4"
    [
      [0,0,0,1,1,0,0,0],
      [0,0,1,0,1,0,0,0],
      [0,1,0,0,1,0,0,0],
      [1,0,0,0,1,0,0,0],
      [1,1,1,1,1,1,1,0],
      [0,0,0,0,1,0,0,0],
      [0,0,0,0,1,0,0,0],
      [0,0,0,0,1,0,0,0],
    ],
    // "0"
    [
      [0,1,1,1,1,1,0,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [0,1,1,1,1,1,0,0],
    ],
    // "4"
    [
      [0,0,0,1,1,0,0,0],
      [0,0,1,0,1,0,0,0],
      [0,1,0,0,1,0,0,0],
      [1,0,0,0,1,0,0,0],
      [1,1,1,1,1,1,1,0],
      [0,0,0,0,1,0,0,0],
      [0,0,0,0,1,0,0,0],
      [0,0,0,0,1,0,0,0],
    ],
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(204,243,1,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(204,243,1,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full" 
           style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.3s ease-out' }}>
        
        {/* 404 Dot Matrix Display */}
        <div className="mb-8 sm:mb-12 flex justify-center gap-4 sm:gap-8 md:gap-12">
          {dotPattern.map((digit, digitIndex) => (
            <div key={digitIndex} className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
              {digit.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1.5 sm:gap-2 md:gap-3">
                  {row.map((dot, colIndex) => (
                    <div
                      key={colIndex}
                      className={`rounded-full transition-all duration-300 ${
                        dot 
                          ? 'bg-[#CCF301]' 
                          : 'bg-gray-900'
                      }`}
                      style={{
                        width: `${dotSize}px`,
                        height: `${dotSize}px`,
                        boxShadow: dot 
                          ? `0 0 ${8 * glowIntensity}px rgba(204,243,1,${0.8 * glowIntensity}), 0 0 ${16 * glowIntensity}px rgba(204,243,1,${0.4 * glowIntensity})`
                          : 'inset 0 0 4px rgba(0,0,0,0.5)',
                        opacity: dot ? glowIntensity : 0.3,
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
          Lost in the Code?
        </h2>
        <p className="text-gray-400 text-sm sm:text-base lg:text-xl mb-6 sm:mb-7 lg:mb-8 leading-relaxed px-4 max-w-2xl mx-auto">
          Looks like this route doesn&apos;t exist in our navigation map. Let&apos;s get you back on track with CodeCompass.
        </p>

        {/* Code editor-style error message */}
        <div className="bg-[#0b131c]/80 backdrop-blur-sm border border-[#CCF301]/30 rounded-lg overflow-hidden mb-6 sm:mb-7 lg:mb-8 shadow-[0_0_30px_rgba(204,243,1,0.1)] max-w-2xl mx-auto">
          {/* Editor header */}
          <div className="bg-[#0b131c] border-b border-[#CCF301]/20 px-3 sm:px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-xs font-mono flex items-center gap-1.5 sm:gap-2">
              <FileCode size={12} className="text-[#CCF301] sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">error-404.ts</span>
              <span className="sm:hidden">404.ts</span>
            </div>
          </div>
          
          {/* Line numbers and code */}
          <div className="flex text-left font-mono text-xs sm:text-sm">
            {/* Line numbers */}
            <div className="bg-[#0b131c]/60 text-gray-600 px-2 sm:px-3 py-3 sm:py-4 select-none border-r border-[#CCF301]/10">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            
            {/* Code content */}
            <div className="flex-1 px-3 sm:px-4 py-3 sm:py-4">
              <div className="text-[#CCF301]">
                <span className="text-purple-400">const</span> <span className="text-blue-400">error</span> <span className="text-gray-500">=</span> <span className="text-orange-400">&apos;404&apos;</span><span className="text-gray-500">;</span>
              </div>
              <div className="text-gray-400 mt-1">
                <span className="text-purple-400">throw</span> <span className="text-purple-400">new</span> <span className="text-[#CCF301]">Error</span><span className="text-gray-500">(</span>
              </div>
              <div className="text-red-400 ml-2 sm:ml-4">
                <span className="text-orange-400">&quot;Page not found&quot;</span>
              </div>
              <div className="text-gray-500">);</div>
              <div className="text-gray-500 mt-1">
                <span className="text-gray-600">{'//'}</span> <span className="text-[#CCF301]">Tip:</span> <span className="text-gray-400">Navigate to home</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-row gap-3 sm:gap-4 justify-center">
          <Link 
            href="/"
            className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[#CCF301] hover:bg-[#b8dc00] text-black font-semibold px-4 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(204,243,1,0.3)] hover:shadow-[0_0_40px_rgba(204,243,1,0.5)] text-sm sm:text-base"
          >
            <Home size={18} className="group-hover:animate-bounce sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Back to Home</span>
          </Link>
          <Link 
            href="/search"
            className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0b131c]/80 backdrop-blur-sm border-2 border-[#CCF301]/50 hover:border-[#CCF301] text-white font-semibold px-4 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(204,243,1,0.3)] text-sm sm:text-base"
          >
            <Search size={18} className="group-hover:animate-bounce sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Search Content</span>
          </Link>
        </div>

        {/* Additional help text */}
        <p className="text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8">
          Error Code: <span className="text-[#CCF301] font-mono">404_ROUTE_NOT_FOUND</span>
        </p>
      </div>
    </div>
  );
}