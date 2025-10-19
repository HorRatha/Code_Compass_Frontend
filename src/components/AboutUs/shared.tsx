// components/AboutUs/shared.tsx
"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import Image from 'next/image'

// =================== SHARED TYPES ===================
interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  gridOpacity?: number;
  fadeEdges?: boolean;
}

interface StatCardProps {
  value: string;
  label: string;
}

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  isLarge?: boolean;
  telegram?: string;
  github?: string;
  linkedin?: string;
}

// =================== GRID BACKGROUND COMPONENT ===================
export function GridBackground({ 
  className = "",
  gridSize = 40,
  gridOpacity = 0.15,
  fadeEdges = true,
}: GridBackgroundProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const hasThemeClass = document.documentElement.classList.contains('dark');
      setIsDark(hasThemeClass);
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const gridColor = isDark 
    ? `rgba(255, 255, 255, ${gridOpacity})` 
    : `rgba(0, 0, 0, ${gridOpacity})`;

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `
      linear-gradient(${gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundPosition: '0 0, 0 0',
  };

  const maskStyle: React.CSSProperties = fadeEdges ? {
    maskImage: `radial-gradient(ellipse at center, black 40%, transparent 70%)`,
    WebkitMaskImage: `radial-gradient(ellipse at center, black 40%, transparent 70%)`,
  } : {};

  return (
    <div 
      className={`absolute inset-0 transition-all duration-500 ${className}`}
      style={{
        ...backgroundStyle,
        ...maskStyle
      }}
    />
  );
}

// =================== INTERSECTION OBSERVER HOOK ===================
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.1, ...options })

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return { ref, isInView }
}

// =================== THEME PROVIDER ===================
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark] = useState(true)
  
  return (
    <div className={isDark ? "dark" : ""}>
      {children}
    </div>
  )
}

// =================== STAT CARD COMPONENT ===================
export function StatCard({ value, label }: StatCardProps) {
  const { ref, isInView } = useInView()
  
  return (
    <div 
      ref={ref}
      className={`
        relative group
        bg-white dark:bg-gray-900/50 backdrop-blur-xl
        p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl 
        shadow-lg dark:shadow-2xl
        border-2 border-gray-200 dark:border-gray-800
        hover:border-[#0b131c] dark:hover:border-[#CCF301]
        transition-all duration-500 
        overflow-hidden
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        transition-all duration-700
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b131c]/5 dark:from-[#CCF301]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[#0b131c]/20 dark:bg-[#CCF301]/20 -z-10"></div>
      
      <div className="relative z-10">
        <p className="text-4xl sm:text-5xl lg:text-6xl font-black font-barlow bg-gradient-to-br from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-barlow font-medium tracking-wide uppercase">{label}</p>
      </div>
    </div>
  )
}

