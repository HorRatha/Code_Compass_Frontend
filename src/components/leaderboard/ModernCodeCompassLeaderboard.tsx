"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Crown, Medal, Award, Trophy, Sparkles, Star, Code, Flame, X, ChevronLeft, ChevronRight, Zap, Menu } from "lucide-react"
import { useGetLeaderboardQuery } from "@/lib/services/leaderboard/leaderboardApi"
import { useGetUserProfileQuery } from "@/lib/services/leaderboard/userProfileApi"
import { cn } from "@/lib/utils"

interface UserLanguageResponse {
  language_id: string
  total_problem_solved_by_language: number
}

interface LeaderboardUser {
  rank: number
  username: string
  star: number
  totalProblemsSolved: number
  location?: string
  image_url?: string
  level?: string
  user_language_responses?: UserLanguageResponse[]
}

interface ProgrammingLanguage {
  name: string
  problems: number
  color: string
}

interface Player {
  rank: number
  username: string
  avatar: string
  stars: number
  problems: number
  country: string
  level: string
}

function GoldCrown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold-gradient" x1="12" y1="3" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="0.5" stopColor="#FFA500" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
        <filter id="gold-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M2 20h20v2H2v-2zm1-3h18l-2-10-5 4-2-6-2 6-5-4-2 10z" fill="url(#gold-gradient)" stroke="#FFD700" strokeWidth="1" filter="url(#gold-glow)" />
      <circle cx="12" cy="4" r="2" fill="#FFD700" />
      <circle cx="7" cy="7" r="2" fill="#FFD700" />
      <circle cx="17" cy="7" r="2" fill="#FFD700" />
    </svg>
  )
}

function SilverCrown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silver-gradient" x1="12" y1="3" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5F5F5" />
          <stop offset="0.5" stopColor="#C0C0C0" />
          <stop offset="1" stopColor="#A8A8A8" />
        </linearGradient>
      </defs>
      <path d="M2 20h20v2H2v-2zm1-3h18l-2-10-5 4-2-6-2 6-5-4-2 10z" fill="url(#silver-gradient)" stroke="#E8E8E8" strokeWidth="1" />
      <circle cx="12" cy="4" r="1.5" fill="#E8E8E8" />
      <circle cx="7" cy="7" r="1.5" fill="#E8E8E8" />
      <circle cx="17" cy="7" r="1.5" fill="#E8E8E8" />
    </svg>
  )
}

function BronzeCrown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bronze-gradient" x1="12" y1="3" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CD7F32" />
          <stop offset="0.5" stopColor="#B87333" />
          <stop offset="1" stopColor="#8B4513" />
        </linearGradient>
      </defs>
      <path d="M2 20h20v2H2v-2zm1-3h18l-2-10-5 4-2-6-2 6-5-4-2 10z" fill="url(#bronze-gradient)" stroke="#CD7F32" strokeWidth="1" />
      <circle cx="12" cy="4" r="1.5" fill="#CD7F32" />
      <circle cx="7" cy="7" r="1.5" fill="#CD7F32" />
      <circle cx="17" cy="7" r="1.5" fill="#CD7F32" />
    </svg>
  )
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
    case 3:
      return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
    default:
      return <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
  }
}

