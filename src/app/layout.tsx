// import type React from "react";
// import type { Metadata } from "next";
// import { Barlow } from "next/font/google";
// import { Analytics } from "@vercel/analytics/react";
// import { Suspense } from "react";
// import "./globals.css";
// import SessionProviderWrapper from "./SessionProviderWrapper";
// import StoreProvider from "./StoreProvider";

// const barlow = Barlow({
//   weight: "400",
//   variable: "--font-barlow",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "CodeCompass",
//   description: "Interactive coding platform with Monaco editor",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" suppressHydrationWarning className={barlow.className}>
//       <body className={`${barlow.variable} antialiased`}>
//         <SessionProviderWrapper>
//           <StoreProvider>
//             {" "}
//             <Suspense fallback={null}>{children}</Suspense>
//           </StoreProvider>
//         </SessionProviderWrapper>
//         <Analytics />
//       </body>
//     </html>
//   );
// }


import type React from "react";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "@/components/theme-provider";

const barlow = Barlow({
  weight: "400",
  variable: "--font-barlow",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeCompass",
  description: "Interactive coding platform with Monaco editor",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={barlow.className}>
      <body className={`${barlow.variable} antialiased`}>
        <ThemeProvider> {/* Add ThemeProvider here */}
          <SessionProviderWrapper>
            <StoreProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </StoreProvider>
          </SessionProviderWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}