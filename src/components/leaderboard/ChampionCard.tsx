import React from 'react';
import Image from 'next/image';
import { Crown, Zap, Star, TrendingUp } from 'lucide-react';

interface ChampionUser {
  rank: number;
  name: string;
  title: string;
  stars: number;
  problems: number;
  country: string;
  image: string;
  quote: string;
  joinedDate?: string;
  location?: string;
  streak?: number;
  lastActive?: string;
}

interface ChampionCardProps {
  user: ChampionUser;
  isDarkMode: boolean;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ user, isDarkMode }) => {
  return (
    <div className="mb-6 sm:mb-8 lg:mb-10">
      <div
        className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 cursor-pointer group overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-black/40 border-[#CCF301]/30 hover:border-[#CCF301]/60 shadow-xl shadow-black/20'
            : 'bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70 border-[#CCF301]/40 hover:border-[#CCF301]/70 shadow-2xl shadow-gray-300/50'
        } backdrop-blur-xl hover:shadow-[0_0_40px_rgba(204,243,1,0.3)] hover:scale-[1.01]`}
      >
        {/* Animated Background Effects */}
        <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDarkMode 
            ? 'from-[#CCF301]/5 via-transparent to-[#CCF301]/5'
            : 'from-[#CCF301]/10 via-transparent to-[#CCF301]/10'
        }`}></div>
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#CCF301]/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#CCF301]/5 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>

        <div className="relative flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
          {/* Champion Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 transition-all duration-500 ${
                isDarkMode
                  ? 'border-[#CCF301]/40 shadow-[0_0_30px_rgba(204,243,1,0.3)]'
                  : 'border-[#CCF301]/60 shadow-[0_0_30px_rgba(204,243,1,0.4)]'
              } group-hover:border-[#CCF301] group-hover:shadow-[0_0_40px_rgba(204,243,1,0.5)] group-hover:scale-110`}
            >
              <Image
                src={user.image}
                alt={user.name}
                fill
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>

            {/* Rank Badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-lg transform group-hover:scale-110 transition-all duration-300">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
              #{user.rank}
            </div>

            {/* Floating Animation Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#CCF301]/30 animate-ping opacity-20"></div>
          </div>

          {/* Champion Info */}
          <div className="flex-1 text-center lg:text-left space-y-3 sm:space-y-4">
            {/* Title Section */}
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#CCF301]/20 to-[#CCF301]/10 border border-[#CCF301]/30">
                <Star className="w-4 h-4 text-[#CCF301] animate-pulse" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[#CCF301] tracking-wide">
                  Champion
                </h2>
              </div>
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-bounce" />
            </div>

            {/* Name & Title */}
            <div>
              <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {user.name}
              </h3>
              <p className={`text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {user.title}
              </p>
            </div>

            {/* Quote */}
            <p
              className={`text-xs sm:text-sm lg:text-base italic leading-relaxed max-w-3xl transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              &ldquo;{user.quote}&rdquo;
            </p>

            {/* Stats Grid */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
              <div
                className={`group/stat flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-slate-800/90 border-slate-600/50 hover:border-[#CCF301]/50 hover:bg-slate-800'
                    : 'bg-white/90 border-gray-300/50 hover:border-[#CCF301]/50 hover:bg-white'
                } backdrop-blur-sm shadow-lg`}
              >
                <Star className={`w-4 h-4 ${isDarkMode ? 'text-[#CCF301]' : 'text-[#CCF301]'} group-hover/stat:animate-spin`} />
                <div>
                  <span className="font-bold text-[#CCF301] text-base sm:text-lg">
                    {user.stars.toLocaleString()}
                  </span>
                  <span className={`ml-1.5 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    stars
                  </span>
                </div>
              </div>

              <div
                className={`group/stat flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-slate-800/90 border-slate-600/50 hover:border-[#CCF301]/50 hover:bg-slate-800'
                    : 'bg-white/90 border-gray-300/50 hover:border-[#CCF301]/50 hover:bg-white'
                } backdrop-blur-sm shadow-lg`}
              >
                <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-[#CCF301]' : 'text-[#CCF301]'} group-hover/stat:animate-bounce`} />
                <div>
                  <span className="font-bold text-[#CCF301] text-base sm:text-lg">
                    {user.problems}
                  </span>
                  <span className={`ml-1.5 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    solved
                  </span>
                </div>
              </div>

              {user.streak && (
                <div
                  className={`group/stat flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-slate-800/90 border-slate-600/50 hover:border-[#CCF301]/50 hover:bg-slate-800'
                      : 'bg-white/90 border-gray-300/50 hover:border-[#CCF301]/50 hover:bg-white'
                  } backdrop-blur-sm shadow-lg`}
                >
                  <Zap className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'} group-hover/stat:animate-pulse`} />
                  <div>
                    <span className={`font-bold text-base sm:text-lg ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>
                      {user.streak}
                    </span>
                    <span className={`ml-1.5 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      day streak
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;