// =================== TEAM CARD COMPONENT ===================
export function TeamCard({ name, role, image, isLarge = false, telegram, github, linkedin }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative ${isLarge ? "w-full sm:w-80 lg:w-96" : "w-full sm:w-72 lg:w-80"} transition-all duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative bg-white dark:bg-gray-900/50 backdrop-blur-xl
        ${isLarge ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-8"} 
        rounded-2xl sm:rounded-3xl
        shadow-xl border-2 border-gray-200 dark:border-gray-800
        hover:border-[#0b131c] dark:hover:border-[#CCF301]
        transition-all duration-500
        overflow-hidden
      `}>
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#0b131c]/20 dark:border-[#CCF301]/20 rounded-tl-2xl transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:border-[#0b131c] dark:group-hover:border-[#CCF301]"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#0b131c]/20 dark:border-[#CCF301]/20 rounded-br-2xl transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:border-[#0b131c] dark:group-hover:border-[#CCF301]"></div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#0b131c]/5 dark:from-[#CCF301]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Profile Image with Advanced Frame */}
        <div className="relative z-10 flex justify-center mb-6">
          <div className={`
            relative ${isLarge ? "w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56" : "w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"}
          `}>
            {/* Outer Hexagonal Frame */}
            <div className="absolute inset-0 transition-all duration-500 group-hover:rotate-180">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="transition-all duration-500" style={{ stopColor: isHovered ? '#0b131c' : 'rgba(11, 19, 28, 0.3)' }} />
                    <stop offset="100%" className="transition-all duration-500" style={{ stopColor: isHovered ? '#0b131c' : 'rgba(11, 19, 28, 0.1)' }} />
                  </linearGradient>
                  <linearGradient id={`grad-dark-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="transition-all duration-500" style={{ stopColor: isHovered ? '#CCF301' : 'rgba(204, 243, 1, 0.3)' }} />
                    <stop offset="100%" className="transition-all duration-500" style={{ stopColor: isHovered ? '#CCF301' : 'rgba(204, 243, 1, 0.1)' }} />
                  </linearGradient>
                </defs>
                <polygon 
                  points="50 1 95 25 95 75 50 99 5 75 5 25" 
                  className="fill-none stroke-[3] dark:hidden"
                  style={{ stroke: `url(#grad-${name})` }}
                />
                <polygon 
                  points="50 1 95 25 95 75 50 99 5 75 5 25" 
                  className="fill-none stroke-[3] hidden dark:block"
                  style={{ stroke: `url(#grad-dark-${name})` }}
                />
              </svg>
            </div>

            <div className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-full border-4 border-dashed border-[#0b131c]/20 dark:border-[#CCF301]/20 group-hover:border-[#0b131c] dark:group-hover:border-[#CCF301] transition-all duration-500 group-hover:rotate-360 animate-spin-slow"></div>

            {/* Image Container */}
            <div className="absolute inset-4 sm:inset-5 lg:inset-6 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-2xl">
              <Image
                src={image}
                alt={name}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b131c]/60 dark:from-[#CCF301]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[#0b131c] dark:bg-[#CCF301] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#0b131c] dark:bg-[#CCF301] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#0b131c] dark:bg-[#CCF301] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#0b131c] dark:bg-[#CCF301] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className={`
            font-bold font-barlow text-gray-900 dark:text-white mb-2 
            transition-all duration-300
            ${isLarge ? "text-xl sm:text-2xl lg:text-3xl" : "text-lg sm:text-xl lg:text-2xl"}
            group-hover:text-[#0b131c] dark:group-hover:text-[#CCF301]
          `}>
            {name}
          </h3>

          <p className={`
            text-[#0b131c] dark:text-[#CCF301] font-barlow font-semibold mb-4 uppercase tracking-wider
            ${isLarge ? "text-xs sm:text-sm" : "text-xs"}
          `}>
            {role}
          </p>
        </div>

        {/* Social Links - Always visible on mobile, hover on desktop */}
        <div className="relative z-10 flex justify-center space-x-3 sm:space-x-4 mt-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0">
          {telegram && (
            <a 
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-[#0b131c]/10 dark:hover:bg-[#CCF301]/20 active:bg-[#0b131c]/20 dark:active:bg-[#CCF301]/30 text-gray-600 dark:text-gray-400 hover:text-[#0b131c] dark:hover:text-[#CCF301] active:text-[#0b131c] dark:active:text-[#CCF301] transition-all duration-300 transform hover:scale-110 active:scale-95 hover:rotate-[360deg]"
              title="Telegram"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.154.232.17.326.016.094.036.307.02.473z"/>
              </svg>
            </a>
          )}
          {github && (
            <a 
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-[#0b131c]/10 dark:hover:bg-[#CCF301]/20 active:bg-[#0b131c]/20 dark:active:bg-[#CCF301]/30 text-gray-600 dark:text-gray-400 hover:text-[#0b131c] dark:hover:text-[#CCF301] active:text-[#0b131c] dark:active:text-[#CCF301] transition-all duration-300 transform hover:scale-110 active:scale-95 hover:rotate-[360deg]"
              title="GitHub"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {linkedin && (
            <a 
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-[#0b131c]/10 dark:hover:bg-[#CCF301]/20 active:bg-[#0b131c]/20 dark:active:bg-[#CCF301]/30 text-gray-600 dark:text-gray-400 hover:text-[#0b131c] dark:hover:text-[#CCF301] active:text-[#0b131c] dark:active:text-[#CCF301] transition-all duration-300 transform hover:scale-110 active:scale-95 hover:rotate-[360deg]"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
