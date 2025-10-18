import React from "react";
import Link from "next/link";
import { LogIn, User } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

interface MobileAuthSectionProps {
  onCloseMenu: () => void;
}

export const MobileAuthSection: React.FC<MobileAuthSectionProps> = ({ onCloseMenu }) => {
  return (
    <motion.div
      className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4 space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={() => {
          onCloseMenu();
          signIn("keycloak");
        }}
        className="nav-link-glow w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-xl transition-all duration-200 font-medium relative group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <LogIn className="h-5 w-5" />
        <span>Login</span>
        <motion.div
          className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      <Link href="/signup">
        <motion.button
          onClick={onCloseMenu}
          className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-gray-900 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#CCF301]/25 relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <User className="h-5 w-5" />
          <span>Sign Up</span>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </Link>
    </motion.div>
  );
};