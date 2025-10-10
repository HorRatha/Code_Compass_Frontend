"use client"

import Image from "next/image"
import { STATS } from "./constants"
import { GridBackground, useInView, StatCard } from "./shared"

export function HeroSection() {
  const heroView = useInView()

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-white dark:bg-black transition-colors duration-300">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#0b131c]/5 dark:bg-[#CCF301]/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-blue-500/5 dark:bg-purple-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-500/5 dark:bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Background */}
      <GridBackground 
        gridSize={40}
        gridOpacity={0.1}
        fadeEdges={true}
      />
      
      <div ref={heroView.ref} className="max-w-7xl mx-auto w-full relative z-10">
        <header className={`text-center mb-12 sm:mb-16 space-y-6 sm:space-y-8 transition-all duration-1000 ${heroView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
            <div className="w-22 h-12 sm:w-26 sm:h-16 lg:w-40 lg:h-20 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500">
              <Image 
                src="/compassV.gif" 
                alt="CodeCompass Logo" 
                width={160}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight font-barlow text-gray-900 dark:text-white">
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
          {STATS.map((stat, i) => (
            <StatCard key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}