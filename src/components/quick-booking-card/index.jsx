import React from "react";
import { Card } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { Badge, Button } from "flowbite-react";

// Quick Booking Card Component
function QuickBookingCard({ model, onClick, isLoggedIn }) {
  return (
    <Card
      className="border-pink-200 hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar
            img={model.avatar}
            rounded
            size="lg"
            alt={model.name}
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">{model.name}</h4>
              {model.isOnline && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
              {model.isVerified && (
                <Badge color="pink" className="text-xs">認證</Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="icon-[material-symbols--location-on] mr-1"></span>
              {model.location} • {model.age}歲 • {model.nationality}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="icon-[material-symbols--nest-clock-farsight-analog] mr-1"></span>
              回應時間：{model.responseTime}
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
