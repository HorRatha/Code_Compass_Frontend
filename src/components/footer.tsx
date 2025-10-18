// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Send
// } from 'lucide-react';

// import codecompasslogo from "../../public/codecompass-2.png";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const navigationLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Problemsets', href: '/problemset' },
//     { name: 'Leaderboard', href: '/leaderboard' },
//     { name: 'About Us', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Privacy & Policy', href: '/privacy-policy' }
//   ];

//   return (
//     <footer className="font-barlow relative bg-[#000000] text-white overflow-hidden">
      
   
      
     

//       {/* Glass morphism overlay */}
//       {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent backdrop-blur-sm"></div> */}

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="py-12">
          
//           {/* Header Section with Logos */}
//           <div className="text-center mb-12">
//             <div className="flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8 mb-6">
//               {/* CodeCompass Logo */}
//               <div className="group flex items-center space-x-3 transition-all duration-300">
//                 <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
//                   <Image
//                     src={codecompasslogo}
//                     alt="CodeCompass Logo"
//                     fill
//                     className="object-contain filter drop-shadow-sm"
//                   />
//                 </div>
//               </div>
              
//               {/* Separator */}
//               <div className="w-px h-6 sm:h-7 lg:h-8 bg-gray-700"></div>
              
//               {/* Official School Logo */}
//               <div className="group flex items-center space-x-3 transition-all duration-300">
//                 <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52">
//                   <Image
//                     src="/New Logo iSTAD-06.png"
//                     alt="ISTAD Logo"
//                     fill
//                     className="object-contain filter drop-shadow-sm"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <p className="text-gray-400 text-sm sm:text-base lg:text-xl max-w-xl mx-auto leading-relaxed">
//               Code Until Life's Compass Point Your Way
//             </p>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-12">
            
//             {/* Navigation Links */}
//             <div className="space-y-4">
//               <h5 className="font-semibold text-base sm:text-lg lg:text-xl text-white mb-4 relative">
//                 <span className="relative z-10">Navigation</span>
//                 <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
//               </h5>
//               <div className="grid grid-cols-2 gap-1">
//                 {navigationLinks.map((link) => (
//                   <Link
//                     key={link.name}
//                     href={link.href}
//                     className="flex items-center px-3 py-2 rounded-lg text-xs sm:text-sm lg:text-base font-medium text-gray-400"
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="space-y-4">
//               <h5 className="font-semibold text-base sm:text-lg lg:text-xl text-white mb-4 relative">
//                 <span className="relative z-10">Contact</span>
//                 <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
//               </h5>
              
//               <div className="space-y-2">
//                 {[
//                   { Icon: Mail, text: 'codecompass.istad.co@gmail.com', href: 'mailto:codecompass.istad.co@gmail.com' },
//                   { Icon: Phone, text: '+855 123456789', href: 'tel:+855123456789' },
//                   { Icon: MapPin, text: 'Proudly built at ISTAD,\nPhnom Penh, Cambodia', href: '#' }
//                 ].map(({ Icon, text, href }, index) => (
//                   <Link
//                     key={index}
//                     href={href}
//                     className="group relative flex items-start space-x-3 px-3 py-2 rounded-lg"
//                   >
//                     <div className="relative z-10 min-w-8 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 via-primary20 to-primary/5 flex items-center justify-center transition-all duration-500 border border-primary/10">
//                       <Icon className="h-4 w-4 text-primary" />
//                     </div>
//                     <div className="relative z-10 flex-1 min-w-0">
//                       <span className="text-xs sm:text-sm lg:text-base font-medium leading-relaxed text-gray-400" style={{ whiteSpace: 'pre-line' }}>
//                         {text}
//                       </span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Social & Connect */}
//             <div className="space-y-4">
//               <h5 className="font-semibold text-base sm:text-lg lg:text-xl text-white mb-4 relative">
//                 <span className="relative z-10">Connect</span>
//                 <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
//               </h5>
              
//               {/* Social Links */}
//               <div className="flex items-center space-x-3">
//                 {[
//                   { 
//                     Icon: Send, 
//                     href: 'https://t.me/CodeCompassCommunity', 
//                     label: 'Telegram', 
//                     color: '#26A5E4' 
//                   },
//                   { 
//                     Icon: ({ className }: { className?: string }) => (
//                       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                       </svg>
//                     ),
//                     href: 'https://www.linkedin.com/in/codecompass-undefined-43810838b/', 
//                     label: 'LinkedIn', 
//                     color: '#0A66C2' 
//                   }
//                 ].map(({ Icon, href, label, color }, index) => (
//                   <a
//                     key={index}
//                     href={href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group relative w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-white/10"
//                     aria-label={label}
//                   >
//                     <Icon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 transition-all duration-300 text-[#CCF301] group-hover:scale-110"
//                           style={{ 
//                             transition: 'color 0.3s ease' 
//                           }}
//                           onMouseEnter={(e) => {
//                             const target = e.currentTarget as unknown as HTMLElement;
//                             target.style.color = color;
//                           }}
//                           onMouseLeave={(e) => {
//                             const target = e.currentTarget as unknown as HTMLElement;
//                             target.style.color = '#CCF301';
//                           }} />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Bottom Section */}
//           <div className="border-t border-gray-800/50 pt-6">
//             <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
              
