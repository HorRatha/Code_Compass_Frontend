"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

// =================== Data ===================
const stats = [
  { value: "100+", label: "Algorithm Challenges" },
  { value: "150K+", label: "Developer Community" },
  { value: "95%", label: "Interview Success" },
  { value: "FAANG", label: "Placement Rate" },
]

// =================== Components ===================

// Intersection Observer Hook
function useInView(options = {}) {
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

// Theme Provider
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark] = useState(true)
  
  return (
    <div className={isDark ? "dark" : ""}>
      {children}
    </div>
  )
}

interface StatCardProps {
  value: string;
  label: string;
}

// Reusable Stat Card with Animation
function StatCard({ value, label }: StatCardProps) {
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
        transition-all duration-500 hover:scale-105
        overflow-hidden
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        transition-all duration-700
      `}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b131c]/5 dark:from-[#CCF301]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glowing Border Effect */}
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

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  isLarge?: boolean;
  telegram?: string;
  github?: string;
  linkedin?: string;
}

function TeamCard({ name, role, image, isLarge = false, telegram, github, linkedin }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative ${isLarge ? "w-full sm:w-80 lg:w-96" : "w-full sm:w-72 lg:w-80"} transition-all duration-500 hover:scale-105`}
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
        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#0b131c]/20 dark:border-[#CCF301]/20 rounded-tl-2xl transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:border-[#0b131c] dark:group-hover:border-[#CCF301]"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#0b131c]/20 dark:border-[#CCF301]/20 rounded-br-2xl transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:border-[#0b131c] dark:group-hover:border-[#CCF301]"></div>

        {/* Glowing Background Effect */}
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

            {/* Inner Spinning Ring */}
            <div className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-full border-4 border-dashed border-[#0b131c]/20 dark:border-[#CCF301]/20 group-hover:border-[#0b131c] dark:group-hover:border-[#CCF301] transition-all duration-500 group-hover:rotate-360 animate-spin-slow"></div>

            {/* Image Container */}
            <div className="absolute inset-4 sm:inset-5 lg:inset-6 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-2xl">
              <Image
                src={image}
                alt={name}
                fill
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b131c]/60 dark:from-[#CCF301]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Corner Dots */}
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

        {/* Social Links */}
        <div className="relative z-10 flex justify-center space-x-3 sm:space-x-4 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          {telegram && (
            <a 
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-spin p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-[#0b131c]/10 dark:hover:bg-[#CCF301]/20 text-gray-600 dark:text-gray-400 hover:text-[#0b131c] dark:hover:text-[#CCF301] transition-all duration-300 transform hover:scale-110"
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
              className="hover-spin p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-[#0b131c]/10 dark:hover:bg-[#CCF301]/20 text-gray-600 dark:text-gray-400 hover:text-[#0b131c] dark:hover:text-[#CCF301] transition-all duration-300 transform hover:scale-110"
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
              className="hover-spin p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-[#0b131c]/10 dark:hover:bg-[#CCF301]/20 text-gray-600 dark:text-gray-400 hover:text-[#0b131c] dark:hover:text-[#CCF301] transition-all duration-300 transform hover:scale-110"
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

// =================== Main Page ===================
export default function About() {
  const heroView = useInView()
  const codeView = useInView()
  const missionView = useInView()
  const teamView = useInView()

  // Mock data - Replace URLs with your own
  const mentors = [
    { 
      name: "Mr. Kay Kao", 
      role: "Instructor", 
      image: "./image/teacherkeo.jpg",
      telegram: "https://t.me/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername"
    },
    { 
      name: "Mr. Sreng Chipor", 
      role: "Instructor", 
      image: "./image/mentor-2.jpg",
      telegram: "https://t.me/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername"
    },
  ]

  const coreTeam = [
    { 
      name: "Chheng Panharoth", 
      role: "Full-Stack Developer", 
      image: "./image/team-leader.jpg",
      telegram: "https://t.me/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername"
    },
    { 
      name: "Chheng Devith", 
      role: "Full-Stack Developer", 
      image: "./image/devit.jpg",
      telegram: "https://t.me/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername"
    },
    { 
      name: "Rin Bunvarn", 
      role: "Full-Stack Developer", 
      image: "./image/bunvarn.jpg",
      telegram: "https://t.me/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername"
    },
    { 
      name: "Hor Rotha", 
      role: "Full-Stack Developer", 
      image: "./image/rotha.jpg",
      telegram: "https://t.me/Xeinn7",
      github: "https://github.com/HorRatha",
      linkedin: "https://www.linkedin.com/in/hor-ratha-42bb35388"
    },
    { 
      name: "Seu Narong", 
      role: "Full-Stack Developer", 
      image: "./image/narong.jpg",
      telegram: "https://t.me/yourusername",
      github: "https://github.com/NarongSeu",
      linkedin: "https://linkedin.com/in/yourusername"
    },
    { 
      name: "Mom Raksmey", 
      role: "Full-Stack Developer", 
      image: "./image/raksmey.jpg",
      telegram: "https://t.me/Raksmeyy41",
      github: "https://github.com/raksmeymom",
      linkedin: "https://www.linkedin.com/in/mom-raksmey-3b0288389"
    },
    { 
      name: "Thang Kimsang", 
      role: "Full-Stack Developer", 
      image: "./image/kimsang.jpg",
      telegram: "https://t.me/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername"
    },
  ]

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
        
        {/* Barlow Font */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&display=swap');
          
          .font-barlow {
            font-family: 'Barlow', sans-serif;
          }
          
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

        {/* Animated Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#0b131c]/5 dark:bg-[#CCF301]/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-blue-500/5 dark:bg-purple-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-500/5 dark:bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div ref={heroView.ref} className="max-w-7xl mx-auto w-full">
            <header className={`text-center mb-12 sm:mb-16 space-y-6 sm:space-y-8 transition-all duration-1000 ${heroView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Logo */}
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 flex items-center justify-center shadow-2xl shadow-[#0b131c]/20 dark:shadow-[#CCF301]/40 rotate-6 hover:rotate-12 transition-transform duration-500">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white dark:text-gray-900 font-barlow">&lt;/&gt;</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-barlow bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">
                  CodeCompass
                </h3>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight font-barlow">
                Navigate Your <br />
                <span className="bg-gradient-to-r from-[#0b131c] via-[#0b131c]/80 to-[#0b131c] dark:from-[#CCF301] dark:via-[#CCF301]/80 dark:to-[#CCF301] bg-clip-text text-transparent">
                  Coding Journey
                </span>
              </h1>

              {/* Description */}
              <div className="mb-8">
                <p className="text-sm sm:text-base lg:text-xl leading-relaxed max-w-2xl mx-auto font-barlow text-gray-700 dark:text-gray-300">
                  Master algorithms, and level up your programming skills with our cutting-edge coding platform designed for the next generation of developers.
                </p>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {stats.map((stat, i) => (
                <StatCard key={i} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Code & Design Section */}
        <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div ref={codeView.ref} className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              
              {/* Left Content */}
              <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${codeView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight font-barlow">
                  Where Code Meets <br />
                  <span className="bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">
                    Design Excellence
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-barlow">
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
                    <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700/50 text-xs sm:text-sm font-medium font-barlow hover:border-[#0b131c] dark:hover:border-[#CCF301] transition-all duration-300">
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
                    <span className="ml-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-mono font-barlow">CodeCompass.js</span>
                  </div>
                  <pre className="text-xs sm:text-sm font-mono overflow-auto bg-gray-50 dark:bg-gray-950/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
                    <code className="text-gray-800 dark:text-gray-200 font-barlow">
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

        {/* Mission Section */}
        <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div ref={missionView.ref} className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${missionView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 font-barlow">
                Our <span className="bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-barlow">
                Providing world-class algorithmic training and interview preparation through challenging problems,
                competitive programming, and comprehensive system design education.
              </p>
            </div>

            {/* Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: "< />",
                  title: "Algorithm Mastery",
                  desc: "From basic sorting to advanced dynamic programming, master every data structure and algorithm with progressive difficulty levels.",
                  delay: "delay-0"
                },
                {
                  icon: "🎯",
                  title: "Beginner-Friendly",
                  desc: "Step-by-step challenges designed to help beginners gain confidence and grow their coding skills efficiently.",
                  delay: "delay-200"
                },
                {
                  icon: "🚀",
                  title: "Problem-Solving Skills",
                  desc: "Sharpen your problem-solving skills and get ready for real-world technical interviews.",
                  delay: "delay-400"
                },
              ].map((item, i) => (
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
                    transition-all duration-1000 ${item.delay}
                  `}
                >
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-[#0b131c]/10 dark:from-[#CCF301]/10 to-transparent flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-500 border-2 border-[#0b131c]/20 dark:border-[#CCF301]/30">
                      {item.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-barlow group-hover:text-[#0b131c] dark:group-hover:text-[#CCF301] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-barlow">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div ref={teamView.ref} className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${teamView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 font-barlow">
                MEET OUR <span className="bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">TEAM</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-barlow">
                The brilliant minds behind our success – mentors and innovators dedicated to revolutionizing the future of
                technology and development.
              </p>
            </div>

            {/* Mentors */}
            <div className="mb-16 sm:mb-20 lg:mb-24">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 font-barlow">
                Our <span className="text-[#0b131c] dark:text-[#CCF301]">Mentors</span>
              </h3>
              <div className={`flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-12 transition-all duration-1000 delay-200 ${teamView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                {mentors.map((mentor, idx) => (
                  <TeamCard key={idx} {...mentor} isLarge={true} />
                ))}
              </div>
            </div>

            {/* Core Team */}
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 font-barlow">
                Our <span className="text-[#0b131c] dark:text-[#CCF301]">Core Team</span>
              </h3>
              
              {/* Team Leader */}
              <div className={`flex justify-center mb-8 sm:mb-10 lg:mb-12 transition-all duration-1000 delay-300 ${teamView.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <TeamCard {...coreTeam[0]} />
              </div>

              {/* Team Members */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center transition-all duration-1000 delay-500 ${teamView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                {coreTeam.slice(1).map((member, idx) => (
                  <TeamCard key={idx} {...member} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Creator CTA Section */}
        <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 rounded-2xl sm:rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Card */}
              <div className="relative bg-white dark:bg-gray-900/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 font-barlow">
                  Wanna Become Our <span className="text-[#0b131c] dark:text-[#CCF301]">Creator</span>?
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto font-barlow">
                  Join our community of problem setters and help create challenging coding problems. Share your expertise
                  and inspire thousands of developers worldwide.
                </p>
                <a
                  href="/creator-request"
                  className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-[#0b131c] to-[#0b131c]/80 dark:from-[#CCF301] dark:to-[#CCF301]/80 text-white dark:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0b131c]/30 dark:hover:shadow-[#CCF301]/60 transform font-barlow"
                >
                  Join as Creator →
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ThemeProvider>
  )
}