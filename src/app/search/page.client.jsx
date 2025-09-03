'use client'
import { Button, TextInput, Badge } from "flowbite-react";
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { useTalentList } from "@/components/service-account-booking/context";
import { useUser } from "@/hooks/useUser";
import { useRouter } from 'next/navigation';
import QuickBookingCard from "@/components/quick-booking-card";
import ModelCard from "@/components/model-card";
import { useDrawer } from "@/components/service-account-booking/drawer";


export default function PageClient({type}) {
  const { isLoggedIn } = useUser();
  const { filteredAccounts, query, setQuery, activeFiltersCount, currentCity } = useTalentList();
  const { setShowDrawer } = useDrawer();
  const router = useRouter();
  const allModels = filteredAccounts || [];
  const filteredModels = filteredAccounts || [];
  let displayModels = [];
  switch(type) {
    case "latest":
      displayModels = filteredAccounts.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case "nearby":
      displayModels = filteredAccounts.filter(account => account.placeInfo?.city === currentCity);
      break;
    default:
      displayModels = filteredModels;
      break;
  }

  // @todo: random comission
  const commissions = { "BROKER": 500 };

  function onModelClick(model) {
    router.push(`/profile/${model.id}`);
  }

  return (
    <div>
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="">
          <Button
            color="light"
            onClick={() => window.history.back()}
            className="mb-4 text-pink-600 hover:text-pink-700"
          >
            ← 返回
          </Button>
        </div>

        <TextInput
          icon={Search}
          placeholder="搜尋模特兒..."
          className="mb-4 backdrop-blur-sm border-white/20 focus:border-pink-400 text-gray-900"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Filter Results Info */}
        {filteredModels.length !== allModels.length && (
          <div className="mb-8 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-pink-700">
              根據您的篩選條件，找到 {filteredModels.length} 位模特兒
            </p>
          </div>
        )}

        <div className="mb-8">
          {displayModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayModels.slice(0, 6).map((model) => (
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
          className="flex items-center gap-2"
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