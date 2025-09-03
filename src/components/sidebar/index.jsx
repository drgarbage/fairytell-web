import React from "react";
import { Card, Avatar, Badge, Button } from "flowbite-react";
import { MapPin, Star, User } from "lucide-react";
import { packagePriceOf } from "@/utils/package-utils";
import money from "@/utils/money";
import strings from "@/utils/strings";
import Image from "next/image";


function Sidebar({ model, reviews = [], isLoggedIn, commissions = {} }) {
  const packagePrices = model.packages.map((p) => packagePriceOf(p, commissions));
  const priceRange =
    model.packages && model.packages.length > 0
      ? `${money(Math.min(...packagePrices))} ~ ${money(Math.max(...packagePrices))} 元`
      : "未提供";

  // 國籍
  const nationText = strings(model?.profile?.nation?.toUpperCase());
  const location = model?.placeInfo?.city ?? "未提供";

  const [cheapestPackage] = model?.packages?.sort((a, b) => packagePriceOf(a, commissions) - packagePriceOf(b, commissions)) || [];
  const startingPrice = !!cheapestPackage ? `$${money(packagePriceOf(cheapestPackage, commissions))}+` : null;
  

  return (
    <div className="lg:col-span-1">
      <div className="sticky flex flex-col bg-white border rounded-lg shadow top-8 border-pink-200">
        <div className="flex flex-col items-center p-6">
          <Avatar 
            img={model.avatar} 
            rounded 
            size="xl" 
            className="mb-4" 
            />
          <h3 className="text-2xl font-bold text-gray-900">
            {model.profile.name}
          </h3>
          <div className="space-y-4 my-6 w-full">
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-2" />
              {location}
            </div>
            <div className="flex items-center text-gray-600">
              <User className="mr-2 text-yellow-500" />
              {reviews && reviews.length > 0
                ? `已有 ${reviews.length} 則評價`
                : "尚無評價"}
            </div>
            <div className="flex items-center text-gray-600">
              <User className="mr-2" />
              {model.state === "ONLINE"
                ? "在線"
                : model.state === "OFFLINE"
                ? "離線"
                : "未啟用"}
            </div>
          </div>
          <div className="mb-6 w-full">
            <h4 className="font-semibold text-gray-900 mb-2">基本資訊</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">年齡：</span>
                <span>{model.profile.age} 歲</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">國籍：</span>
                <span>{nationText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">身高：</span>
                <span>{model.profile.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">體重：</span>
                <span>{model.profile.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">罩杯：</span>
                <span>{model.profile.cup}</span>
              </div>
            </div>
          </div>
          <div className="mb-6 w-full">
            <h4 className="font-semibold text-gray-900 mb-2">價格範圍</h4>
            <p className="text-pink-600 font-medium">{priceRange}</p>
          </div>
          <div className="mb-6 w-full">
            <h4 className="font-semibold text-gray-900 mb-2">標籤</h4>
            <div className="flex flex-wrap gap-1">
              {model.tags.map((tag, idx) => (
                <Badge key={idx} color="pink" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-3 w-full">
            {isLoggedIn ? (
              <>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  立即預約
                </Button>
                <Button
                  color="light"
                  className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
                >
                  私訊聯絡
                </Button>
              </>
            ) : (
              <Button
                color="light"
                className="w-full border-gray-300 text-gray-500"
                disabled
              >
                請先登入以預約
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
