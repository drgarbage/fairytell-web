'use client'
import { useUser } from "@/hooks/useUser";
import { Avatar, Button } from "flowbite-react";
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname } from "next/navigation";
import signOut from "@/client-services/auth/signOut";

export default function NavigationBar() {
  const router = useRouter();
  const { 
    // currentPage, setCurrentPage, 
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
              GirlHub
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
                <Avatar img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" className="w-8 h-8">
                  U
                </Avatar>
                <Button
                  onClick={onSignOut}
                  variant="ghost"
                  className="text-gray-600 hover:text-pink-600"
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
    // <header>
    //   <Navbar fluid>
    //     <NavbarBrand as={Link} href="/">
    //       <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
    //         GirlHub
    //       </h1>
    //     </NavbarBrand>
    //     <NavbarToggle />
    //     <NavbarCollapse>
    //         {isLoggedIn ? (
    //           <div className="flex items-center space-x-4">
    //             <Avatar rounded img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
    //             <Button
    //               onClick={() => onSignOut()}
    //               color="light"
    //               className="text-gray-600 hover:text-pink-600"
    //             >
    //               登出
    //             </Button>
    //           </div>
    //         ) : (
    //           <Button
    //             onClick={() => router.push('/auth')}
    //             className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
    //           >
    //             登入 / 註冊
    //           </Button>
    //         )}

    //         {/* Mobile Menu Button */}
    //         <button
    //           onClick={() => setShowMobileMenu(!showMobileMenu)}
    //           className="md:hidden p-2 rounded-lg  text-black hover:text-pink-600"
    //         >
    //           { 
    //             showMobileMenu ? 
    //             <span className="icon-[material-symbols--close]" /> : 
    //             <span className="icon-[material-symbols--menu]" />
    //           }
    //         </button>
    //     </NavbarCollapse>
    //   </Navbar>
    // </header>
  );
}