import React from "react";
import Image from "next/image";
import { User, Coins, Star, Badge } from "lucide-react";
import { motion } from "framer-motion";

interface UserData {
  username?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  level?: string | null;
  rank?: number | null;
  coin?: number | null;
  star?: number | null;
  badge?: number | null;
  totalProblemsSolved?: number | null;
  isAdmin?: boolean | null;
  isCreator?: boolean | null;
}

interface UserStatsProps {
  userData: UserData | undefined;
  onProfileClick: () => void;
}

export const UserStats: React.FC<UserStatsProps> = ({ userData, onProfileClick }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
            {userData?.coin || 0}
          </span>
        </div>

        <div className="flex items-center space-x-1 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
          <Star className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {userData?.star || 0}
          </span>
        </div>

        {(userData?.badge ?? 0) > 0 && (
          <div className="flex items-center space-x-1 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
            <Badge className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {userData?.badge}
            </span>
          </div>
        )}
      </div>

      <motion.button
        onClick={onProfileClick}
        className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-br from-[#CCF301] to-emerald-400 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden">
            {userData?.imageUrl ? (
              <Image
                src={userData.imageUrl}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <User className="h-4 w-4 text-gray-900" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-900"></div>
        </div>
      </motion.button>
    </div>
  );
};