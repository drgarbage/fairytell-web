import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/hooks/useUser";
import { MessageProvider } from "@/hooks/useMessage";
import { ThemeProvider } from "flowbite-react";
import { ThemeInit } from "../../.flowbite-react/init";
import fetchDefaultBroker from "@/client-services/preference/defaultBroker";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GirlHub",
  description: "發現您的完美夥伴",
};

export default async function RootLayout({ children }) {
  const defaultBroker = await fetchDefaultBroker();

  return (
    <ThemeProvider>
      <html>
        <head>
          <ThemeInit />
        </head>
        <body className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 ${geistSans.variable} ${geistMono.variable}`}>
            <MessageProvider>
              <UserProvider defaultBroker={defaultBroker}>
                <Navbar />
                {children}
              </UserProvider>
            </MessageProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
