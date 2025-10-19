'use client';

import { useState, useEffect } from 'react';
import { Home, RefreshCw, Bug, FileWarning } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 0.6 : 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 3000);
    return () => clearInterval(glitchInterval);
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

  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  // Dot matrix pattern for "ERROR"
  const errorPattern = [
    // "E"
    [
      [1,1,1,1,1,1,1,0],
      [1,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0],
      [1,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,0],
    ],
    // "R"
    [
      [1,1,1,1,1,1,0,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [1,1,1,1,1,1,0,0],
      [1,0,0,1,0,0,0,0],
      [1,0,0,0,1,0,0,0],
      [1,0,0,0,0,1,0,0],
      [1,0,0,0,0,0,1,0],
    ],
    // "R"
    [
      [1,1,1,1,1,1,0,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [1,1,1,1,1,1,0,0],
      [1,0,0,1,0,0,0,0],
      [1,0,0,0,1,0,0,0],
      [1,0,0,0,0,1,0,0],
      [1,0,0,0,0,0,1,0],
    ],
    // "O"
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
    // "R"
    [
      [1,1,1,1,1,1,0,0],
      [1,0,0,0,0,0,1,0],
      [1,0,0,0,0,0,1,0],
      [1,1,1,1,1,1,0,0],
      [1,0,0,1,0,0,0,0],
      [1,0,0,0,1,0,0,0],
      [1,0,0,0,0,1,0,0],
      [1,0,0,0,0,0,1,0],
    ],
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(239,68,68,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div 
        className="relative z-10 text-center max-w-4xl w-full" 
        style={{ 
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, 
          transition: 'transform 0.3s ease-out' 
        }}
      >
        {/* ERROR Dot Matrix Display */}
        <div className="mb-8 sm:mb-12 flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {errorPattern.map((letter, letterIndex) => (
            <div key={letterIndex} className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
              {letter.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
                  {row.map((dot, colIndex) => (
                    <div
                      key={colIndex}
                      className={`rounded-full transition-all duration-300 ${
                        dot 
                          ? glitchEffect ? 'bg-[#CCF301]' : 'bg-red-500' 
                          : 'bg-gray-900'
                      }`}
                      style={{
                        width: window.innerWidth < 640 ? '4px' : window.innerWidth < 768 ? '6px' : window.innerWidth < 1024 ? '8px' : '10px',
                        height: window.innerWidth < 640 ? '4px' : window.innerWidth < 768 ? '6px' : window.innerWidth < 1024 ? '8px' : '10px',
                        boxShadow: dot 
                          ? glitchEffect 
                            ? `0 0 ${8 * glowIntensity}px rgba(204,243,1,${0.8 * glowIntensity}), 0 0 ${16 * glowIntensity}px rgba(204,243,1,${0.4 * glowIntensity})`
                            : `0 0 ${8 * glowIntensity}px rgba(239,68,68,${0.8 * glowIntensity}), 0 0 ${16 * glowIntensity}px rgba(239,68,68,${0.4 * glowIntensity})`
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
          Something Went Wrong
        </h2>
        <p className="text-gray-400 text-sm sm:text-base lg:text-xl mb-6 sm:mb-7 lg:mb-8 leading-relaxed px-4 max-w-2xl mx-auto">
          Don&apos;t worry, our team has been notified. Try refreshing the page or head back to safety.
        </p>

        {/* Code editor-style error message */}
        <div className="bg-[#0b131c]/80 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden mb-6 sm:mb-7 lg:mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)] max-w-2xl mx-auto">
          {/* Editor header */}
          <div className="bg-[#0b131c] border-b border-red-500/20 px-3 sm:px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-xs font-mono flex items-center gap-1.5 sm:gap-2">
              <FileWarning size={12} className="text-red-400 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">runtime-error.ts</span>
              <span className="sm:hidden">error.ts</span>
            </div>
          </div>
          
          {/* Line numbers and code */}
          <div className="flex text-left font-mono text-xs sm:text-sm">
            {/* Line numbers */}
            <div className="bg-[#0b131c]/60 text-gray-600 px-2 sm:px-3 py-3 sm:py-4 select-none border-r border-red-500/10">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
            </div>
            
            {/* Code content */}
            <div className="flex-1 px-3 sm:px-4 py-3 sm:py-4">
              <div className="text-gray-400">
                <span className="text-purple-400">try</span> <span className="text-gray-500">{'{'}</span>
              </div>
              <div className="text-gray-400 ml-2 sm:ml-4 mt-1">
                <span className="text-blue-400">await</span> <span className="text-[#CCF301]">renderPage</span><span className="text-gray-500">();</span>
              </div>
              <div className="text-gray-500">{'}'}</div>
              <div className="text-purple-400 mt-1">
                <span>catch</span> <span className="text-gray-500">(</span><span className="text-orange-400">error</span><span className="text-gray-500">) {'{'}</span>
              </div>
              <div className="text-red-400 ml-2 sm:ml-4 mt-1">
                <span className="text-gray-400">console</span><span className="text-gray-500">.</span><span className="text-[#CCF301]">error</span><span className="text-gray-500">(</span><span className="text-orange-400">error</span><span className="text-gray-500">);</span>
              </div>
              <div className="text-gray-500">{'}'}</div>
              <div className="text-gray-500 mt-2">
                <span className="text-gray-600">{'//'}</span> <span className="text-red-400">Error:</span> <span className="text-gray-400">{error.message || 'Unexpected error occurred'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Details (collapsible) */}
        {error.digest && (
          <div className="bg-[#0b131c]/60 backdrop-blur-sm border border-[#CCF301]/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-7 lg:mb-8 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Bug size={14} className="text-[#CCF301] sm:w-4 sm:h-4" />
              <span className="text-[#CCF301] font-mono text-xs font-semibold">Error Digest</span>
            </div>
            <code className="text-gray-400 text-xs font-mono break-all">{error.digest}</code>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={reset}
            className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[#CCF301] hover:bg-[#b8dc00] text-black font-semibold px-4 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(204,243,1,0.3)] hover:shadow-[0_0_40px_rgba(204,243,1,0.5)] text-sm sm:text-base"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Try Again</span>
          </button>
          <Link 
            href="/"
            className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0b131c]/80 backdrop-blur-sm border-2 border-[#CCF301]/50 hover:border-[#CCF301] text-white font-semibold px-4 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(204,243,1,0.3)] text-sm sm:text-base"
          >
            <Home size={18} className="group-hover:animate-bounce sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Back to Home</span>
          </Link>
        </div>

        {/* Additional help text */}
        <p className="text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8">
          Error Type: <span className="text-red-400 font-mono">{error.name || 'RuntimeError'}</span>
          {error.digest && (
            <>
              {' • '}
              <span className="text-[#CCF301] font-mono">ID: {error.digest.slice(0, 8)}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}