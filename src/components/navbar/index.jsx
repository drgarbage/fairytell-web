'use client'
import { useUser } from "@/hooks/useUser";
import { Avatar, Button } from "flowbite-react";
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname } from "next/navigation";
import signOut from "@/client-services/auth/signOut";

export default function NavigationBar() {
  const router = useRouter();
  const { 
    user,
    showMobileMenu, setShowMobileMenu,
    isLoggedIn,
   } = useUser();

   const currentPage = usePathname();

   const navigate = (path) => {
    router.push(path);
   };

   const onSignOut = () => {
     signOut();
     router.replace("/");
   };

  return (
    <header className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_SITE_NAME || "GirlHub"}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === '/' ? 'bg-pink-100 text-pink-700' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              首頁
            </button>
            <button 
              onClick={() => navigate('/search')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === '/search' ? 'bg-pink-100 text-pink-700' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              搜尋
            </button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Avatar rounded img={user?.photoUrl} />
                <Button
                  onClick={onSignOut}
                  variant="ghost"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                >
                  登出
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
              >
                登入 / 註冊
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-pink-600"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-pink-100">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => {navigate('/'); setShowMobileMenu(false);}}
                className={`px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === '/' ? 'bg-pink-100 text-pink-700' : 'text-gray-600'
                }`}
              >
                首頁
              </button>
              <button 
                onClick={() => {navigate('/search'); setShowMobileMenu(false);}}
                className={`px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === '/search' ? 'bg-pink-100 text-pink-700' : 'text-gray-600'
                }`}
              >
                搜尋
              </button>
              {!isLoggedIn && (
                <Button
                  onClick={() => {navigate('/auth'); setShowMobileMenu(false);}}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white mt-2"
                >
                  登入 / 註冊
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}