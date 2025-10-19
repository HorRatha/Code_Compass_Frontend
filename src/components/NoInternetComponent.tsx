// 'use client';

// import { useState, useEffect } from 'react';
// import { WifiOff, Zap } from 'lucide-react';

// // Hook simulation for demo - replace with your actual useNetwork hook
// function useNetwork() {
//   const [isOnline, setIsOnline] = useState(true);
  
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);
    
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
    
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);
  
//   return { isOnline };
// }

// export default function NoInternetComponent() {
//   const { isOnline } = useNetwork();
//   const [ripples, setRipples] = useState([0, 1, 2]);
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     if (!isOnline) {
//       // Generate random particles for floating effect
//       const newParticles = Array.from({ length: 15 }, (_, i) => ({
//         id: i,
//         x: Math.random() * 100,
//         delay: Math.random() * 3,
//         duration: 3 + Math.random() * 2,
//         size: 2 + Math.random() * 3
//       }));
//       setParticles(newParticles);
//     }
//   }, [isOnline]);

//   if (isOnline) return null;

//   return (
//     <>
//       {/* Floating particles background */}
//       <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
//         {particles.map((particle) => (
//           <div
//             key={particle.id}
//             className="absolute bg-red-500/20 rounded-full blur-sm animate-float"
//             style={{
//               left: `${particle.x}%`,
//               bottom: '-20px',
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               animationDelay: `${particle.delay}s`,
//               animationDuration: `${particle.duration}s`
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* Main banner */}
//       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-in slide-in-from-bottom-10 duration-700">
//         {/* Glassmorphic container */}
//         <div className="relative group">
//           {/* Animated border gradient */}
//           <div className="absolute -inset-[1px] bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
          
//           {/* Main content */}
//           <div className="relative bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden">
//             {/* Ripple effect background */}
//             <div className="absolute inset-0 overflow-hidden">
//               {ripples.map((i) => (
//                 <div
//                   key={i}
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
//                   style={{
//                     animation: `ripple 3s ease-out infinite`,
//                     animationDelay: `${i * 1}s`,
//                     background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)'
//                   }}
//                 ></div>
//               ))}
//             </div>

//             {/* Content */}
//             <div className="relative px-6 py-5 flex items-center gap-5">
//               {/* Icon with 3D effect */}
//               <div className="relative flex-shrink-0">
//                 {/* Rotating ring */}
//                 <div className="absolute inset-0 animate-spin-slow">
//                   <div className="w-14 h-14 rounded-full border-2 border-transparent border-t-red-500 border-r-orange-500"></div>
//                 </div>
                
//                 {/* Center icon */}
//                 <div className="relative w-14 h-14 flex items-center justify-center">
//                   <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-xl blur-md animate-pulse"></div>
//                   <div className="relative bg-gradient-to-br from-red-600 to-orange-600 p-3 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.5)]">
//                     <WifiOff className="w-5 h-5 text-white" strokeWidth={2.5} />
//                   </div>
//                 </div>
//               </div>

//               {/* Message */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
//                     Connection Lost
//                   </h3>
//                   <div className="flex gap-1">
//                     {[0, 1, 2].map((i) => (
//                       <div
//                         key={i}
//                         className="w-1 h-4 bg-gradient-to-t from-red-500 to-orange-500 rounded-full animate-pulse"
//                         style={{ animationDelay: `${i * 150}ms` }}
//                       ></div>
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-gray-400 text-sm">
//                   Waiting for network to reconnect...
//                 </p>
//               </div>

//               {/* Status indicator */}
//               <div className="flex-shrink-0 hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
//                 <Zap className="w-4 h-4 text-red-400 animate-pulse" />
//                 <span className="text-red-400 text-sm font-medium">Offline</span>
//               </div>
//             </div>

//             {/* Animated progress bar */}
//             <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-gradient-x"></div>
//           </div>

//           {/* Floating glow effect */}
//           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-red-500/20 blur-3xl rounded-full animate-pulse"></div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes ripple {
//           0% {
//             transform: translate(-50%, -50%) scale(0);
//             opacity: 1;
//           }
//           100% {
//             transform: translate(-50%, -50%) scale(2.5);
//             opacity: 0;
//           }
//         }

