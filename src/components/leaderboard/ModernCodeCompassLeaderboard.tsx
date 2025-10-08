"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Crown, Medal, Award, Trophy } from "lucide-react"
import { useGetLeaderboardQuery } from "@/lib/services/leaderboard/leaderboardApi"
import { useGetUserProfileQuery } from "@/lib/services/leaderboard/userProfileApi"
import ChampionCard from "./ChampionCard"
import SidebarProfile from "./SidebarProfile"

interface ProgrammingLanguage {
  name: string
  problems: number
  color: string
}

export default function ModernCodeCompassLeaderboard() {
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Use both APIs
  const { data: leaderboardResponse, isLoading: leaderboardLoading, error: leaderboardError } = useGetLeaderboardQuery()
  const { data: userProfile, isLoading: profileLoading, error: profileError } = useGetUserProfileQuery()

  useEffect(() => {
    // Check if dark mode is already set by navbar
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
 
    checkDarkMode()
 
    // Watch for theme changes from navbar
    const observer = new MutationObserver(() => {
      checkDarkMode()
    })
 
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Transform leaderboard data
  const leaderboardData = leaderboardResponse?.top_subscribers?.map(subscriber => ({
    rank: subscriber.rank,
    name: subscriber.username,
    stars: subscriber.stars,
    problems: subscriber.total_problem_solved,
    country: subscriber.location || "🇰🇭",
    image: subscriber.profile_image || "/image/default-avatar.jpg",
    level: subscriber.level
  })) || []

  // Champion is the #1 ranked user from leaderboard
  const championUser = leaderboardData.length > 0 ? {
    rank: leaderboardData[0].rank,
    name: leaderboardData[0].name,
    title: getTitleFromLevel(leaderboardData[0].level),
    stars: leaderboardData[0].stars,
    problems: leaderboardData[0].problems,
    country: leaderboardData[0].country,
    image: leaderboardData[0].image,
    quote: "A great coder isn't born at the top — they climb there, one bug, one breakthrough, and one bold challenge at a time.",
    joinedDate: "2024",
    location: "Cambodia",
    streak: 7,
    lastActive: "today"
  } : {
    rank: 1,
    name: "Top Coder",
    title: "Code Master",
    stars: 3125,
    problems: 178,
    country: "🇰🇭",
    image: "/image/default-avatar.jpg",
    quote: "A great coder isn't born at the top — they climb there, one bug, one breakthrough, and one bold challenge at a time.",
    joinedDate: "2024",
    location: "Cambodia",
    streak: 7,
    lastActive: "today"
  }

  // Current user data from user profile API
  const currentUser = userProfile ? {
    rank: userProfile.rank,
    name: userProfile.username,
    title: getTitleFromLevel(userProfile.level),
    stars: userProfile.star,
    problems: userProfile.totalProblemsSolved,
    country: userProfile.location || "🇰🇭",
    image: userProfile.imageUrl || "/image/default-avatar.jpg",
    level: userProfile.level,
    coin: userProfile.coin,
    email: userProfile.email
  } : {
    rank: 2,
    name: "xeinnkh",
    title: "Code Newborn",
    stars: 0,
    problems: 0,
    country: "🇰🇭",
    image: "/image/default-avatar.jpg",
    level: "CODE_NEWBORN",
    coin: 10000,
    email: "horratha4t5@gmail.com"
  }

  const programmingLanguages: ProgrammingLanguage[] = [
    { name: "JavaScript", problems: 440, color: "text-yellow-500" },
    { name: "Python", problems: 324, color: "text-blue-500" },
    { name: "C", problems: 255, color: "text-gray-600" },
    { name: "Java", problems: 192, color: "text-red-500" },
  ]

  // Helper function
  function getTitleFromLevel(level: string | null): string {
    if (!level) return "Code Enthusiast"
    
    const levelTitles: { [key: string]: string } = {
      "CODE_NEWBORN": "Code Newborn",
      "CODE_APPRENTICE": "Code Apprentice",
      "CODE_JOURNEYMAN": "Code Journeyman",
      "CODE_EXPERT": "Code Expert",
      "CODE_MASTER": "Code Master",
      "CODE_LEGEND": "Code Legend"
    }
    
    return levelTitles[level] || "Code Enthusiast"
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <Trophy className="w-4 h-4 text-gray-500" />
    }
  }

  const isLoading = leaderboardLoading || profileLoading
  const error = leaderboardError || profileError

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black flex items-center justify-center transition-colors duration-500">
        <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading leaderboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black flex items-center justify-center transition-colors duration-500">
        <div className="text-red-400 text-xl">Error loading data</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 font-['Barlow',sans-serif] bg-gradient-to-br ${
      isDarkMode
        ? "from-black via-slate-900 to-black"
        : "from-gray-50 via-white to-gray-100"
    }`}>
      <div className="flex min-h-screen">
        {/* Sidebar - Shows YOUR actual profile from userProfile API */}
        <SidebarProfile
          isDarkMode={isDarkMode}
          userName={currentUser.name}
          userTitle={currentUser.title}
          userAvatar={currentUser.image}
          userRank={currentUser.rank}
          userStars={currentUser.stars}
          userProblems={currentUser.problems}
          userLevel={currentUser.level}
          userCoin={currentUser.coin}
          userEmail={currentUser.email}
          programmingLanguages={programmingLanguages}
          isDesktopVisible={isDesktopSidebarVisible}
          onToggleDesktop={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isDesktopSidebarVisible ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <span className="text-[#CCF301]">CodeCompass</span> LeaderBoard
              </h1>
              <p className={`text-base sm:text-lg lg:text-xl transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Compete, Code, Conquer
              </p>
            </div>

            {/* Champion Card - Shows #1 ranked user from leaderboard */}
            <ChampionCard 
              user={championUser} 
              isDarkMode={isDarkMode} 
            />

            {/* Desktop Table */}
            <div className="hidden lg:block mb-6">
              <div
                className={`rounded-xl sm:rounded-2xl border overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-slate-900/40 border-white/10 shadow-black/20" 
                    : "bg-white/70 border-gray-200/50 shadow-gray-300/30"
                }`}
              >
                <div className={`overflow-x-auto ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <table className="w-full">
                    <thead>
                      <tr
                        className={`border-b transition-colors duration-300 ${
                          isDarkMode 
                            ? "border-white/10 bg-white/5" 
                            : "border-gray-200/50 bg-gray-50/80"
                        }`}
                      >
                        <th className="text-left p-4 font-bold text-[#CCF301] text-sm">Rank</th>
                        <th className="text-left p-4 font-bold text-[#CCF301] text-sm">Coder</th>
                        <th className="text-right p-4 font-bold text-[#CCF301] text-sm">Stars</th>
                        <th className="text-right p-4 font-bold text-[#CCF301] text-sm">Problems Solved</th>
                        <th className="text-center p-4 font-bold text-[#CCF301] text-sm">Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((user, index) => (
                        <tr
                          key={`${user.rank}-${user.name}-${index}`}
                          className={`border-b transition-all duration-300 cursor-pointer group ${
                            isDarkMode 
                              ? "border-white/5 hover:bg-white/5" 
                              : "border-gray-200/30 hover:bg-gray-50/50"
                          }`}
                          style={{
                            animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`,
                            opacity: 0
                          }}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getRankIcon(user.rank)}
                              <span className="text-base font-bold text-[#CCF301]">
                                #{user.rank.toString().padStart(2, "0")}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#CCF301]/20 group-hover:ring-[#CCF301]/40 transition-all duration-300 relative">
                                <Image
                                  src={user.image}
                                  alt={user.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <span className={`font-semibold text-sm group-hover:text-[#CCF301] transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-200' : 'text-gray-800'
                              }`}>
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-base font-bold text-[#CCF301]">{user.stars.toLocaleString()}</span>
                          </td>
                          <td className="p-4 text-right">
                            <span className={`font-semibold text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              {user.problems}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-8 h-8 mx-auto bg-gradient-to-br from-blue-600 to-red-600 rounded-xl flex items-center justify-center text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {user.country}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3 sm:space-y-4 mb-6">
              {leaderboardData.map((user, index) => (
                <div
                  key={`${user.rank}-${user.name}-${index}-mobile`}
                  className={`p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer group backdrop-blur-xl shadow-lg ${
                    isDarkMode
                      ? "bg-slate-900/40 border-white/10 hover:bg-slate-800/60 shadow-black/20"
                      : "bg-white/70 border-gray-200/50 hover:bg-white/90 shadow-gray-300/30"
                  }`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`,
                    opacity: 0
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                        <span className="text-xl font-bold text-[#CCF301]">#{user.rank.toString().padStart(2, "0")}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#CCF301]/20 group-hover:ring-[#CCF301]/40 transition-all duration-300 relative flex-shrink-0">
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <span
                          className={`font-semibold text-sm group-hover:text-[#CCF301] transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.name}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center text-sm transition-transform duration-300 group-hover:scale-110 shadow-lg">
                      {user.country}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`text-center p-3 rounded-lg ${
                      isDarkMode ? 'bg-slate-800/60' : 'bg-gray-100/80'
                    }`}>
                      <div className="text-xl font-bold text-[#CCF301]">{user.stars.toLocaleString()}</div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Stars</div>
                    </div>
                    <div className={`text-center p-3 rounded-lg ${
                      isDarkMode ? 'bg-slate-800/60' : 'bg-gray-100/80'
                    }`}>
                      <div className={`text-xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {user.problems}
                      </div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Problems</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <button
                className={`px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-300 hover:scale-105 shadow-lg ${
                  isDarkMode
                    ? "border-[#CCF301] text-[#CCF301] hover:bg-[#CCF301] hover:text-black hover:shadow-[#CCF301]/30"
                    : "border-[#CCF301] text-[#CCF301] hover:bg-[#CCF301] hover:text-black hover:shadow-[#CCF301]/40"
                } backdrop-blur-xl`}
              >
                View More Coders
              </button>
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
      `}</style>
    </div>
  )
}