"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Home,
  Puzzle,
  Trophy,
  ChevronDown,
  Users,
  Mail,
  Shield,
  FileText,
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
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import AuthButtons from "../AuthComponents/AuthButton";
import { useGetUserProfileQuery } from "@/lib/services/leaderboard/userProfileApi";

// Define types for user data - matching UserProfile from API
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

// Uiverse Toggle Component
const UiverseToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="uiverse-toggle">
      <div className="toggle-switch">
        <label className="switch-label">
          <input
            type="checkbox"
            className="checkbox"
            checked={isDark}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      <style jsx>{`
        .uiverse-toggle .toggle-switch {
          position: relative;
          width: 50px;
          height: 25px;
          --light: #d8dbe0;
          --dark: #28292c;
          --link: rgb(27, 129, 112);
          --link-hover: rgb(24, 94, 82);
        }

        .uiverse-toggle .switch-label {
          position: absolute;
          width: 100%;
          height: 25px;
          background-color: var(--dark);
          border-radius: 12.5px;
          cursor: pointer;
          border: 1.5px solid var(--dark);
          transition: all 0.3s ease;
        }

        .uiverse-toggle .switch-label:hover {
          transform: scale(1.05);
        }

        .uiverse-toggle .checkbox {
          position: absolute;
          display: none;
        }

        .uiverse-toggle .slider {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12.5px;
          -webkit-transition: 0.3s;
          transition: 0.3s;
        }

        .uiverse-toggle .checkbox:checked ~ .slider {
          background-color: var(--light);
        }

        .uiverse-toggle .slider::before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          width: 12.5px;
          height: 12.5px;
          border-radius: 50%;
          -webkit-box-shadow: inset 6px -2px 0px 0px var(--light);
          box-shadow: inset 6px -2px 0px 0px var(--light);
          background-color: var(--dark);
          -webkit-transition: 0.3s;
          transition: 0.3s;
        }

        .uiverse-toggle .checkbox:checked ~ .slider::before {
          -webkit-transform: translateX(25px);
          -ms-transform: translateX(25px);
          transform: translateX(25px);
          background-color: var(--dark);
          -webkit-box-shadow: none;
          box-shadow: none;
        }

        .uiverse-toggle .checkbox:focus + .slider {
          box-shadow: 0 0 0 2px rgba(204, 243, 1, 0.5);
        }

        @media (prefers-color-scheme: dark) {
          .uiverse-toggle .toggle-switch {
            --light: #f1f3f4;
            --dark: #1f2937;
          }
        }

        @media (max-width: 768px) {
          .uiverse-toggle .toggle-switch {
            width: 45px;
            height: 22px;
          }
          
          .uiverse-toggle .switch-label {
            height: 22px;
            border-radius: 11px;
          }
          
          .uiverse-toggle .slider {
            border-radius: 11px;
          }
          
          .uiverse-toggle .slider::before {
            width: 11px;
            height: 11px;
            top: 4.5px;
            left: 4.5px;
            -webkit-box-shadow: inset 5px -1.5px 0px 0px var(--light);
            box-shadow: inset 5px -1.5px 0px 0px var(--light);
          }
          
          .uiverse-toggle .checkbox:checked ~ .slider::before {
            -webkit-transform: translateX(22px);
            -ms-transform: translateX(22px);
            transform: translateX(22px);
          }
        }
      `}</style>
    </div>
  );
};

