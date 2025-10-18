"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import AuthButtons from "../../AuthComponents/AuthButton";
import { useGetUserProfileQuery } from "@/lib/services/leaderboard/userProfileApi";
import { UiverseToggle } from "../../UiverseToggle";
import { UserProfilePopup } from "./UserProfilePopup";
import { UserStats } from "./UserStats";
import { MobileUserProfile } from "./MobileUserProfile";

// Inline CSS styles as a style tag
const NavbarStyles = () => (
  <style jsx global>{`
    .nav-link-glow {
      position: relative;
      transition: transform 0.15s ease-out, color 0.15s ease-out, background-color 0.15s ease-out, box-shadow 0.15s ease-out;
      overflow: hidden;
    }

    .nav-link-glow:hover,
    .nav-link-glow:focus {
      transform: translateY(-3px);
    }

    .nav-link-glow::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 0;
      height: 3px;
      transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                  left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                  box-shadow 0.3s ease, 
                  background-color 0.3s ease;
      border-radius: 9999px;
    }

    .nav-link-glow:hover::after,
    .nav-link-glow:focus::after {
      width: 90%;
      left: 5%;
    }

    /* Light Mode */
    .nav-link-glow:hover,
    .nav-link-glow:focus {
      color: #0b131c !important;
      background-color: rgba(11, 19, 28, 0.05);
      text-shadow: none;
      box-shadow: 0 0 5px rgba(11, 19, 28, 0.15);
    }

    .nav-link-glow:hover::after,
    .nav-link-glow:focus::after {
      background-color: #0b131c;
      box-shadow: 0 0 8px rgba(11, 19, 28, 0.5), 
                  0 0 15px rgba(11, 19, 28, 0.3);
    }

    /* Dark Mode */
    .dark .nav-link-glow:hover,
    .dark .nav-link-glow:focus {
      color: #CCF301 !important;
      background-color: rgba(204, 243, 1, 0.1);
      text-shadow: 0 0 3px rgba(204, 243, 1, 0.6);
      box-shadow: 0 0 8px rgba(204, 243, 1, 0.3);
    }

    .dark .nav-link-glow:hover::after,
    .dark .nav-link-glow:focus::after {
      background-color: #CCF301;
      box-shadow: 0 0 8px #CCF301, 
                  0 0 15px rgba(204, 243, 1, 0.5);
    }
  `}</style>
);

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
      <NavbarStyles />
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
              {/* Logo Section with Theme-Aware Logo Switching */}
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
                      // whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {/* Light Mode Logo */}
                      <Image
                        src="/CodeCompassLM.png"
                        alt="CodeCompass Logo"
                        width={55}
                        height={55}
                        className="w-12 h-12 object-contain dark:hidden"
                        priority
                      />

                      {/* Dark Mode Logo */}
                      <Image
                        src="/codecompass-2.png"
                        alt="CodeCompass Logo"
                        width={55}
                        height={55}
                        className="w-12 h-12 object-contain hidden dark:block"
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

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1 relative">
                {mainNavItems.map((item, id) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div key={item.name} className="relative">
                      <Link
                        href={item.href}
                        className="nav-link-glow flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 rounded-xl transition-all duration-200 font-medium relative group z-10"
                        onMouseEnter={() => setHoveredItem(id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>

                      {hoveredItem === id && (
                        <motion.div
                          layoutId="navbar-hover"
                          className="absolute inset-0 bg-[#CCF301]/10 dark:bg-[#CCF301]/10 rounded-xl"
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

                {/* More Dropdown */}
                <div className="relative">
                  <motion.button
                    onMouseEnter={() => setIsMoreOpen(true)}
                    onMouseLeave={() => setIsMoreOpen(false)}
                    className="nav-link-glow flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 rounded-xl transition-all duration-200 font-medium relative group"
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
                                  className="nav-link-glow flex items-center space-x-3 px-3 py-3 text-gray-600 dark:text-gray-300 transition-all duration-200 rounded-lg group relative"
                                >
                                  <IconComponent className="h-5 w-5" />
                                  <span className="text-sm font-medium">
                                    {item.name}
                                  </span>
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

              {/* Desktop Auth/User Section */}
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

              {/* Mobile Menu Button */}
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
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
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
              >
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
                          className="nav-link-glow flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-xl transition-all duration-200 font-medium"
                        >
                          <IconComponent className="h-5 w-5" />
                          <span>{item.name}</span>
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
                            className="nav-link-glow flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-xl transition-all duration-200 font-medium"
                          >
                            <IconComponent className="h-5 w-5" />
                            <span>{item.name}</span>
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

      {/* User Profile Popup */}
      <UserProfilePopup 
        userData={userData}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default LoginNavbar;