// Sidebar Profile Component
function SidebarProfile({ 
  isDarkMode, 
  userName, 
  userTitle, 
  userAvatar, 
  userRank, 
  userStars, 
  userProblems,
  programmingLanguages, 
  isDesktopVisible, 
  onToggleDesktop 
}: {
  isDarkMode: boolean
  userName: string
  userTitle: string
  userAvatar: string
  userRank?: number
  userStars?: number
  userProblems?: number
  programmingLanguages: ProgrammingLanguage[]
  isDesktopVisible: boolean
  onToggleDesktop: () => void
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const getAchievementBadges = (rank?: number) => {
    const badges = []
    
    if (rank && rank <= 10) {
      badges.push({
        name: "Top 10 Coders",
        icon: Trophy,
        color: "yellow"
      })
    }
    
    if (rank && rank <= 50) {
      badges.push({
        name: "Top 50 Holders", 
        icon: Star,
        color: "blue"
      })
    }
    
    if (rank && rank <= 100) {
      badges.push({
        name: "Top 100 Active",
        icon: Flame,
        color: "red"
      })
    }

    if (badges.length === 0) {
      badges.push({
        name: "Rising Coder",
        icon: Zap,
        color: "purple"
      })
    }

    return badges
  }

  const achievementBadges = getAchievementBadges(userRank)
  const primaryColor = isDarkMode ? '#CCF301' : '#0b131c'

  const sidebarContent = (
    <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-3 transition-all duration-300 flex-shrink-0`}
            style={{ 
              borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.3)' : 'rgba(11, 19, 28, 0.3)',
              boxShadow: isDarkMode ? '0 10px 20px rgba(204, 243, 1, 0.1)' : '0 10px 20px rgba(11, 19, 28, 0.1)'
            }}>
            <Image
              src={userAvatar}
              alt={userName}
              fill
              sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="min-w-0 flex-1">
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 truncate ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {userName}
            </h2>
            <p className={`text-xs sm:text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {userTitle}
            </p>
            {userRank && (
              <p className={`text-xs mt-1 font-semibold`} style={{ color: primaryColor }}>
                Rank: #{userRank}
              </p>
            )}
          </div>
        </div>

        {(userStars !== undefined || userProblems !== undefined) && (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {userStars !== undefined && (
              <div className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50' 
                  : 'bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-300/50'
              } backdrop-blur-sm`}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: primaryColor }} />
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Stars
                  </span>
                </div>
                <p className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userStars.toLocaleString()}
                </p>
              </div>
            )}
            {userProblems !== undefined && (
              <div className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50' 
                  : 'bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-300/50'
              } backdrop-blur-sm`}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: primaryColor }} />
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Solved
                  </span>
                </div>
                <p className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProblems}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {achievementBadges.map((badge) => {
            const IconComponent = badge.icon
            const colorClasses = {
              yellow: isDarkMode
                ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 text-yellow-400"
                : "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-700",
              blue: isDarkMode
                ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400"
                : "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-700",
              red: isDarkMode
                ? "bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/20 text-red-400"
                : "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 text-red-700",
              purple: isDarkMode
                ? "bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-400"
                : "bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-700"
            }

            return (
              <div
                key={badge.name}
                className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  colorClasses[badge.color as keyof typeof colorClasses]
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm">{badge.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <Code className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: primaryColor }} />
          Programming Languages
        </h3>
        
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          {programmingLanguages.length > 0 ? (
            programmingLanguages.map((lang) => (
              <div key={lang.name} className={`flex justify-between items-center p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-800' 
                  : 'bg-gray-100/80 border-gray-300/50 hover:bg-white'
              } backdrop-blur-sm`}>
                <span className={`font-medium text-xs sm:text-sm lg:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {lang.name}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`font-bold text-xs sm:text-sm lg:text-base ${lang.color}`}>
                    {lang.problems}
                  </span>
                  <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    problems
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-sm text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              No languages data yet
            </p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden
        fixed top-0 left-0
        h-screen
        w-80
        border-r overflow-y-auto
        transform transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isDarkMode 
          ? 'border-white/10 bg-gradient-to-b from-slate-900/98 to-black/98' 
          : 'border-black/10 bg-gradient-to-b from-white/98 to-gray-50/98'
        } backdrop-blur-xl shadow-2xl
        z-50
      `}>
        <button
          onClick={() => setIsMobileOpen(false)}
          className={`absolute top-4 right-4 z-10 p-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
              : 'bg-black/5 border-black/10 text-gray-900 hover:bg-black/10'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
        {sidebarContent}
      </div>

      {/* Mobile Toggle Button - Only show when sidebar is hidden and user is authenticated */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className={`lg:hidden fixed top-4 left-4 z-50 p-2.5 sm:p-3 rounded-xl shadow-lg border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-900/95 border-white/20 text-white hover:bg-slate-800/95 shadow-black/20' 
              : 'bg-white/95 border-black/20 text-gray-900 hover:bg-gray-50/95 shadow-black/10'
          } backdrop-blur-sm hover:scale-110`}
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Desktop Sidebar Toggle Button - Only show when sidebar is hidden */}
      {!isDesktopVisible && (
        <button
          onClick={onToggleDesktop}
          className={`hidden lg:block fixed top-6 left-6 z-50 p-3 rounded-full shadow-lg border transition-all duration-300 hover:scale-110 ${
            isDarkMode 
              ? 'bg-slate-900/95 border-white/20 text-white hover:bg-slate-800/95 shadow-black/20' 
              : 'bg-white/95 border-black/20 text-gray-900 hover:bg-gray-50/95 shadow-black/10'
          } backdrop-blur-sm`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Desktop Sidebar */}
      {isDesktopVisible && (
        <div className={`
          hidden lg:block
          fixed top-0 left-0
          h-screen
          w-80 xl:w-96
          border-r overflow-y-auto
          ${isDarkMode 
            ? 'border-white/10 bg-gradient-to-b from-slate-900/98 to-black/98' 
            : 'border-black/10 bg-gradient-to-b from-white/98 to-gray-50/98'
          } backdrop-blur-xl shadow-2xl
          z-40
        `}>
          <button
            onClick={onToggleDesktop}
            className={`absolute top-4 right-4 z-10 p-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                : 'bg-black/5 border-black/10 text-gray-900 hover:bg-black/10'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {sidebarContent}
        </div>
      )}
    </>
  )
}

export default function ModernCodeCompassLeaderboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(false)

  const {
    data: leaderboardResponse,
    isLoading: leaderboardLoading,
    error: leaderboardError,
    refetch: refetchLeaderboard,
  } = useGetLeaderboardQuery()

  const { data: userProfile, isLoading: userProfileLoading } = useGetUserProfileQuery()

  useEffect(() => {
    // Check if dark mode is enabled on the document
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDarkMode(isDark)
    }

    // Check initially
    checkDarkMode()

    // Create a MutationObserver to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkDarkMode()
        }
      })
    })

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const getLanguageNameFromId = (languageId: string) => {
    const languageMap: Record<string, string> = {
      "javascript": "JavaScript",
      "python": "Python",
      "java": "Java",
      "c": "C",
      "cpp": "C++",
      "csharp": "C#",
      "go": "Go",
      "rust": "Rust",
      "typescript": "TypeScript",
      "php": "PHP"
    }
    return languageMap[languageId.toLowerCase()] || languageId
  }

  const getLanguageColor = (languageId: string) => {
    const colorMap: Record<string, string> = {
      "javascript": "text-yellow-500",
      "python": "text-blue-500",
      "java": "text-red-500",
      "c": "text-gray-600",
      "cpp": "text-purple-500",
      "csharp": "text-green-500",
      "go": "text-cyan-500",
      "rust": "text-orange-500",
      "typescript": "text-blue-600",
      "php": "text-indigo-500"
    }
    return colorMap[languageId.toLowerCase()] || "text-gray-500"
  }

  const leaderboardUsers: LeaderboardUser[] = leaderboardResponse?.userProfileResponses || []
  const leaderboardData: Player[] = leaderboardUsers.map((user) => ({
    rank: user.rank,
    username: user.username,
    avatar: user.image_url || "/image/default-avatar.jpg",
    stars: user.star,
    problems: user.totalProblemsSolved,
    country: user.location || "🇰🇭",
    level: user.level || "Code Newborn",
  }))

  const topThree = leaderboardData.slice(0, 3)
  const remaining = leaderboardData.slice(3)

  const isAuthenticated = userProfile && userProfile.username
  const primaryColor = isDarkMode ? '#CCF301' : '#0b131c'

  const currentUser = isAuthenticated ? {
    rank: userProfile.rank || 0,
    username: userProfile.username || "Guest User",
    avatar: userProfile.imageUrl || "/image/default-avatar.jpg",
    stars: userProfile.star || 0,
    problems: userProfile.totalProblemsSolved || 0,
    level: userProfile.level || "Code Newborn",
  } : null

  const programmingLanguages: ProgrammingLanguage[] = 
    (isAuthenticated && userProfile && 'user_language_responses' in userProfile && Array.isArray(userProfile.user_language_responses))
      ? (userProfile.user_language_responses as UserLanguageResponse[]).map((lang) => ({
          name: getLanguageNameFromId(lang.language_id),
          problems: lang.total_problem_solved_by_language,
          color: getLanguageColor(lang.language_id)
        }))
      : []

  if (leaderboardError) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-slate-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className="text-center px-4">
          <div className="text-lg sm:text-xl mb-4 text-red-400">Error loading leaderboard data</div>
          <button
            onClick={() => refetchLeaderboard()}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold hover:scale-105 transition-transform duration-300"
            style={{ 
              backgroundColor: primaryColor,
              color: isDarkMode ? 'black' : 'white'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (leaderboardLoading || userProfileLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-slate-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className={`text-base sm:text-lg lg:text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Loading leaderboard...
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-slate-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="flex min-h-screen">
        {isAuthenticated && currentUser && (
          <SidebarProfile
            isDarkMode={isDarkMode}
            userName={currentUser.username}
            userTitle={currentUser.level}
            userAvatar={currentUser.avatar}
            userRank={currentUser.rank}
            userStars={currentUser.stars}
            userProblems={currentUser.problems}
            programmingLanguages={programmingLanguages}
            isDesktopVisible={isDesktopSidebarVisible}
            onToggleDesktop={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)}
          />
        )}

        <div className={`flex-1 transition-all duration-300 ${
          isAuthenticated && isDesktopSidebarVisible ? 'lg:ml-80 xl:ml-96' : 'lg:ml-0'
        }`}>
          <div className={`transition-all duration-300 ${
            isAuthenticated && isDesktopSidebarVisible 
              ? 'px-3 sm:px-4 lg:px-6 xl:px-8' 
              : 'px-3 sm:px-4 lg:px-6 xl:px-12 2xl:px-20 max-w-[1600px] mx-auto'
          } py-4 sm:py-6 lg:py-8`}>
            
            <div className="mx-auto">
              <div className="mb-6 sm:mb-10 lg:mb-12 text-center px-2">
                <h1 className={`mb-2 sm:mb-3 lg:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <span style={{ color: primaryColor }}>LEADERBOARD</span>
                </h1>
                <p className={`text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Compete, Code, Conquer - Master the art of programming and climb to the top
                </p>
              </div>

              {topThree.length >= 3 && (
                <div className="relative mb-8 sm:mb-12 lg:mb-16 flex items-end justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 max-w-6xl mx-auto">
                  <PodiumCard player={topThree[1]} position="left" isDarkMode={isDarkMode} primaryColor={primaryColor} />
                  <PodiumCard player={topThree[0]} position="center" isDarkMode={isDarkMode} primaryColor={primaryColor} />
                  <PodiumCard player={topThree[2]} position="right" isDarkMode={isDarkMode} primaryColor={primaryColor} />
                </div>
              )}

              <div className={`overflow-hidden rounded-lg border backdrop-blur-sm ${
                isDarkMode 
                  ? 'border-white/10 bg-slate-900/40' 
                  : 'border-gray-300/50 bg-white/40'
              }`}>
                {/* Desktop Table Headers */}
                <div className={`hidden sm:grid grid-cols-6 gap-2 sm:gap-4 border-b px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode 
                    ? 'border-white/10 bg-white/5' 
                    : 'border-gray-300/30 bg-gray-100/50'
                }`} style={{ color: primaryColor }}>
                  <div>Rank</div>
                  <div>Coder</div>
                  <div className="text-center">Level</div>
                  <div className="text-right">Stars</div>
                  <div className="text-right">Problems</div>
                  <div className="text-center">Country</div>
                </div>

                {/* Mobile Table Headers */}
                <div className={`sm:hidden grid grid-cols-4 gap-2 border-b px-3 py-3 text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode 
                    ? 'border-white/10 bg-white/5' 
                    : 'border-gray-300/30 bg-gray-100/50'
                }`} style={{ color: primaryColor }}>
                  <div>Rank</div>
                  <div>Coder</div>
                  <div className="text-right">Stars</div>
                  <div className="text-center">Solved</div>
                </div>

                {isAuthenticated && currentUser && currentUser.rank > 0 && (
                  <>
                    {/* Desktop Current User Row */}
                    <div className={`hidden sm:grid grid-cols-6 gap-2 sm:gap-4 border-b px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm ${
                      isDarkMode 
                        ? 'border-[#CCF301]/30 bg-[#CCF301]/5' 
                        : 'border-[#0b131c]/30 bg-[#0b131c]/5'
                    }`}>
                      <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        #{currentUser.rank}
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 overflow-hidden rounded-full border relative"
                          style={{ borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.5)' : 'rgba(11, 19, 28, 0.5)' }}>
                          <Image
                            src={currentUser.avatar}
                            alt="You"
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <span className="font-semibold truncate" style={{ color: primaryColor }}>You</span>
                      </div>
                      <div className={`flex items-center justify-center truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currentUser.level}
                      </div>
                      <div className="flex items-center justify-end font-bold" style={{ color: primaryColor }}>
                        {currentUser.stars.toLocaleString()}
                      </div>
                      <div className={`flex items-center justify-end ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currentUser.problems}
                      </div>
                      <div className="flex items-center justify-center">🇰🇭</div>
                    </div>

                    {/* Mobile Current User Row */}
                    <div className={`sm:hidden grid grid-cols-4 gap-2 border-b px-3 py-3 text-xs ${
                      isDarkMode 
                        ? 'border-[#CCF301]/30 bg-[#CCF301]/5' 
                        : 'border-[#0b131c]/30 bg-[#0b131c]/5'
                    }`}>
                      <div className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        #{currentUser.rank}
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-6 w-6 overflow-hidden rounded-full border relative flex-shrink-0"
                          style={{ borderColor: isDarkMode ? 'rgba(204, 243, 1, 0.5)' : 'rgba(11, 19, 28, 0.5)' }}>
                          <Image
                            src={currentUser.avatar}
                            alt="You"
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </div>
                        <span className="font-semibold truncate text-xs" style={{ color: primaryColor }}>You</span>
                      </div>
                      <div className="flex items-center justify-end font-bold" style={{ color: primaryColor }}>
                        {currentUser.stars.toLocaleString()}
                      </div>
                      <div className={`flex items-center justify-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currentUser.problems}
                      </div>
                    </div>
                  </>
                )}

                {topThree.map((player, index) => (
                  <TableRow 
                    key={`${player.rank}-${player.username}-${index}`} 
                    player={player} 
                    isTopThree 
                    isDarkMode={isDarkMode} 
                    primaryColor={primaryColor} 
                  />
                ))}

                {remaining.map((player, index) => (
                  <TableRow 
                    key={`${player.rank}-${player.username}-${index}`} 
                    player={player} 
                    isDarkMode={isDarkMode} 
                    primaryColor={primaryColor} 
                  />
                ))}
              </div>

              <div className="text-center mt-6 sm:mt-8 px-4">
                <button className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-xl border-2 font-bold text-xs sm:text-sm lg:text-base transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-xl"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor
                    e.currentTarget.style.color = isDarkMode ? 'black' : 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = primaryColor
                  }}
                >
                  View More Coders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes rotate-ring {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes shine {
          from {
            left: -100%;
          }
          to {
            left: 200%;
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        .animate-rotate-ring {
          animation: rotate-ring 10s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>  
  )
}

// ... (keep the PodiumCard and TableRow components exactly as they are)

function PodiumCard({ player, position }: { 
  player: Player
  position: "left" | "center" | "right"
  isDarkMode: boolean
  primaryColor: string
}) {
  const isFirst = position === "center"
  const isSecond = position === "left"
  const isThird = position === "right"

  const podiumHeight = isFirst ? "h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80" : isSecond ? "h-36 sm:h-44 md:h-52 lg:h-60 xl:h-64" : "h-32 sm:h-36 md:h-44 lg:h-52 xl:h-56"
  const avatarSize = isFirst
    ? "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32"
    : isSecond
      ? "h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28"
      : "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24"

  return (
    <div className="group relative flex flex-col items-center flex-1 max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]">
      <div
        className={cn(
          "relative mb-2 sm:mb-3 transition-all duration-500",
          isFirst && "animate-bounce-slow drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]",
          isSecond && "animate-float",
          isThird && "animate-float delay-300",
        )}
      >
        {isFirst && <GoldCrown />}
        {isSecond && <SilverCrown />}
        {isThird && <BronzeCrown />}

        {isFirst && (
          <>
            <Sparkles className="absolute -right-1 -top-1 h-3 w-3 sm:h-4 sm:w-4 animate-sparkle text-yellow-400" />
            <Sparkles className="absolute -left-1 -top-0.5 h-2 w-2 sm:h-3 sm:w-3 animate-sparkle text-yellow-300 delay-500" />
            <Star className="absolute -right-0.5 top-2 h-2 w-2 sm:h-3 sm:w-3 animate-sparkle text-yellow-400 delay-300" />
          </>
        )}
      </div>

      <div className={cn("relative mb-3 sm:mb-4 transition-all duration-500 hover:scale-110", avatarSize)}>
        {isFirst && (
          <div className="absolute -inset-2 sm:-inset-3 animate-rotate-ring rounded-full border-2 border-dashed border-[#CCF301]/40" />
        )}

        <div
          className={cn(
            "absolute -inset-2 sm:-inset-3 rounded-full blur-xl transition-all duration-500",
            isFirst && "animate-pulse-slow bg-[#CCF301]/50",
            isSecond && "bg-[#C0C0C0]/40",
            isThird && "bg-[#CD7F32]/40",
          )}
        />

        <div
          className={cn(
            "absolute -inset-1 sm:-inset-2 rounded-full blur-lg transition-all duration-500",
            isFirst && "bg-gradient-to-r from-[#FFD700] via-[#CCF301] to-[#FFD700] opacity-60",
            isSecond && "bg-gradient-to-r from-[#F5F5F5] to-[#C0C0C0] opacity-50",
            isThird && "bg-gradient-to-r from-[#CD7F32] to-[#B87333] opacity-50",
          )}
        />

        <div
          className={cn(
            "absolute -inset-0.5 sm:-inset-1 rounded-full p-0.5 transition-all duration-500",
            isFirst && "bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] shadow-xl shadow-[#FFD700]/50",
            isSecond && "bg-gradient-to-br from-[#F5F5F5] via-[#C0C0C0] to-[#A8A8A8] shadow-lg shadow-[#C0C0C0]/40",
            isThird && "bg-gradient-to-br from-[#CD7F32] via-[#B87333] to-[#8B4513] shadow-lg shadow-[#CD7F32]/40",
          )}
        >
          <div className="h-full w-full rounded-full bg-black" />
        </div>

        <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-2 sm:border-3 border-black shadow-xl">
          <Image
            src={player.avatar}
            alt={player.username}
            fill
            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>

        <div
          className={cn(
            "absolute -bottom-1.5 sm:-bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border-2 sm:border-3 border-black font-bold shadow-lg transition-all duration-500",
            isFirst &&
              "h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-xs sm:text-sm md:text-base bg-gradient-to-br from-[#FFD700] to-[#FF8C00] text-black shadow-[#FFD700]/60",
            isSecond &&
              "h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-xs sm:text-sm bg-gradient-to-br from-[#F5F5F5] to-[#A8A8A8] text-black shadow-[#C0C0C0]/50",
            isThird &&
              "h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7 text-xs bg-gradient-to-br from-[#CD7F32] to-[#8B4513] text-white shadow-[#CD7F32]/50",
          )}
        >
          {player.rank}
        </div>
      </div>

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-t-xl sm:rounded-t-2xl border-x-2 border-t-2 backdrop-blur-sm transition-all duration-500 hover:scale-105",
          podiumHeight,
          isFirst &&
            "border-[#CCF301] bg-gradient-to-b from-[#CCF301]/30 via-slate-900/95 to-slate-900 shadow-[0_0_40px_rgba(204,243,1,0.3)]",
          isSecond &&
            "border-[#C0C0C0]/60 bg-gradient-to-b from-[#C0C0C0]/20 via-slate-900/90 to-slate-900 shadow-[0_0_30px_rgba(192,192,192,0.2)]",
          isThird &&
            "border-[#CD7F32]/60 bg-gradient-to-b from-[#CD7F32]/20 via-slate-900/90 to-slate-900 shadow-[0_0_30px_rgba(205,127,50,0.2)]",
        )}
      >
        <div
          className={cn(
            "absolute top-0 h-full w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent",
            isFirst && "via-[#CCF301]/30",
          )}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="w-full text-center">
            <div
              className={cn(
                "mb-1 truncate font-bold leading-tight text-xs sm:text-sm md:text-base",
                isFirst ? "text-[#CCF301] drop-shadow-lg" : "text-white/90",
              )}
            >
              {player.username}
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Star
                className={cn(
                  "transition-all duration-500",
                  isFirst ? "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#CCF301]" : "h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#CCF301]/70",
                )}
              />
              <span
                className={cn(
                  "font-bold tabular-nums transition-all duration-500",
                  isFirst ? "text-sm sm:text-base md:text-lg lg:text-xl text-white drop-shadow-lg" : "text-xs sm:text-sm md:text-base lg:text-lg text-white/90",
                )}
              >
                {player.stars.toLocaleString()}
              </span>
            </div>
            <div
              className={cn(
                "mt-0.5 sm:mt-1 text-center text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest",
                isFirst ? "text-[#CCF301]" : "text-gray-400",
              )}
            >
              Stars
            </div>
          </div>

          <div
            className={cn(
              "mt-1 sm:mt-2 grid w-full grid-cols-2 gap-1 sm:gap-1.5 rounded-lg p-1.5 sm:p-2 backdrop-blur-sm",
              isFirst ? "bg-[#CCF301]/10 border border-[#CCF301]/30" : "bg-black/60",
            )}
          >
            <div className="text-center">
              <div className={cn("text-xs sm:text-sm font-bold", isFirst ? "text-white" : "text-white/80")}>
                {player.problems}
              </div>
              <div className="text-[8px] sm:text-[9px] font-medium uppercase tracking-wide text-gray-400">Solved</div>
            </div>
            <div className="text-center">
              <div
                className={cn("text-xs sm:text-sm font-bold truncate", isFirst ? "text-[#CCF301]" : "text-white/80")}
              >
                {player.level.split(' ')[0]}
              </div>
              <div className="text-[8px] sm:text-[9px] font-medium uppercase tracking-wide text-gray-400">Level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TableRow({
  player,
  isTopThree = false,
  isDarkMode,
  primaryColor
}: {
  player: Player
  isTopThree?: boolean
  isDarkMode: boolean
  primaryColor: string
}) {
  return (
    <>
      {/* Desktop Row */}
      <div
        className={cn(
          "hidden sm:grid grid-cols-6 gap-2 sm:gap-4 border-b px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm transition-colors",
          isDarkMode 
            ? `border-white/5 hover:bg-white/5 ${isTopThree && 'bg-[#CCF301]/5'}` 
            : `border-gray-200/50 hover:bg-gray-100/50 ${isTopThree && 'bg-[#0b131c]/5'}`,
        )}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isTopThree && getRankIcon(player.rank)}
          <span className={cn("font-semibold")} style={{ color: isTopThree ? primaryColor : (isDarkMode ? '#9ca3af' : '#6b7280') }}>
            #{player.rank.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className={cn(
              "h-6 w-6 sm:h-8 sm:w-8 overflow-hidden rounded-full border relative flex-shrink-0",
              isTopThree 
                ? (isDarkMode ? "border-[#CCF301]/50" : "border-[#0b131c]/50")
                : (isDarkMode ? "border-white/10" : "border-gray-300/50"),
            )}
          >
            <Image
              src={player.avatar}
              alt={player.username}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className={cn("truncate", isTopThree && "font-semibold")} 
            style={{ color: isTopThree ? primaryColor : (isDarkMode ? '#e5e7eb' : '#374151') }}>
            {player.username}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span
            className={cn(
              "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg truncate max-w-full",
              isTopThree 
                ? (isDarkMode 
                    ? "bg-[#CCF301]/10 border border-[#CCF301]/20" 
                    : "bg-[#0b131c]/10 border border-[#0b131c]/20")
                : ""
            )}
            style={{ color: isTopThree ? primaryColor : (isDarkMode ? '#9ca3af' : '#6b7280') }}
          >
            {player.level}
          </span>
        </div>
        <div className="flex items-center justify-end">
          <span className={cn("font-bold")} style={{ color: isTopThree ? primaryColor : (isDarkMode ? '#d1d5db' : '#4b5563') }}>
            {player.stars.toLocaleString()}
          </span>
        </div>
        <div className={`flex items-center justify-end ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {player.problems}
        </div>
        <div className="flex items-center justify-center">
          <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center text-xs sm:text-sm`}>
            {player.country}
          </div>
        </div>
      </div>

      {/* Mobile Row */}
      <div
        className={cn(
          "sm:hidden grid grid-cols-4 gap-2 border-b px-3 py-3 text-xs transition-colors",
          isDarkMode 
            ? `border-white/5 hover:bg-white/5 ${isTopThree && 'bg-[#CCF301]/5'}` 
            : `border-gray-200/50 hover:bg-gray-100/50 ${isTopThree && 'bg-[#0b131c]/5'}`,
        )}
      >
        <div className="flex items-center gap-1">
          {isTopThree && getRankIcon(player.rank)}
          <span className={cn("font-semibold")} style={{ color: isTopThree ? primaryColor : (isDarkMode ? '#9ca3af' : '#6b7280') }}>
            #{player.rank}
          </span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              "h-6 w-6 overflow-hidden rounded-full border relative flex-shrink-0",
              isTopThree 
                ? (isDarkMode ? "border-[#CCF301]/50" : "border-[#0b131c]/50")
                : (isDarkMode ? "border-white/10" : "border-gray-300/50"),
            )}
          >
            <Image
              src={player.avatar}
              alt={player.username}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className={cn("truncate text-xs", isTopThree && "font-semibold")} 
            style={{ color: isTopThree ? primaryColor : (isDarkMode ? '#e5e7eb' : '#374151') }}>
            {player.username}
          </span>
        </div>
        <div className="flex items-center justify-end">
          <span className={cn("font-bold")} style={{ color: isTopThree ? primaryColor : (isDarkMode ? '#d1d5db' : '#4b5563') }}>
            {player.stars > 1000 ? `${(player.stars / 1000).toFixed(1)}k` : player.stars.toLocaleString()}
          </span>
        </div>
        <div className={`flex items-center justify-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {player.problems}
        </div>
      </div>
    </> 
  )
}

export { ModernCodeCompassLeaderboard as Leaderboard }