// User Profile Popup Component
const UserProfilePopup = ({ userData, isOpen, onClose }: { userData: UserData | undefined; isOpen: boolean; onClose: () => void }) => {
  const isAdmin = userData?.rank === 1 || userData?.isAdmin;
  const isCreator = (userData?.badge ?? 0) >= 5 || userData?.isCreator;

  const baseProfileItems = [
    { name: "Profile", href: "/userpage", icon: UserIcon, color: "text-blue-500" },
    { name: "Creator Dashboard", href: "/creator-dashboard", icon: LayoutDashboard, color: "text-purple-500" },
  ];

  const signOutItem = [
    { name: "Sign Out", href: "/api/auth/signout", icon: LogOut, color: "text-red-500" }
  ];

  const profileItems = [
    ...baseProfileItems,
    ...signOutItem
  ];

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

// User Stats Component for Navbar
const UserStats = ({ userData, onProfileClick }: { userData: UserData | undefined; onProfileClick: () => void }) => {
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

// Mobile User Profile Section
const MobileUserProfile = ({ userData, onCloseMenu }: { userData: UserData | undefined; onCloseMenu: () => void }) => {
  const isAdmin = userData?.rank === 1 || userData?.isAdmin;
  const isCreator = (userData?.badge ?? 0) >= 5 || userData?.isCreator;

  const baseProfileItems = [
    { name: "Profile", href: "/profile", icon: UserIcon, color: "text-blue-500" },
   { name: "Creator Dashboard", href: "/creator-dashboard", icon: LayoutDashboard, color: "text-purple-500" },
  ];

  const creatorItems = isCreator 
    ? [{ name: "Creator Dashboard", href: "/creator/dashboard", icon: LayoutDashboard, color: "text-purple-500" }]
    : [];

  const adminItems = isAdmin 
    ? [{ name: "Admin Panel", href: "/admin", icon: AdminShield, color: "text-red-500" }]
    : [];

  const signOutItem = [
    { name: "Sign Out", href: "/api/auth/signout", icon: LogOut, color: "text-red-500" }
  ];

  const profileItems = [
    ...baseProfileItems,
    ...creatorItems,
    ...adminItems,
    ...signOutItem
  ];

  return (
    <motion.div
      className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 dark:bg-gray-800/5 rounded-xl mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-[#CCF301] to-emerald-400 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden">
            {userData?.imageUrl ? (
              <Image
                src={userData.imageUrl}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <User className="h-5 w-5 text-gray-900" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-900"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {userData?.username || "User"}
            </h3>
            {(userData?.badge ?? 0) > 0 && (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-1 rounded-full">
                <Badge className="h-3 w-3 text-white" />
                <span className="text-xs font-bold text-white">{userData?.badge}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            Level {userData?.level || 1} • Rank #{userData?.rank || "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 mb-4">
        <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg border border-yellow-200/50 dark:border-yellow-500/20">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Coins className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">
              {userData?.coin || 0}
            </span>
          </div>
          <p className="text-[10px] text-yellow-600/80 dark:text-yellow-400/80">Coins</p>
        </div>

        <div className="text-center p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200/50 dark:border-blue-500/20">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
              {userData?.star || 0}
            </span>
          </div>
          <p className="text-[10px] text-blue-600/80 dark:text-blue-400/80">Stars</p>
        </div>

        <div className="text-center p-2 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200/50 dark:border-green-500/20">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Zap className="h-3 w-3 text-green-600 dark:text-green-400" />
            <span className="text-xs font-bold text-green-700 dark:text-green-300">
              {userData?.totalProblemsSolved || 0}
            </span>
          </div>
          <p className="text-[10px] text-green-600/80 dark:text-green-400/80">Solved</p>
        </div>
      </div>

      <div className="flex justify-center space-x-2 px-4 mb-4">
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

      <div className="space-y-1">
        {profileItems.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + idx * 0.1 }}
          >
            <Link
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 transition-all duration-200 font-medium group relative"
              onClick={onCloseMenu}
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const LoginNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const { data: userData } = useGetUserProfileQuery();
  const isLoggedIn = !!userData;

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
  document.documentElement.classList.add("dark");
}, []);

  const mainNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Problems", href: "/problemset", icon: Puzzle },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  const moreItems = [
    { name: "Document", href: "/document", icon: FileText },
    { name: "About Us", href: "/about", icon: Users },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          animate={{
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "",
            boxShadow: isScrolled
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            borderRadius: isScrolled ? "2rem" : "0rem",
            marginTop: isScrolled ? "20px" : "0px",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
          className={`relative mx-auto ${
            isScrolled ? "w-[90%] lg:w-[60%] lg:mx-auto" : "w-full"
          }`}
        >
          <motion.div
            animate={{
              backgroundColor: isScrolled ? "rgba(17, 24, 39, 0.8)" : "",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 50,
            }}
            className="absolute inset-0 dark:block hidden rounded-2xl"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="flex items-center space-x-3 group relative"
                >
                  <div className="relative">
                    <motion.div
                      className="relative w-12 h-12 flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Image
                        src="/codecompass-2.png"
                        alt="CodeCompass Logo"
                        width={55}
                        height={55}
                        className="w-12 h-12 object-contain"
                        priority
                      />

                      <motion.div
                        className="absolute inset-0 bg-[#CCF301]/20 rounded-xl blur-md -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>

              <div className="hidden lg:flex items-center space-x-1 relative">
                {mainNavItems.map((item, id) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div key={item.name} className="relative">
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] rounded-xl transition-all duration-200 font-medium relative group z-10"
                        onMouseEnter={() => setHoveredItem(id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>

                      {hoveredItem === id && (
                        <motion.div
                          layoutId="navbar-hover"
                          className="absolute inset-0 bg-[#CCF301]/10 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}

                <div className="relative">
                  <motion.button
                    onMouseEnter={() => setIsMoreOpen(true)}
                    onMouseLeave={() => setIsMoreOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>More</span>
                    <motion.div
                      animate={{ rotate: isMoreOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                    <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                  </motion.button>

                  <AnimatePresence>
                    {isMoreOpen && (
                      <motion.div
                        onMouseEnter={() => setIsMoreOpen(true)}
                        onMouseLeave={() => setIsMoreOpen(false)}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                      >
                        <div className="p-2">
                          {moreItems.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <Link
                                  href={item.href}
                                  className="flex items-center space-x-3 px-3 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 transition-all duration-200 rounded-lg group relative"
                                >
                                  <IconComponent className="h-5 w-5" />
                                  <span className="text-sm font-medium">
                                    {item.name}
                                  </span>

                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100"
                                    transition={{ duration: 0.2 }}
                                  />
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-3">
                <UiverseToggle />
                {isLoggedIn ? (
                  <UserStats 
                    userData={userData} 
                    onProfileClick={() => setIsProfileOpen(true)} 
                  />
                ) : (
                  <AuthButtons />
                )}
              </div>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-700/30 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CCF301 transparent'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-gray-900/5 pointer-events-none"></div>

                <div className="relative px-4 py-6 space-y-1">
                  {mainNavItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium group relative"
                        >
                          <IconComponent className="h-5 w-5" />
                          <span>{item.name}</span>
                          <motion.div
                            className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.2 }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="mb-3">
                      <span className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        More
                      </span>
                    </div>
                    {moreItems.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.6 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                          >
                            <IconComponent className="h-5 w-5" />
                            <span>{item.name}</span>
                            <motion.div
                              className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.2 }}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {isLoggedIn ? (
                    <>
                      <motion.div
                        className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="flex items-center justify-between px-4 py-2 mb-4">
                          <span className="text-gray-600 dark:text-gray-300 font-medium">
                            Theme
                          </span>
                          <UiverseToggle />
                        </div>
                      </motion.div>
                      <MobileUserProfile 
                        userData={userData}
                        onCloseMenu={() => setIsMenuOpen(false)}
                      />
                    </>
                  ) : (
                    <motion.div
                      className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4 space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          Theme
                        </span>
                        <UiverseToggle />
                      </div>

                      <div className="px-4 pb-4">
                        <AuthButtons />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <UserProfilePopup 
        userData={userData}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <div className="h-16"></div>
    </>
  );
};

export default LoginNavbar;