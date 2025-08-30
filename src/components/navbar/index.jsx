'use client'
import { useUser } from "@/hooks/useUser";
import { Avatar, Button } from "flowbite-react";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export default function NavigationBar() {
  const { 
    currentPage, setCurrentPage, 
    showMobileMenu, setShowMobileMenu,
    isLoggedIn,
   } = useUser();

  return (
    <header>
      <Navbar fluid>
        <NavbarBrand as={Link} href="https://flowbite-react.com">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            GirlHub
          </h1>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Avatar rounded img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
                <Button
                  onClick={() => setIsLoggedIn(false)}
                  variant="ghost"
                  className="text-gray-600 hover:text-pink-600"
                >
                  登出
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setCurrentPage('auth')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
              >
                登入 / 註冊
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg  text-black hover:text-pink-600"
            >
              {showMobileMenu ? <span className="icon-[material-symbols--close]" /> : <span className="icon-[material-symbols--menu]" />}
            </button>
        </NavbarCollapse>
      </Navbar>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-pink-100">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => {setCurrentPage('home'); setShowMobileMenu(false);}}
                className={`px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === 'home' ? 'bg-pink-100 text-pink-700' : 'text-gray-600'
                }`}
              >
                首頁
              </button>
              <button 
                onClick={() => {setCurrentPage('search'); setShowMobileMenu(false);}}
                className={`px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === 'search' ? 'bg-pink-100 text-pink-700' : 'text-gray-600'
                }`}
              >
                搜尋
              </button>
              {!isLoggedIn && (
                <Button
                  onClick={() => {setCurrentPage('auth'); setShowMobileMenu(false);}}
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