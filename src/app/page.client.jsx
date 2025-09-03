'use client'
import { Button, TextInput, Badge } from "flowbite-react";
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { useTalentList } from "@/components/service-account-booking/context";
import { useUser } from "@/hooks/useUser";
import { useRouter } from 'next/navigation';
import QuickBookingCard from "@/components/quick-booking-card";
import ModelCard from "@/components/model-card";
import { useDrawer } from "@/components/service-account-booking/drawer";


export default function PageClient({preferences}) {
  const { isLoggedIn } = useUser();
  const { accounts, filteredAccounts, latestAccounts, nearbyAccounts,query, setQuery, activeFiltersCount, currentCity, setCurrentCity } = useTalentList();
  const { setShowDrawer } = useDrawer();
  const router = useRouter();
  const allModels = accounts || [];
  const filteredModels = filteredAccounts || [];
  const displayModels = filteredAccounts || [];
  const displayNearbyModels = nearbyAccounts || [];
  const displayNewModels = latestAccounts || [];

  // @todo: random comission
  const commissions = { "BROKER": 500 };

  function onModelClick(model) {
    router.push(`/profile/${model.id}`);
  }

  return (
    <div>
      {/* Hero Section with Background Banner */}
      <div className="relative">
        <div 
          className="relative h-96 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/banner.png')`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                發現您的完美夥伴
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                連結專業模特兒，創造美好瞬間
              </p>
              
              {/* Quick Search */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <TextInput
                    icon={Search}
                    placeholder="搜尋模特兒..."
                    className="backdrop-blur-sm border-white/20 focus:border-pink-400 text-gray-900"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Filter Results Info */}
        {filteredModels.length !== allModels.length && (
          <div className="mb-8 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-pink-700">
              根據您的篩選條件，找到 {filteredModels.length} 位模特兒
            </p>
          </div>
        )}

        {/* Quick Booking Section */}
        {!!currentCity &&
          <div className="mb-12">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="icon-[material-symbols--flash-on-outline] mr-2"></span>
                <h3 className="text-3xl font-bold">立即預約附近的模特兒</h3>
              </div>
              <p className="text-lg mb-6 opacity-90">
                在您附近的專業模特兒，隨時準備為您服務
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm opacity-80 mb-6">
                <span className="icon-[material-symbols--location-on] mr-1"></span>
                <span>目前位置：{currentCity}</span>
              </div>
            </div>
            
            {displayNearbyModels.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {displayNearbyModels.slice(0, 3).map((model) => (
                    <QuickBookingCard 
                      key={model.id} 
                      model={model} 
                      onClick={() => onModelClick(model)}
                      isLoggedIn={isLoggedIn}
                    />
                  ))}
                </div>
                <div className="flex text-center justify-center mt-6">
                  <Button href="/search?type=nearby" color="light" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                    查看更多附近模特兒
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                目前沒有符合篩選條件的附近模特兒
              </div>
            )}
          </div>
        }

        {/* New Models Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="mr-3 text-pink-500" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">新進模特兒特輯</h3>
            <Badge className="ml-3 bg-pink-100 text-pink-700 border-pink-200">新星崛起</Badge>
          </div>
          <p className="text-gray-600 mb-6">
            發現平台上的新面孔，以優惠價格體驗專業服務
          </p>
          
          {displayNewModels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayNewModels.map((model) => (
                  <ModelCard 
                    newModel
                    key={model.id} 
                    model={model} 
                    onClick={() => onModelClick(model)}
                    isLoggedIn={isLoggedIn}
                    commissions={commissions}
                  />
                ))}
              </div>
              <div className="flex justify-center text-center mt-6">
                <Button href="/search?type=latest" color="light" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                  查看所有新進模特兒
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              目前沒有符合篩選條件的新進模特兒
            </div>
          )}
        </div>

        {/* Featured Models */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">推薦模特兒</h3>
          {displayModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayModels.map((model) => (
                <ModelCard 
                  key={model.id} 
                  model={model} 
                  onClick={() => onModelClick(model)}
                  isLoggedIn={isLoggedIn}
                  commissions={commissions}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              目前沒有符合篩選條件的模特兒
            </div>
          )}
        </div>
      </div>

      {/* Floating Filter */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button
          color="pink"
          onClick={() => setShowDrawer(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <SlidersHorizontal size={20} />
          過濾器
          {activeFiltersCount > 0 && (
            <Badge color="failure" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}