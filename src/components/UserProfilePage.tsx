"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Github,
  Trophy,
  MessageCircle,
  Star,
  Calendar,
  Eye,
  Camera,
  Award,
  Code2,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Flame,
  Linkedin,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useGetUserProfileQuery } from "@/lib/services/leaderboard/userProfileApi";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("Recent AC");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();
  const { data: userData, isLoading, error } = useGetUserProfileQuery();

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = 
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleEditProfile = () => {
    router.push("/editprofile");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <section className={`min-h-screen p-6 flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-slate-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4 ${
            isDarkMode ? 'border-[#CCF301]' : 'border-[#0b131c]'
          }`}></div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading profile...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`min-h-screen p-6 flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-slate-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className="text-center">
          <p className="text-red-500 mb-4 text-lg font-semibold">Failed to load profile</p>
          <button
            onClick={() => window.location.reload()}
            className={`font-bold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-2xl ${
              isDarkMode 
                ? 'bg-[#CCF301] hover:bg-[#b8e001] text-black' 
                : 'bg-[#0b131c] hover:bg-[#1a2533] text-white'
            }`}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`min-h-screen p-4 md:p-8 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-slate-900 to-black text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Profile Section */}
        <div className={`relative rounded-3xl overflow-hidden mb-8 shadow-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-r from-slate-800/60 via-slate-800/40 to-slate-900/60' 
            : 'bg-gradient-to-r from-white/90 via-gray-50/90 to-white/90'
        } backdrop-blur-xl border ${isDarkMode ? 'border-slate-700/50' : 'border-gray-200'}`}>
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#CCF301] via-cyan-400 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className={`relative w-32 h-32 rounded-full overflow-hidden ring-4 shadow-2xl ${
                  isDarkMode ? 'ring-slate-800' : 'ring-white'
                }`}>
                  <Image
                    src={profileImage || userData?.image_url || "/default-avatar.png"}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '50%' }}
                  />
                </div>
                <label htmlFor="profile-upload" className={`absolute bottom-2 right-2 p-3 rounded-full cursor-pointer shadow-xl transition-all transform hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-[#CCF301] hover:bg-[#b8e001] text-black' 
                    : 'bg-[#0b131c] hover:bg-[#1a2533] text-white'
                }`}>
                  <Camera size={18} />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-black">
                    {userData?.username || "User"}
                  </h1>
                  <Sparkles className={isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'} size={28} />
                </div>
                <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {userData?.email || "No email"}
                </p>
                
                {/* Social Links */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                  {userData?.github && (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                      isDarkMode 
                        ? 'bg-slate-700/50 hover:bg-slate-700' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}>
                      <Github size={18} />
                      <a
                        href={userData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-medium"
                      >
                        {userData.github.replace("https://github.com/", "")}
                      </a>
                    </div>
                  )}
                  
                  {userData?.linkedin && (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                      isDarkMode 
                        ? 'bg-slate-700/50 hover:bg-slate-700' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}>
                      <Linkedin size={18} />
                      <a
                        href={userData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-medium"
                      >
                        {userData.linkedin.replace("https://linkedin.com/in/", "").replace("https://www.linkedin.com/in/", "")}
                      </a>
                    </div>
                  )}
                  
                  {userData?.website && (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                      isDarkMode 
                        ? 'bg-slate-700/50 hover:bg-slate-700' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}>
                      <Globe size={18} />
                      <a
                        href={userData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-medium"
                      >
                        {userData.website.replace("https://", "").replace("http://", "").split('/')[0]}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={handleEditProfile}
                    className={`font-bold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl ${
                      isDarkMode 
                        ? 'bg-[#CCF301] hover:bg-[#b8e001] text-black' 
                        : 'bg-[#0b131c] hover:bg-[#1a2533] text-white'
                    }`}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Quick Stats Cards */}
              <div className="flex md:flex-col gap-4">
                <div className={`px-6 py-4 rounded-2xl text-center min-w-[120px] ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-700/50 to-slate-800/50' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  <div className={`text-3xl font-black mb-1 ${
                    isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'
                  }`}>
                    {userData?.total_problem_solved || 0}
                  </div>
                  <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Problems Solved
                  </div>
                </div>
                <div className={`px-6 py-4 rounded-2xl text-center min-w-[120px] ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-700/50 to-slate-800/50' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  <div className={`text-3xl font-black mb-1 ${
                    isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'
                  }`}>
                    {userData?.badge || 0}
                  </div>
                  <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Badges Earned
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Level Card */}
            <div className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl ${
                  isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#0b131c]/10'
                }`}>
                  <Award className={isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'} size={24} />
                </div>
                <h3 className="text-xl font-bold">Current Level</h3>
              </div>
              <div className={`p-6 rounded-2xl text-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-700/50 to-slate-800/30' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100'
              }`}>
                <Flame className={`mx-auto mb-3 ${isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'}`} size={32} />
                <div className={`text-3xl font-black mb-2 ${
                  isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'
                }`}>
                  {userData?.level || "Beginner"}
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Keep pushing forward!
                </p>
              </div>
            </div>

            {/* Community Stats */}
            <div className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl ${
                  isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#0b131c]/10'
                }`}>
                  <TrendingUp className={isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'} size={24} />
                </div>
                <h3 className="text-xl font-bold">Community Impact</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Eye, label: "Profile Views", value: userData?.view || 0, color: "cyan" },
                  { icon: Code2, label: "Solutions Shared", value: userData?.solution || 0, color: "green" },
                  { icon: MessageCircle, label: "Discussions", value: userData?.comment || 0, color: "purple" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className={`flex items-center justify-between p-4 rounded-2xl transition-all hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-slate-700/30 hover:bg-slate-700/50' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={`text-${color}-400`} />
                      <span className="font-medium">{label}</span>
                    </div>
                    <span className="text-2xl font-black">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Circle */}
            <div className={`rounded-3xl p-8 shadow-xl border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-2xl ${
                  isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#0b131c]/10'
                }`}>
                  <Target className={isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'} size={24} />
                </div>
                <h3 className="text-2xl font-bold">Problem Solving Journey</h3>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                {/* Circular Progress */}
                <div className="relative">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className={isDarkMode ? 'text-slate-700' : 'text-gray-200'}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#progress-gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 * 0.25}
                      className="transition-all duration-1000"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#CCF301" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-black mb-1">{userData?.total_problem_solved || 0}</div>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Solved
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Streak", value: "0", icon: Zap },
                    { label: "Rank", value: "#--", icon: Trophy },
                    { label: "Accuracy", value: "0%", icon: Target },
                    { label: "Rate", value: "0/day", icon: TrendingUp },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className={`p-4 rounded-2xl text-center ${
                      isDarkMode 
                        ? 'bg-slate-700/30' 
                        : 'bg-gray-50'
                    }`}>
                      <Icon className={`mx-auto mb-2 ${isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'}`} size={24} />
                      <div className="text-2xl font-black mb-1">{value}</div>
                      <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className={`rounded-3xl p-8 shadow-xl border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${
                    isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#0b131c]/10'
                  }`}>
                    <Trophy className={isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'} size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Achievement Showcase</h3>
                </div>
                <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                }`}>
                  {userData?.badge || 0} Total
                </span>
              </div>
              <div className={`text-center py-16 rounded-2xl ${
                isDarkMode ? 'bg-slate-700/20' : 'bg-gray-50'
              }`}>
                <Trophy className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} size={64} />
                <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Start earning badges by solving problems!
                </p>
              </div>
            </div>

            {/* Activity Tabs */}
            <div className={`rounded-3xl shadow-xl border backdrop-blur-sm overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className={`flex border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                {[
                  { label: "Recent AC", icon: Calendar },
                  { label: "Solutions", icon: Star },
                  { label: "Discuss", icon: MessageCircle },
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`flex-1 py-5 px-4 font-bold transition-all relative ${
                      activeTab === label
                        ? isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]'
                        : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} className="inline mr-2" />
                    {label}
                    {activeTab === label && (
                      <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${
                        isDarkMode ? 'bg-[#CCF301]' : 'bg-[#0b131c]'
                      }`} />
                    )}
                  </button>
                ))}
              </div>
              <div className="p-8">
                <div className={`text-center py-16 rounded-2xl ${
                  isDarkMode ? 'bg-slate-700/20' : 'bg-gray-50'
                }`}>
                  <Calendar className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} size={64} />
                  <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No recent activity yet
                  </p>
                  <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Start solving problems to see your progress here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDashboard;