import React from "react";
import { MessageCircle } from "lucide-react";
import ReviewCard from "@/components/review-card";
import StarRating from "@/components/star-rating";

function ReviewsSection({ reviews, rating = 0, reviewCount = 0 }) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-gray-900">客戶評價</h4>
        <div className="flex items-center space-x-2">
          <StarRating rating={rating} />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-500">({reviewCount} 評價)</span>
        </div>
      </div>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle
            size={48}
            className="mx-auto mb-4 text-gray-300"
          />
          <p>目前還沒有客戶評價</p>
          <p className="text-sm">成為第一位評價的攝影師！</p>
        </div>
      )}
    </>
  );
}

export default ReviewsSection;
