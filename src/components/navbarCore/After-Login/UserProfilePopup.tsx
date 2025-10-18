import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  LogOut,
  Coins,
  Star,
  Zap,
  User as UserIcon,
  LayoutDashboard,
  Shield as AdminShield,
  Badge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface UserProfilePopupProps {
  userData: UserData | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfilePopup: React.FC<UserProfilePopupProps> = ({
  userData,
  isOpen,
  onClose,
}) => {
  const isAdmin = userData?.rank === 1 || userData?.isAdmin;
  const isCreator = (userData?.badge ?? 0) >= 5 || userData?.isCreator;

  const baseProfileItems = [
    { name: "Profile", href: "/userpage", icon: UserIcon, color: "text-blue-500" },
    { name: "Creator Dashboard", href: "/creator-dashboard", icon: LayoutDashboard, color: "text-purple-500" },
  ];

  const signOutItem = [
    { name: "Sign Out", href: "/api/auth/signout", icon: LogOut, color: "text-red-500" }
  ];

  const profileItems = [...baseProfileItems, ...signOutItem];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-20 right-4 lg:right-8 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#CCF301] to-emerald-400 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden">
                    {userData?.imageUrl ? (
                      <Image
                        src={userData.imageUrl}
                        alt="Profile"
                        width={56}
                        height={56}
                        className="rounded-full object-cover w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-900" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {userData?.username || "User"}
                    </h3>
                    {(userData?.badge ?? 0) > 0 && (
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-1 rounded-full">
                        <Badge className="h-3 w-3 text-white" />
                        <span className="text-xs font-bold text-white">{userData?.badge}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {userData?.email || "user@example.com"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Level {userData?.level || 1} • Rank #{userData?.rank || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl border border-yellow-200/50 dark:border-yellow-500/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
                      {userData?.coin || 0}
                    </span>
                  </div>
                  <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80">Coins</p>
                </div>

                <div className="text-center p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200/50 dark:border-blue-500/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                      {userData?.star || 0}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Stars</p>
                </div>

                <div className="text-center p-3 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-200/50 dark:border-green-500/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-bold text-green-700 dark:text-green-300">
                      {userData?.totalProblemsSolved || 0}
                    </span>
                  </div>
                  <p className="text-xs text-green-600/80 dark:text-green-400/80">Solved</p>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mt-3">
                {isAdmin && (
                  <div className="flex items-center space-x-1 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
                    <AdminShield className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-semibold text-red-600 dark:text-red-400">Admin</span>
                  </div>
                )}
                {isCreator && (
                  <div className="flex items-center space-x-1 bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20">
                    <LayoutDashboard className="h-3 w-3 text-purple-500" />
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Creator</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-2">
              {profileItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 transition-all duration-200 rounded-lg group relative"
                    onClick={onClose}
                  >
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="text-sm font-medium">{item.name}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};