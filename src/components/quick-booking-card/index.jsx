import React from "react";
import { Card } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { Badge, Button } from "flowbite-react";
import strings from "@/utils/strings";

// Quick Booking Card Component
function QuickBookingCard({ model, onClick, isLoggedIn }) {
  return (
    <Card
      className="border-pink-200 hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-0">
        <div className="flex items-center space-x-4">
          <Avatar
            img={model.avatar}
            rounded
            size="lg"
            alt={model.profile.name}
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">{model.profile.name}</h4>
              {model.state === 'ONLINE' && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
              {model.isVerified && (
                <Badge color="pink" className="text-xs">認證</Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="icon-[material-symbols--location-on] mr-1"></span>
              {model.placeInfo?.city} • {model.profile?.age}歲 • {strings(model.profile?.nation)}
            </div>
            <p className="text-sm text-pink-600 font-medium">{model.priceRange}</p>
          </div>
        </div>
        {isLoggedIn && (
          <Button
            className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm"
            onClick={e => {
              e.stopPropagation();
              // 這裡可以加入立即預約的邏輯
            }}
          >
            立即預約
          </Button>
        )}
      </div>
    </Card>
  );
}

export default QuickBookingCard;
