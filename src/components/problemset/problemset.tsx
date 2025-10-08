"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  JSX,
} from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Star,
  Trophy,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { ButtonProps } from "@/lib/types/ButtonProps";
import Link from "next/link";
import { useGetAllProblemsQuery } from "@/lib/services/problem/problemApi";
import { ProblemSummaryResponse } from "@/lib/types/problem/problemResponse";
import Loader from "../loader/LoaderComponent";

const mockData = [
  {
    id: 1,
    title: "Two Sum Problem",
    difficulty: "EASY",
    coins: 15,
    stars: "TWO",
    tags: ["arrays", "hash-table", "beginner"],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "EASY",
    coins: 25,
    stars: "THREE",
    tags: ["stack", "strings", "beginner"],
  },
  {
    id: 3,
    title: "Running Sum of an Array",
    difficulty: "EASY",
    coins: 20,
    stars: "THREE",
    tags: ["implementation", "arrays", "prefix-sum", "beginner"],
  },
  {
    id: 4,
    title: "Simplifying Long Words",
    difficulty: "EASY",
    coins: 20,
    stars: "THREE",
    tags: ["implementation", "beginner", "strings"],
  },
  {
    id: 5,
    title: "Merge Two Sorted Lists",
    difficulty: "EASY",
    coins: 30,
    stars: "THREE",
    tags: ["linked-list", "recursion", "beginner"],
  },
  {
    id: 6,
    title: "Binary Tree Inorder Traversal",
    difficulty: "MEDIUM",
    coins: 40,
    stars: "THREE",
    tags: ["tree", "depth-first-search", "binary-tree"],
  },
  {
    id: 7,
    title: "3Sum Problem",
    difficulty: "MEDIUM",
    coins: 50,
    stars: "THREE",
    tags: ["arrays", "two-pointers", "sorting"],
  },
  {
    id: 8,
    title: "Longest Palindromic Substring",
    difficulty: "MEDIUM",
    coins: 45,
    stars: "THREE",
    tags: ["string", "dynamic-programming"],
  },
  {
    id: 9,
    title: "Regular Expression Matching",
    difficulty: "HARD",
    coins: 80,
    stars: "THREE",
    tags: ["string", "dynamic-programming", "recursion"],
  },
  {
    id: 10,
    title: "Merge k Sorted Lists",
    difficulty: "HARD",
    coins: 75,
    stars: "THREE",
    tags: ["linked-list", "divide-and-conquer", "heap"],
  },
  {
    id: 11,
    title: "Trapping Rain Water",
    difficulty: "HARD",
    coins: 70,
    stars: "THREE",
    tags: ["array", "two-pointers", "dynamic-programming"],
  },
];

// Modern UI Components with Light/Dark Mode Support and Barlow Font
const Card = ({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <div
    className={`rounded-xl border border-gray-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm ${
      hover
        ? "hover:border-[#CCF301]/50 hover:shadow-xl hover:shadow-[#CCF301]/10 transition-all duration-300"
        : ""
    } ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-4 sm:p-6 pb-3 ${className}`}>{children}</div>;

const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h5
    className={`text-base font-semibold text-gray-900 dark:text-slate-100 leading-tight ${className}`}
  >
    {children}
  </h5>
);

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCF301]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 touch-manipulation";
  const variants = {
    default:
      "bg-[#CCF301] text-gray-900 hover:bg-[#CCF301]/90 shadow-lg shadow-[#CCF301]/25 hover:shadow-[#CCF301]/30",
    outline:
      "border border-gray-300 dark:border-slate-600 bg-transparent text-gray-700 dark:text-slate-300 hover:bg-[#CCF301]/10 hover:text-[#CCF301] hover:border-[#CCF301]/50",
    ghost:
      "text-gray-600 dark:text-slate-400 hover:text-[#CCF301] hover:bg-[#CCF301]/10",
    secondary:
      "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600",
  };
  const sizes = {
    default: "h-10 px-4 py-2 text-sm sm:text-base",
    sm: "h-8 px-3 text-xs sm:text-sm",
    icon: "h-10 w-10 min-h-10 min-w-10",
    lg: "h-12 px-6 text-sm sm:text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}) => (
  <input
    className={`flex h-10 w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 px-3 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400 focus:border-[#CCF301] focus:outline-none focus:ring-2 focus:ring-[#CCF301]/20 transition-all duration-200 ${className}`}
    {...props}
  />
);

