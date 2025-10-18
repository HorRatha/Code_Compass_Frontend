"use client";

import React from "react";
import { useSession } from "next-auth/react";
import OfficialNavbar from "./Before-Login/OfficialNavbar";
import LoginNavbar from "./After-Login/LoginNavbar";

const Navbar = () => {
  const { data: session, status } = useSession();

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30">
          {/* Optional: Add a loading skeleton here if you want */}
        </div>
        <div className="h-16"></div>
      </div>
    );
  }

  // If user is logged in, show LoginNavbar
  if (session) {
    return <LoginNavbar />;
  }

  // If user is not logged in, show OfficialNavbar
  return <OfficialNavbar />;
};

export default Navbar;