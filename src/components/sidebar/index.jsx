import React from "react";
import { Card, Avatar, Badge, Button } from "flowbite-react";
import { MapPin, User } from "lucide-react";
import { packageNameOf, packagePriceOf } from "@/utils/package-utils";
import { PLATFORM_COMMISSION } from "@/schema/globals";
import money from "@/utils/money";
import strings from "@/utils/strings";


function Sidebar({ model, reviews = [], isLoggedIn, contactInfo = {}, commissions = {} }) {
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

          { isLoggedIn && model?.freeServices?.length > 0 &&
            <div className="mb-6 w-full">
              <h4 className="font-semibold text-gray-900 mb-2">配合項目</h4>
              <div className="flex flex-wrap gap-1">
                {model?.freeServices?.map((item,index) =>
                  <Badge key={`${item?.name}-${index}`} color="dark">{item.name}</Badge>
                )}
              </div>
            </div>
          }

          { isLoggedIn && model?.paidServices?.length > 0 &&
            <div className="mb-6 w-full">
              <h4 className="font-semibold text-gray-900 mb-2">收費服務</h4>
              <div className="flex flex-wrap gap-1">
                {model?.paidServices?.map((item,index) =>
                  <div key={`${item?.name}-${index}`} className="flex flex-row justify-between mb-2">
                    <span>{item.name}</span>
                    <span>{`$ ${item.price}`}</span>
                  </div>
                )}
              </div>
            </div>
          }
          
          { isLoggedIn && model?.packages?.length > 0 &&
            <div className="mb-6 w-full">
              <h4 className="font-semibold text-gray-900 mb-2">套餐</h4>
              <div className="flex flex-wrap gap-1">
                {model?.packages?.map((item,index) =>
                  <div key={`${item?.id}-${index}`} className="flex flex-row justify-between w-full mb-2">
                    <span>{packageNameOf(item)}</span>
                    <span>{`$ ${money(packagePriceOf(item, PLATFORM_COMMISSION))}`}</span>
                  </div>
                )}
              </div>
            </div>
          }

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

          {contactInfo.LINE && (
            <Button
              as="a"
              href={contactInfo.LINE}
              target="_blank"
              rel="noopener noreferrer"
              color="success"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white"
            >
              Line 聯絡
            </Button>
          )}

          <hr className="my-6 w-full border-t border-pink-200" />

          {/* Contact Info Icons */}
          {(contactInfo.INSTAGRAM || contactInfo.LINE || contactInfo.TELEGRAM || contactInfo.FACEBOOK) && (
            <div className="flex gap-4 mb-6">
              {contactInfo.INSTAGRAM && (
                <a href={contactInfo.INSTAGRAM} target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" fill="#E1306C"/>
                    <circle cx="12" cy="12" r="5" fill="#fff"/>
                    <circle cx="17" cy="7" r="1.2" fill="#fff"/>
                  </svg>
                </a>
              )}
              {contactInfo.LINE && (
                <a href={contactInfo.LINE} target="_blank" rel="noopener noreferrer" title="LINE">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" fill="#06C755"/>
                    <path d="M12 7c-3.314 0-6 1.985-6 4.433 0 1.4 1.09 2.636 2.77 3.41l-.29 1.09c-.04.16.12.3.27.23l1.27-.57c.63.12 1.3.19 1.98.19 3.314 0 6-1.985 6-4.433S15.314 7 12 7z" fill="#fff"/>
                  </svg>
                </a>
              )}
              {contactInfo.TELEGRAM && (
                <a href={contactInfo.TELEGRAM} target="_blank" rel="noopener noreferrer" title="Telegram">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#229ED9"/>
                    <path d="M17.5 7.5l-2.2 9.3c-.16.67-.6.83-1.22.52l-3.38-2.5-1.63-.78c-.36-.16-.35-.38.08-.56l6.36-2.47c.28-.12.54.06.42.38z" fill="#fff"/>
                  </svg>
                </a>
              )}
              {contactInfo.FACEBOOK && (
                <a href={contactInfo.FACEBOOK} target="_blank" rel="noopener noreferrer" title="Facebook">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" fill="#1877F3"/>
                    <path d="M15.5 8.5h-2V7.5c0-.41.34-.75.75-.75h1.25V5h-2.25C11.01 5 10 6.01 10 7.25v1.25H8.5v2H10v5h2v-5h1.5l.5-2z" fill="#fff"/>
                  </svg>
                </a>
              )}
            </div>
          )}

          {/* <div className="space-y-3 w-full">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