const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "danger";
  className?: string;
}) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  const variantClasses = {
    default: "bg-[#CCF301]/15 text-[#CCF301] border border-[#CCF301]/20",
    secondary:
      "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600/50",
    outline: "border border-current text-gray-600 dark:text-slate-400",
    success:
      "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/20",
    warning:
      "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20",
    danger:
      "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

const topicFilters = [
  "All Topics",
  "Arrays",
  "Strings",
  "Trees",
  "Dynamic Programming",
];

const getDifficultyConfig = (difficulty: string) => {
  switch (difficulty) {
    case "EASY":
      return {
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-500/15 border-green-500/20",
      };
    case "MEDIUM":
      return {
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-500/15 border-orange-500/20",
      };
    case "HARD":
      return {
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-500/15 border-red-500/20",
      };
    default:
      return {
        color: "text-gray-600 dark:text-slate-400",
        bg: "bg-gray-500/15 dark:bg-slate-500/15 border-gray-500/20 dark:border-slate-500/20",
      };
  }
};

// Fixed star display to only show 3 stars max
// const getStarsDisplay = (stars: string) => {
//   const starCount = stars === "ONE" ? 1 : stars === "TWO" ? 2 : 3; // Max 3 stars
//   return (
//     <div className="flex items-center gap-1">
//       {Array.from({ length: 3 }, (_, i) => (
//         <Star
//           key={i}
//           className={`w-3 h-3 ${
//             i < starCount
//               ? "text-yellow-500 fill-current"
//               : "text-gray-300 dark:text-slate-500"
//           }`}
//         />
//       ))}
//     </div>
//   );
// };

// Sidebar Component - Fixed mobile text visibility
const Sidebar = ({
  sidebarWidth,
  isMobile,
  isCollapsed,
  mobileMenuOpen,
  toggleCollapse,
  setMobileMenuOpen,
  sidebarRef,
  dragRef,
  isDragging,
  handleMouseDown,
  currentView,
  setCurrentView,
}: {
  sidebarWidth: number;
  isMobile: boolean;
  isCollapsed: boolean;
  mobileMenuOpen: boolean;
  toggleCollapse: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  dragRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  currentView: string;
  setCurrentView: (view: "problems" | "studyplan") => void;
}) => {
  return (
    <div
      ref={sidebarRef}
      className={`${
        isMobile
          ? `fixed left-0 top-0 z-50 transform transition-transform duration-300 ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } w-80`
          : "relative z-40"
      } bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ease-in-out group`}
      style={
        !isMobile
          ? {
              width: `${sidebarWidth}px`,
              height: "100vh",
              minHeight: "100vh",
              borderRadius: "25px",
            }
          : {
              height: "100vh",
              minHeight: "100vh",
            }
      }
    >
      {/* Resize Handle - Desktop Only */}
      {!isMobile && (
        <div
          ref={dragRef}
          className={`absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-[#CCF301]/50 transition-colors duration-200 group-hover:opacity-100 opacity-0 ${
            isDragging ? "bg-[#CCF301] opacity-100" : ""
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-0.5 h-4 bg-gray-500 dark:bg-slate-400 rounded-full"></div>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col">
        {/* Fixed header section */}
        <div className="flex-shrink-0 p-4 sm:p-6 pb-4">
          {/* Logo */}
          <div
            className={`flex items-center gap-3 mb-6 ${
              !isMobile && isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#CCF301] to-[#CCF301]/80 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-gray-900" />
            </div>
            {(isMobile || !isCollapsed) && (
              <div className="min-w-0">
                <h5 className="text-lg font-bold text-[#CCF301] truncate">
                  CodeCompass
                </h5>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                  Problem Library
                </p>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleCollapse}
            className={`${
              isMobile
                ? "absolute right-4 top-4"
                : "absolute bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700 -right-4 top-6"
            } transition-all duration-200 w-8 h-8 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:text-[#CCF301] z-20`}
            title={
              isMobile
                ? "Close menu"
                : isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {isMobile ? (
              <X className="w-5 h-5" />
            ) : isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>

          {/* Stats Cards */}
          {(isMobile || !isCollapsed) && (
            <div className="space-y-3 mb-6">
              <Card hover={false} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-2xl font-bold text-[#CCF301]">
                      {mockData.length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                      Total Problems
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-[#CCF301] flex-shrink-0" />
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Scrollable navigation section */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="space-y-2">
            <div
              className={`flex items-center gap-3 p-3 ${
                currentView === "problems"
                  ? "bg-[#CCF301]/10 border border-[#CCF301]/20 text-[#CCF301]"
                  : "text-gray-600 dark:text-slate-400 hover:text-[#CCF301] hover:bg-[#CCF301]/10"
              } rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                !isMobile && isCollapsed ? "justify-center" : ""
              }`}
              onClick={() => {
                setCurrentView("problems");
                if (isMobile) setMobileMenuOpen(false);
              }}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              {(isMobile || !isCollapsed) && (
                <span className="whitespace-nowrap truncate">
                  Problem Library
                </span>
              )}
              {(isMobile || !isCollapsed) && (
                <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
              )}
            </div>

            <div
              className={`flex items-center gap-3 p-3 ${
                currentView === "studyplan"
                  ? "bg-[#CCF301]/10 border border-[#CCF301]/20 text-[#CCF301]"
                  : "text-gray-600 dark:text-slate-400 hover:text-[#CCF301] hover:bg-[#CCF301]/10"
              } transition-all duration-200 cursor-pointer rounded-xl ${
                !isMobile && isCollapsed ? "justify-center" : ""
              }`}
              onClick={() => {
                setCurrentView("studyplan");
                if (isMobile) setMobileMenuOpen(false);
              }}
              title="Study Plan"
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              {(isMobile || !isCollapsed) && (
                <span className="whitespace-nowrap truncate">Study Plan</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Study Plan Component - Fixed background colors
const StudyPlan = ({
  sidebarWidth,
  isMobile,
  isCollapsed,
  mobileMenuOpen,
  toggleCollapse,
  setMobileMenuOpen,
  sidebarRef,
  dragRef,
  isDragging,
  handleMouseDown,
  onBack,
}: {
  sidebarWidth: number;
  isMobile: boolean;
  isCollapsed: boolean;
  mobileMenuOpen: boolean;
  toggleCollapse: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  dragRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  onBack: () => void;
}) => {
  const studyPlans = [
    {
      id: "1",
      title: "C++ Mastery",
      description: "Master C++ programming with 75 curated problems",
      subtitle: "System Programming & Performance",
      problems: "75 Problems",
      level: "Advanced",
      gradient: "from-blue-500 to-blue-600",
      icon: "💻",
    },
    {
      id: "2",
      title: "Java Excellence",
      description: "Enterprise Java development with top interview questions",
      subtitle: "Object-Oriented Programming",
      problems: "85 Problems",
      level: "Intermediate",
      gradient: "from-orange-500 to-red-500",
      icon: "☕",
    },
    {
      id: "3",
      title: "JavaScript Pro",
      description: "Modern JavaScript and web development essentials",
      subtitle: "Frontend & Backend Development",
      problems: "90 Problems",
      level: "Intermediate",
      gradient: "from-yellow-500 to-yellow-600",
      icon: "🚀",
    },
    {
      id: "4",
      title: "Python Expert",
      description: "Data structures, algorithms, and Python mastery",
      subtitle: "AI/ML & Data Science Ready",
      problems: "80 Problems",
      level: "Mixed",
      gradient: "from-green-500 to-blue-500",
      icon: "🐍",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black text-gray-900 dark:text-slate-100 transition-colors duration-300 flex relative overflow-x-hidden"
      style={{ fontFamily: "Barlow, sans-serif" }}
    >
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarWidth={sidebarWidth}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        toggleCollapse={toggleCollapse}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarRef={sidebarRef}
        dragRef={dragRef}
        isDragging={isDragging}
        handleMouseDown={handleMouseDown}
        currentView="studyplan"
        setCurrentView={onBack}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen ${
          isMobile ? "w-full" : ""
        }`}
        style={
          !isMobile
            ? {
                width: `calc(100% - ${sidebarWidth}px)`,
              }
            : {}
        }
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#CCF301] to-[#CCF301]/80 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-gray-900" />
                </div>
                <h5 className="text-lg font-bold text-[#CCF301]">
                  CodeCompass
                </h5>
              </div>
              <div className="w-10 h-10"></div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
              Study Plan
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Choose your programming language path
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-6">
              Featured
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {studyPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className="group cursor-pointer h-64 relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-90`}
                  />
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                    <div>
                      <div className="text-3xl mb-3">{plan.icon}</div>
                      <h5 className="font-bold text-lg mb-2">{plan.title}</h5>
                      <p className="text-white/90 text-sm mb-1">
                        {plan.subtitle}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm mb-3">
                        {plan.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">{plan.problems}</span>
                        <span className="text-white/90">•</span>
                        <span className="text-white/90">{plan.level}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Problemset(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const [currentView, setCurrentView] = useState<"problems" | "studyplan">(
    "problems"
  );
  const [sidebarWidth, setSidebarWidth] = useState(288); // 72 * 4 = 288px (w-72)
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

    const minWidth = 64; // w-16
  const maxWidth = 400;

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
        setSidebarWidth(64);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Load saved sidebar width (using React state instead of localStorage for build compatibility)
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      e.preventDefault();
      setIsDragging(true);
    },
    [isMobile]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || isMobile) return;

      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
        setIsCollapsed(newWidth <= 80); // Auto-collapse when very narrow
      }
    },
    [isDragging, isMobile]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging && !isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp, isMobile]);

  const toggleCollapse = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
      return;
    }

    if (isCollapsed) {
      setSidebarWidth(288);
      setIsCollapsed(false);
    } else {
      setSidebarWidth(64);
      setIsCollapsed(true);
    }
  };

const {data: problems, isLoading, isFetching} = useGetAllProblemsQuery();

  if (isLoading || isFetching) return <Loader/>
  

  const filteredData = problems
    ? [...problems]
    .sort((a: ProblemSummaryResponse, b: ProblemSummaryResponse) => a.id - b.id)
    .filter((problem: ProblemSummaryResponse) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTopic =
        activeFilter === "All Topics" ||
        problem.tags.some((tag) => {
          const normalizedTag = tag.toLowerCase().replace(/-/g, " ");
          const normalizedFilter = activeFilter.toLowerCase();
          return (
            normalizedTag.includes(normalizedFilter) ||
            normalizedFilter.includes(normalizedTag)
          );
        });

      return matchesSearch && matchesTopic;
    }) : [];

  if (currentView === "studyplan") {
    return (
        <StudyPlan
          sidebarWidth={sidebarWidth}
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          toggleCollapse={toggleCollapse}
          setMobileMenuOpen={setMobileMenuOpen}
          sidebarRef={sidebarRef}
          dragRef={dragRef}
          isDragging={isDragging}
          handleMouseDown={handleMouseDown}
          onBack={() => setCurrentView("problems")}
        />
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black text-gray-900 dark:text-slate-100 transition-all duration-500 flex relative overflow-x-hidden"
      style={{ fontFamily: "Barlow, sans-serif" }}
    >
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarWidth={sidebarWidth}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        toggleCollapse={toggleCollapse}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarRef={sidebarRef}
        dragRef={dragRef}
        isDragging={isDragging}
        handleMouseDown={handleMouseDown}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen ${
          isMobile ? "w-full" : ""
        }`}
        style={
          !isMobile
            ? {
                width: `calc(100% - ${sidebarWidth}px)`,
              }
            : {}
        }
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#CCF301] to-[#CCF301]/80 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-gray-900" />
                </div>
                <h5 className="text-lg font-bold text-[#CCF301]">
                  CodeCompass
                </h5>
              </div>
              <div className="w-10 h-10"></div>
            </div>
          )}

          {/* Header - Made smaller and responsive */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
              Problem Packages
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
              Master coding interviews with curated problems
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="group cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 dark:text-slate-400 group-hover:text-[#CCF301] transition-colors" />
                </div>
                <CardTitle className="group-hover:text-[#CCF301] transition-colors text-sm sm:text-base">
                  System Design Masterclass
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm mb-4">
                  Master system design concepts for technical interviews and
                  real-world applications
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
                  <span>12 Problems</span>
                  <span>•</span>
                  <span>Advanced</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 sm:w-6 h-5 sm:h-6 text-gray-900" />
                  </div>
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 dark:text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-sm sm:text-base">
                  Data Structures & Algorithms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm mb-4">
                  Essential DSA concepts with hands-on coding practice
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
                  <span>25 Problems</span>
                  <span>•</span>
                  <span>Intermediate</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Star className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 dark:text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-sm sm:text-base">
                  Top Interview Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm mb-4">
                  Most frequently asked questions from top tech companies
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
                  <span>50 Problems</span>
                  <span>•</span>
                  <span>Mixed</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters Section */}
          <div className="mb-6 sm:mb-8">
            <Card hover={false} className="p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Search */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Search Problems
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search by title..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Topic Filter */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Topic Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {topicFilters.map((filter) => (
                      <Button
                        key={filter}
                        variant={
                          activeFilter === filter ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className="transition-all duration-200 whitespace-nowrap text-xs sm:text-sm"
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Advanced Filters"
                    className="flex-shrink-0"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Sort Options"
                    className="flex-shrink-0"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Problems Table - Mobile Responsive */}
          <Card hover={false} className="overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700/50 bg-gray-50 dark:bg-slate-800/50">
                    <th className="text-left p-3 sm:p-4 text-gray-700 dark:text-slate-300 font-medium text-sm">
                      #
                    </th>
                    <th className="text-left p-3 sm:p-4 text-gray-700 dark:text-slate-300 font-medium text-sm">
                      Problem
                    </th>
                    {/* <th className="text-left p-3 sm:p-4 text-gray-700 dark:text-slate-300 font-medium text-sm">
                      Stars
                    </th> */}
                    <th className="text-left p-3 sm:p-4 text-gray-700 dark:text-slate-300 font-medium text-sm">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? 
                  ( <Loader/> ) : (
                  
                  filteredData.map((problem: ProblemSummaryResponse) => {
                    const difficultyConfig = getDifficultyConfig(
                      problem.difficulty
                    );
                    return (
                      <tr
                        key={problem.id}
                        className="border-b border-gray-200 dark:border-slate-700/30 hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-all duration-200 cursor-pointer group"
                      >
                        <td className="p-3 sm:p-4 text-gray-600 dark:text-slate-400 font-mono text-sm">
                            <Link
                              href={`/problemdetails/${problem.id}`}
                              className="no-underline block"
                            >
                              {problem.id}
                            </Link>
                        </td>
                        <td className="p-3 sm:p-4">
                            <Link
                              href={`/problemdetails/${problem.id}`}
                              className="no-underline block"
                            >
                              <div className="min-w-0">
                                <div className="text-gray-900 dark:text-slate-100 font-medium group-hover:text-[#CCF301] transition-colors duration-200 truncate">
                                  {problem.title}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {problem.tags
                                    .slice(0, 3)
                                    .map((tag, index) => (
                                      <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  {problem.tags.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{problem.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </Link>
                        </td>
                        {/* <td className="p-3 sm:p-4">
                          {getStarsDisplay(problem.stars)}
                        </td> */}
                        <td className="p-3 sm:p-4">
<Link
                              href={`/problemdetails/${problem.id}`}
                              className="no-underline block"
                            >
                              <Badge
                                className={`${difficultyConfig.color} ${difficultyConfig.bg} border text-xs`}
                              >
                                {problem.difficulty}
                              </Badge>
                            </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden">
              <div className="divide-y divide-gray-200 dark:divide-slate-700/50">
                {filteredData.map((problem: ProblemSummaryResponse) => {
                  const difficultyConfig = getDifficultyConfig(
                    problem.difficulty
                  );
                  return (
                    <div
                      key={problem.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-all duration-200 cursor-pointer"
                    >
                      <Link href={`/problemdetails/${problem.id}`} className="no-underline block">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="text-gray-600 dark:text-slate-400 font-mono text-sm flex-shrink-0">
                            #{problem.id}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h6 className="text-gray-900 dark:text-slate-100 font-medium text-sm truncate">
                              {problem.title}
                            </h6>
                          </div>
                        </div>
                        {/* <div className="flex-shrink-0 ml-2">
                          {getStarsDisplay(problem.stars)}
                        </div> */}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge
                          className={`${difficultyConfig.color} ${difficultyConfig.bg} border text-xs`}
                        >
                          {problem.difficulty}
                        </Badge>
                        {problem.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {problem.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{problem.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 sm:mt-8">
            <div className="text-gray-600 dark:text-slate-400 text-sm">
              Showing {filteredData.length} of {mockData.length} problems
            </div>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 hover:border-[#CCF301] hover:text-[#CCF301] transition-all duration-300"
            >
              Load More Problems
            </Button>
          </div>
        </div>
        </div>
        
        </div>
  ) as JSX.Element;
}