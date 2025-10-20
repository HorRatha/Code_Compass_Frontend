// import React from "react";
// import Image from "next/image";
// import { User, Coins, Star, Badge } from "lucide-react";
// import { motion } from "framer-motion";

// interface UserData {
//   username?: string | null;
//   email?: string | null;
//   imageUrl?: string | null;
//   level?: string | null;
//   rank?: number | null;
//   coin?: number | null;
//   star?: number | null;
//   badge?: number | null;
//   totalProblemsSolved?: number | null;
//   isAdmin?: boolean | null;
//   isCreator?: boolean | null;
// }

// interface UserStatsProps {
//   userData: UserData | undefined;
//   onProfileClick: () => void;
// }

// export const UserStats: React.FC<UserStatsProps> = ({ userData, onProfileClick }) => {
//   return (
//     <div className="flex items-center space-x-4">
//       <div className="flex items-center space-x-3">
//         <div className="flex items-center space-x-1 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
//           <Coins className="h-4 w-4 text-yellow-500" />
//           <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
//             {userData?.coin || 0}
//           </span>
//         </div>

//         <div className="flex items-center space-x-1 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
//           <Star className="h-4 w-4 text-blue-500" />
//           <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
//             {userData?.star || 0}
//           </span>
//         </div>

//         {(userData?.badge ?? 0) > 0 && (
//           <div className="flex items-center space-x-1 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
//             <Badge className="h-4 w-4 text-purple-500" />
//             <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
//               {userData?.badge}
//             </span>
//           </div>
//         )}
//       </div>

//       <motion.button
//         onClick={onProfileClick}
//         className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group relative"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <div className="relative">
//           <div className="w-8 h-8 bg-gradient-to-br from-[#CCF301] to-emerald-400 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden">
//             {userData?.imageUrl ? (
//               <Image
//                 src={userData.imageUrl}
//                 alt="Profile"
//                 width={32}
//                 height={32}
//                 className="rounded-full object-cover w-full h-full"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.style.display = 'none';
//                 }}
//               />
//             ) : (
//               <User className="h-4 w-4 text-gray-900" />
//             )}
//           </div>
//           <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-900"></div>
//         </div>
//       </motion.button>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User, Coins, Star, Badge } from "lucide-react";
import { motion } from "framer-motion";

interface UserData {
  username?: string | null;
  email?: string | null;
  image_url?: string | null;  // Changed from imageUrl to match API
  level?: string | null;
  rank?: number | null;
  coin?: number | null;
  star?: number | null;
  badge?: number | null;
  total_problem_solved?: number | null;  // Changed to match API
  isAdmin?: boolean | null;
  isCreator?: boolean | null;
}

interface UserStatsProps {
  userData: UserData | undefined;
  onProfileClick: () => void;
}

export const UserStats: React.FC<UserStatsProps> = ({ userData, onProfileClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image error state when userData changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [userData?.image_url]);

  const hasValidImage = userData?.image_url && !imageError;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        {/* Coins Display */}
        <div className="flex items-center space-x-1 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
            {userData?.coin || 0}
          </span>
        </div>

        {/* Stars Display */}
        <div className="flex items-center space-x-1 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
          <Star className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {userData?.star || 0}
          </span>
        </div>

        {/* Badges Display - Only show if user has badges */}
        {(userData?.badge ?? 0) > 0 && (
          <div className="flex items-center space-x-1 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
            <Badge className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {userData?.badge}
            </span>
          </div>
        )}
      </div>

      {/* Profile Button */}
      <motion.button
        onClick={onProfileClick}
        className="flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="w-9 h-9 bg-gradient-to-br from-[#CCF301] to-emerald-400 rounded-full flex items-center justify-center border-2 border-white/30 overflow-hidden shadow-lg">
            {hasValidImage && userData.image_url ? (
              <>
                <Image
                  src={userData.image_url}
                  alt={userData.username || "User profile"}
                  width={32}
                  height={32}
                  className={`rounded-full object-cover w-full h-full transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    console.error('Failed to load profile image:', userData.image_url);
                    setImageError(true);
                  }}
                  priority
                />
                {/* Fallback icon while image loads */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-900" />
                  </div>
                )}
              </>
            ) : (
              <User className="h-4 w-4 text-gray-900" />
            )}
          </div>
          {/* Online Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-md"></div>
        </div>

        {/* Optional: Username tooltip on hover */}
        {userData?.username && (
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {userData.username}
          </div>
        )}
      </motion.button>
    </div>
  );
};