//         @keyframes float {
//           0% {
//             transform: translateY(0) translateX(0) rotate(0deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100vh) translateX(50px) rotate(360deg);
//             opacity: 0;
//           }
//         }

//         @keyframes gradient-x {
//           0%, 100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }

//         .animate-spin-slow {
//           animation: spin 3s linear infinite;
//         }

//         .animate-float {
//           animation: float linear infinite;
//         }

//         .animate-gradient-x {
//           background-size: 200% 200%;
//           animation: gradient-x 3s ease infinite;
//         }

//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

// Hook simulation for demo - replace with your actual useNetwork hook
function useNetwork() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return { isOnline };
}

export default function NoInternetComponent() {
  const { isOnline } = useNetwork();
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [dotSize, setDotSize] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 0.6 : 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOnline) {
      const glitchInterval = setInterval(() => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }, 3000);
      return () => clearInterval(glitchInterval);
    }
  }, [isOnline]);

  useEffect(() => {
    const updateDotSize = () => {
      if (window.innerWidth < 640) {
        setDotSize(4);
      } else if (window.innerWidth < 768) {
        setDotSize(5);
      } else {
        setDotSize(6);
      }
    };

    updateDotSize();
    window.addEventListener('resize', updateDotSize);
    return () => window.removeEventListener('resize', updateDotSize);
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  // Dot matrix pattern for WiFi icon
  const wifiPattern = [
    [0,0,0,1,1,0,0,0],
    [0,0,1,0,0,1,0,0],
    [0,1,0,0,0,0,1,0],
    [1,0,0,1,1,0,0,1],
    [0,0,1,0,0,1,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0],
  ];

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-red-500/30 shadow-[0_-4px_30px_rgba(239,68,68,0.2)]">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(239,68,68,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - Icon and message */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* WiFi Dot Matrix Icon */}
            <div className="flex flex-col gap-1">
              {wifiPattern.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {row.map((dot, colIndex) => (
                    <div
                      key={colIndex}
                      className={`rounded-full transition-all duration-300 ${
                        dot 
                          ? glitchEffect ? 'bg-[#CCF301]' : 'bg-red-500' 
                          : 'bg-gray-900'
                      }`}
                      style={{
                        width: `${dotSize}px`,
                        height: `${dotSize}px`,
                        boxShadow: dot 
                          ? glitchEffect 
                            ? `0 0 ${6 * glowIntensity}px rgba(204,243,1,${0.8 * glowIntensity}), 0 0 ${12 * glowIntensity}px rgba(204,243,1,${0.4 * glowIntensity})`
                            : `0 0 ${6 * glowIntensity}px rgba(239,68,68,${0.8 * glowIntensity}), 0 0 ${12 * glowIntensity}px rgba(239,68,68,${0.4 * glowIntensity})`
                          : 'inset 0 0 2px rgba(0,0,0,0.5)',
                        opacity: dot ? glowIntensity : 0.3,
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-base sm:text-lg">
                  No Internet Connection
                </h3>
                <WifiOff size={16} className="text-red-400 sm:w-4 sm:h-4" />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Please check your network connection and try again
              </p>
            </div>
          </div>

          {/* Right side - Retry button */}
          <button
            onClick={handleRetry}
            className="group flex items-center justify-center gap-2 bg-[#CCF301] hover:bg-[#b8dc00] text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(204,243,1,0.3)] hover:shadow-[0_0_30px_rgba(204,243,1,0.5)] text-sm sm:text-base whitespace-nowrap"
          >
            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500 sm:w-4 sm:h-4" />
            <span>Retry Connection</span>
          </button>
        </div>

        {/* Status line */}
        <div className="mt-3 pt-3 border-t border-red-500/20 flex items-center justify-center sm:justify-start gap-2">
          <span className="text-gray-500 text-xs font-mono">Status:</span>
          <span className="text-red-400 font-mono text-xs flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
            OFFLINE
          </span>
          <span className="text-gray-600 text-xs">•</span>
          <span className="text-gray-500 text-xs">Waiting for reconnection...</span>
        </div>
      </div>

      {/* Top glow line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
        style={{
          boxShadow: `0 0 ${10 * glowIntensity}px rgba(239, 68, 68, ${0.6 * glowIntensity})`,
          opacity: glowIntensity
        }}
      ></div>
    </div>
  );
}