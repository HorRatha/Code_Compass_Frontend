import type { Metadata } from "next";
import "../globals.css";
import StoreProvider from "../StoreProvider";
import Navbar from "@/components/navbarCore/navbar";
import SessionProviderWrapper from "../SessionProviderWrapper";


export const metadata: Metadata = {
  title: "CodeCompass | Leaderboard",
  description: "This is the leaderboard page",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dark:bg-black bg-white">
      <SessionProviderWrapper>
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </SessionProviderWrapper>
    </div>
  );
}

