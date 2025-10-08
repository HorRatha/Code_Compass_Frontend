import React from 'react';
import Image from 'next/image';
import { Trophy, Code, Flame, Star, ChevronLeft, ChevronRight, User, X, Zap } from 'lucide-react';

interface ProgrammingLanguage {
  name: string;
  problems: number;
  color: string;
}

interface SidebarProfileProps {
  isDarkMode: boolean;
  userName: string;
  userTitle: string;
  userAvatar: string;
  userRank?: number;
  userStars?: number;
  userProblems?: number;
  userLevel?: string;
  userCoin?: number;
  userEmail?: string;
  programmingLanguages: ProgrammingLanguage[];
  isDesktopVisible: boolean;
  onToggleDesktop: () => void;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({
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
}) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Get achievement badges based on user's rank
  const getAchievementBadges = (rank?: number) => {
    const badges = [];
    
    if (rank && rank <= 10) {
      badges.push({
        name: "Top 10 Coders",
        icon: Trophy,
        color: "yellow"
      });
    }
    
    if (rank && rank <= 50) {
      badges.push({
        name: "Top 50 Holders", 
        icon: Star,
        color: "blue"
      });
    }
    
    if (rank && rank <= 100) {
      badges.push({
        name: "Top 100 Active",
        icon: Flame,
        color: "red"
      });
    }

    // Default badge if no others apply
    if (badges.length === 0) {
      badges.push({
        name: "Rising Coder",
        icon: Zap,
        color: "purple"
      });
    }

    return badges;
  };

  const achievementBadges = getAchievementBadges(userRank);

  const sidebarContent = (
    <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
      {/* Profile Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-6">
          <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-3 transition-all duration-300 flex-shrink-0 ${
            isDarkMode 
              ? 'border-[#CCF301]/30 shadow-lg shadow-[#CCF301]/10' 
              : 'border-[#CCF301]/50 shadow-lg shadow-[#CCF301]/20'
          }`}>
            <Image
              src={userAvatar}
              alt={userName}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="min-w-0 flex-1">
            <h2 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 truncate ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {userName}
            </h2>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {userTitle}
            </p>
            {userRank && (
              <p className={`text-xs mt-1 font-semibold ${isDarkMode ? 'text-[#CCF301]' : 'text-[#CCF301]'}`}>
                Rank: #{userRank}
              </p>
            )}
          </div>
        </div>

        {/* Stats Quick View */}
        {(userStars !== undefined || userProblems !== undefined) && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {userStars !== undefined && (
              <div className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50' 
                  : 'bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-300/50'
              } backdrop-blur-sm`}>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-[#CCF301]" />
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Stars
                  </span>
                </div>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userStars.toLocaleString()}
                </p>
              </div>
            )}
            {userProblems !== undefined && (
              <div className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50' 
                  : 'bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-300/50'
              } backdrop-blur-sm`}>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-[#CCF301]" />
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Solved
                  </span>
                </div>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProblems}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Achievement Badges */}
        <div className="grid grid-cols-1 gap-3 mb-6 sm:mb-8">
          {achievementBadges.map((badge) => {
            const IconComponent = badge.icon;
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
            };

            return (
              <div
                key={badge.name}
                className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  colorClasses[badge.color as keyof typeof colorClasses]
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-sm">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Programming Languages */}
      <div className="mb-6 sm:mb-8">
        <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <Code className="w-5 h-5 text-[#CCF301]" />
          Programming Languages
        </h3>
        
        <div className="space-y-3 sm:space-y-4">
          {programmingLanguages.map((lang) => (
            <div key={lang.name} className={`flex justify-between items-center p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-800' 
                : 'bg-gray-100/80 border-gray-300/50 hover:bg-white'
            } backdrop-blur-sm`}>
              <span className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {lang.name}
              </span>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm sm:text-base ${
                  lang.name === "JavaScript"
                    ? isDarkMode ? "text-yellow-300" : "text-yellow-600"
                    : lang.name === "Python"
                      ? (isDarkMode ? "text-blue-300" : "text-blue-600")
                      : lang.name === "C"
                        ? isDarkMode ? "text-gray-200" : "text-gray-600"
                        : isDarkMode ? "text-red-300" : "text-red-600"
                }`}>{lang.problems}</span>
                <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  problems
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile/Tablet Profile Button - Visible only on small screens */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-lg border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-900/95 border-white/20 text-white hover:bg-slate-800/95 shadow-black/20' 
            : 'bg-white/95 border-black/20 text-gray-900 hover:bg-gray-50/95 shadow-black/10'
        } backdrop-blur-sm hover:scale-110`}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </button>

      {/* Mobile/Tablet Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile/Tablet Sidebar - Positioned below navbar */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 h-[calc(100vh-80px)] mt-20 z-40 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDarkMode 
            ? 'bg-gradient-to-b from-slate-900/98 to-black/98 border-b border-white/10' 
            : 'bg-gradient-to-b from-white/98 to-gray-50/98 border-b border-black/10'
        } backdrop-blur-xl shadow-2xl overflow-y-auto`}
      >
        {sidebarContent}
      </div>

      {/* Desktop Toggle Button - Fixed position when sidebar is hidden */}
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

      {/* Desktop Sidebar Container */}
      {isDesktopVisible && (
        <div className={`
          hidden lg:block
          h-full
          w-80 xl:w-96
          border-r overflow-hidden
          ${isDarkMode 
            ? 'border-white/10 bg-gradient-to-b from-slate-900/98 to-black/98' 
            : 'border-black/10 bg-gradient-to-b from-white/98 to-gray-50/98'
          } backdrop-blur-xl shadow-2xl
        `}>
          
          {/* Desktop Close Button */}
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
  );
};

export default SidebarProfile;