import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from '@/utils/tostify';
import { SkeletonTheme } from "react-loading-skeleton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "videoexchange",
  description: "video sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <AuthProvider>
            {children}
          </AuthProvider>
          <ToastContainer />
        </SkeletonTheme>
      </body>
    </html>
  );
}