//               <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
//                 <p className="text-gray-400 dark:text-gray-400 text-xs sm:text-sm lg:text-base font-medium">
//                   © {currentYear} CodeCompass — Where challenges meet growth.
//                 </p>
//                 <div className="flex items-center space-x-1 text-xs sm:text-sm">
//                   <span className="animate-pulse">🚀</span>
//                   <span className="text-gray-500 dark:text-gray-500">
//                     Built with passion in Cambodia
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-6">
//                 {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
//                   <Link
//                     key={index}
//                     href={`/${item.toLowerCase()}`}
//                     className="group relative text-gray-400 dark:text-gray-400 transition-all duration-500 text-xs sm:text-sm lg:text-base font-medium hover:text-gray-300 dark:hover:text-gray-300"
//                   >
//                     <span className="relative z-10">
//                       {item}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modern accent lines */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
//       <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
      
//     </footer>
//   );
// };

// export default Footer;


'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send
} from 'lucide-react';

import codecompasslogo from "../../public/codecompass-2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Problemsets', href: '/problemset' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy & Policy', href: '/privacy-policy' }
  ];

  return (
    <footer className="font-barlow relative bg-[#000000] text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          
          {/* Header Section with Logos - Compact */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3">
              {/* CodeCompass Logo */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                <Image
                  src={codecompasslogo}
                  alt="CodeCompass Logo"
                  fill
                  className="object-contain filter drop-shadow-sm"
                />
              </div>
              
              {/* Separator */}
              <div className="w-px h-4 sm:h-5 bg-gray-700"></div>
              
              {/* Official School Logo */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                <Image
                  src="/New Logo iSTAD-06.png"
                  alt="ISTAD Logo"
                  fill
                  className="object-contain filter drop-shadow-sm"
                />
              </div>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
              Code Until Life&apos;s Compass Point Your Way
            </p>
          </div>

          {/* Main Content Grid - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Navigation Links */}
            <div className="space-y-2">
              <h5 className="font-semibold text-sm sm:text-base text-white mb-2 relative">
                <span className="relative z-10">Navigation</span>
                <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
              </h5>
              <div className="grid grid-cols-2 gap-1">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-2 py-1 rounded text-xs sm:text-sm font-medium text-gray-400 hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <h5 className="font-semibold text-sm sm:text-base text-white mb-2 relative">
                <span className="relative z-10">Contact</span>
                <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
              </h5>
              
              <div className="space-y-1">
                {[
                  { Icon: Mail, text: 'codecompass.istad.co@gmail.com', href: 'mailto:codecompass.istad.co@gmail.com' },
                  { Icon: Phone, text: '+855 123456789', href: 'tel:+855123456789' },
                  { Icon: MapPin, text: 'Proudly built at ISTAD, Phnom Penh, Cambodia', href: '#' }
                ].map(({ Icon, text, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="flex items-start space-x-2 px-2 py-1 rounded group"
                  >
                    <div className="min-w-6 w-6 h-6 rounded bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10">
                      <Icon className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 leading-snug">
                      {text}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social & Connect */}
            <div className="space-y-2">
              <h5 className="font-semibold text-sm sm:text-base text-white mb-2 relative">
                <span className="relative z-10">Connect</span>
                <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
              </h5>
              
              {/* Social Links */}
              <div className="flex items-center space-x-2">
                {[
                  { 
                    Icon: Send, 
                    href: 'https://t.me/CodeCompassCommunity', 
                    label: 'Telegram', 
                    color: '#26A5E4' 
                  },
                  { 
                    Icon: ({ className }: { className?: string }) => (
                      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                    href: 'https://www.linkedin.com/in/codecompass-undefined-43810838b/', 
                    label: 'LinkedIn', 
                    color: '#0A66C2' 
                  }
                ].map(({ Icon, href, label, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-white/10"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 transition-all duration-300 text-[#CCF301] group-hover:scale-110"
                          style={{ 
                            transition: 'color 0.3s ease' 
                          }}
                          onMouseEnter={(e) => {
                            const target = e.currentTarget as unknown as HTMLElement;
                            target.style.color = color;
                          }}
                          onMouseLeave={(e) => {
                            const target = e.currentTarget as unknown as HTMLElement;
                            target.style.color = '#CCF301';
                          }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Compact */}
          <div className="border-t border-gray-800/50 pt-4">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0">
              
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
                <p className="text-gray-400 text-xs sm:text-sm font-medium">
                  © {currentYear} CodeCompass — Where challenges meet growth.
                </p>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="animate-pulse">🚀</span>
                  <span className="text-gray-500">
                    Built with passion in Cambodia
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 transition-all duration-300 text-xs sm:text-sm font-medium hover:text-gray-300"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
      
    </footer>
  );
};

export default Footer;