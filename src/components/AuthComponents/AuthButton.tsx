// "use client";

// import { useSession, signIn, signOut } from "next-auth/react";
// import { motion } from "framer-motion";
// import { User, LogIn } from "lucide-react";
// import Link from "next/link";

// export default function AuthButtons() {
//   const { data: session } = useSession();

//   return (
//     <div className="flex gap-2">
//       {session?.accessToken ? (
//         <>
//           <motion.button
//             className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-black rounded-xl transition-all duration-200 font-medium relative group hover:cursor-pointer bg-primary/90 hover:bg-primary/80"
//             whileTap={{ scale: 0.95 }}
//           >
//             <User className="h-4 w-4" />
//             <span>{session.user?.name}</span>
//             <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
//           </motion.button>
//           <motion.button
//             className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#f33901] to-[#f33901]/80 text-gray-900 hover:from-[#f33901]/90 hover:to-[#f33901]/70 hover:cursor-pointer rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#f33901]/25 relative overflow-hidden"
//             whileTap={{ scale: 0.95 }}
//           >
//             <User className="h-4 w-4" />
//             <span onClick={() => signOut()}>Logout</span>
//           </motion.button>
//         </>
//       )
//        : (
//         <>
//           <motion.button
//             className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
//             whileTap={{ scale: 0.95 }}
//             onClick={() => signIn("keycloak")}
//           >
//             <LogIn className="h-4 w-4" />
//             <span>Login</span>
//             <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
//           </motion.button>
//           <motion.button
//             className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-gray-900 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 rounded-xl md-medium transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#CCF301]/25 relative overflow-hidden"
//             whileTap={{ scale: 0.95 }}
//           >
//             <User className="h-4 w-4" />
//             <Link href="/signup">
//               <span>Sign Up</span>
//             </Link>
//           </motion.button>
//         </>
//       )}
//     </div>
//   );
// }
"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function AuthButtons() {

  return (
    <div className="flex gap-2">
      <motion.button
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
        whileTap={{ scale: 0.95 }}
        onClick={() => signIn("keycloak")}
      >
        <LogIn className="h-4 w-4" />
        <span>Login</span>
        <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
      </motion.button>
      <motion.button
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-gray-900 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#CCF301]/25 relative overflow-hidden"
        whileTap={{ scale: 0.95 }}
      >
        <span>Sign Up</span>
      </motion.button>
    </div>
  );
}