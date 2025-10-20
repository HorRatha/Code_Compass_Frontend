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
import { RefreshCw } from 'lucide-react';

function useNetwork() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  
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
  const [glowIntensity, setGlowIntensity] = useState<number>(1);
  const [attempting, setAttempting] = useState<boolean>(false);
  const [dotSize, setDotSize] = useState<number>(5);
  const [wifiPattern, setWifiPattern] = useState<number[][]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 0.6 : 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth < 640) { // Mobile
        setDotSize(3);
        setWifiPattern([
          [0,0,0,0,0,1,1,0,0,0,0,0],
          [0,0,0,1,1,1,1,1,1,0,0,0],
          [0,0,1,1,0,0,0,0,1,1,0,0],
          [0,1,1,0,0,1,1,0,0,1,1,0],
          [0,1,0,0,1,1,1,1,0,0,1,0],
          [1,0,0,1,1,0,0,1,1,0,0,1],
          [1,0,0,1,0,0,0,0,1,0,0,1],
          [0,0,0,0,0,1,1,0,0,0,0,0],
          [0,0,0,0,1,1,1,1,0,0,0,0],
          [0,0,0,0,1,0,0,1,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,1,0,0,0,0,0],
        ]);
      } else if (window.innerWidth < 768) { // Tablet
        setDotSize(4);
        setWifiPattern([
          [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
          [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
          [0,0,0,1,1,0,0,0,0,1,1,0,0,0],
          [0,0,1,1,0,0,1,1,0,0,1,1,0,0],
          [0,1,1,0,0,1,1,1,1,0,0,1,1,0],
          [0,1,0,0,1,1,0,0,1,1,0,0,1,0],
          [1,0,0,1,1,0,0,0,0,1,1,0,0,1],
          [1,0,0,1,0,0,0,0,0,0,1,0,0,1],
          [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
          [0,0,0,0,0,1,0,0,1,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        ]);
      } else { // Desktop
        setDotSize(5);
        setWifiPattern([
          [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
          [0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0],
          [0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0],
          [0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0],
          [0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0],
          [0,1,0,0,0,1,1,0,0,1,1,0,0,0,1,0],
          [0,1,0,0,1,1,0,0,0,0,1,1,0,0,1,0],
          [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
          [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]);
      }
    };

    updateResponsiveSettings();
    window.addEventListener('resize', updateResponsiveSettings);
    return () => window.removeEventListener('resize', updateResponsiveSettings);
  }, []);

  const handleRetry = (): void => {
    setAttempting(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (isOnline) return null;

  return (
    <div className="fixed bg-black bottom-0 left-0 right-0 z-50">
      {/* Black Glassmorphism liquid effect */}
      <div className="absolute inset-0 backdrop-blur-2xl">
        {/* Animated liquid blobs */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div 
            className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-2xl sm:blur-3xl"
            style={{
              top: '-20%',
              left: '10%',
              animation: 'float 20s ease-in-out infinite',
            }}
          ></div>
          <div 
            className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-full blur-2xl sm:blur-3xl"
            style={{
              top: '-10%',
              right: '20%',
              animation: 'float 15s ease-in-out infinite reverse',
            }}
          ></div>
          <div 
            className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-rose-500/15 to-red-500/15 rounded-full blur-2xl sm:blur-3xl"
            style={{
              bottom: '-15%',
              left: '50%',
              animation: 'float 18s ease-in-out infinite',
            }}
          ></div>
        </div>
        
        {/* Glass texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        
        {/* Noise texture for realism */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        }}></div>
      </div>

      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent shadow-lg shadow-red-500/50"></div>
      
      {/* Content */}
      <div className="relative border-t border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 lg:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 lg:gap-6">
            {/* Left side - LED WiFi Icon and message */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
              {/* Detailed LED WiFi Display */}
              <div className="relative flex-shrink-0">
                <div className="flex flex-col gap-0.5 p-1 sm:p-1.5 lg:p-2">
                  {wifiPattern.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-0.5">
                      {row.map((dot, colIndex) => (
                        <div
                          key={colIndex}
                          className={`rounded-sm transition-all duration-300 ${
                            dot 
                              ? 'bg-red-500' 
                              : 'bg-gray-950/40'
                          }`}
                          style={{
                            width: `${dotSize}px`,
                            height: `${dotSize}px`,
                            boxShadow: dot 
                              ? `0 0 ${4 * glowIntensity}px rgba(239,68,68,${0.8 * glowIntensity}), 0 0 ${8 * glowIntensity}px rgba(239,68,68,${0.4 * glowIntensity}), inset 0 0 ${2 * glowIntensity}px rgba(255,100,100,${0.6 * glowIntensity})`
                              : 'inset 0 0 2px rgba(0,0,0,0.8)',
                            opacity: dot ? glowIntensity : 0.3,
                          }}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-red-500 rounded-full border border-black/50 animate-pulse shadow-lg shadow-red-500/50"></div>
              </div>

              {/* Message */}
              <div className="text-center sm:text-left">
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 tracking-tight">
                  No Internet Connection
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Please check your network connection and try again
                </p>
              </div>
            </div>

            {/* Right side - Retry button */}
            <button
              onClick={handleRetry}
              disabled={attempting}
              className="group flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 text-xs sm:text-sm lg:text-base whitespace-nowrap"
            >
              <RefreshCw 
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 transition-transform duration-500 ${attempting ? 'animate-spin' : 'group-hover:rotate-180'}`}
                strokeWidth={2.5}
              />
              <span>{attempting ? 'Retrying...' : 'Retry Connection'}</span>
            </button>
          </div>

          {/* Status bar */}
          <div className="mt-3 sm:mt-4 lg:mt-5 pt-3 sm:pt-4 lg:pt-5 border-t border-white/10 flex items-center justify-center sm:justify-start gap-2 text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500/50"></span>
              <span className="text-gray-300 font-medium">Status: Offline</span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="text-gray-500">Waiting for reconnection...</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}