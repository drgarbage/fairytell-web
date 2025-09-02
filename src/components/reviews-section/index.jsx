import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import ReviewCard from "@/components/review-card";
import StarRating from "@/components/star-rating";
import { Button, Textarea, Label } from "flowbite-react";

function ReviewsSection({ reviews, rating = 0, reviewCount = 0 }) {
  const [showAll, setShowAll] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newContent, setNewContent] = useState("");
  const [allReviews, setAllReviews] = useState(reviews);

  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 3);

  const handleAddReview = () => {
    if (!newContent.trim() || newRating === 0) return;
    const newReview = {
      id: Date.now(),
      rating: newRating,
      content: newContent,
      // 可根據需求增加其他欄位
    };
    setAllReviews([newReview, ...allReviews]);
    setNewRating(0);
    setNewContent("");
    setShowAll(true);
  };

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
      {allReviews.length > 0 ? (
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {!showAll && allReviews.length > 3 && (
            <Button
              color="light"
              className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
              onClick={() => setShowAll(true)}
            >
              查看所有評價
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
          <p>目前還沒有客戶評價</p>
          <p className="text-sm">成為第一位評價的攝影師！</p>
        </div>
      )}

      {/* 新增評價介面 */}
      <div className="mt-8 border-t pt-6">
        <h5 className="font-semibold mb-2">新增評價</h5>
        <div className="flex items-center mb-2">
          <StarRating
            size={32}
            rating={newRating}
            onChange={setNewRating}
            editable
          />
        </div>
        <Textarea
          className="mb-2"
          rows={3}
          placeholder="請輸入您的評價"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <Button
          color="pink"
          className="w-full"
          onClick={handleAddReview}
          disabled={newRating === 0 || !newContent.trim()}
        >
          新增
        </Button>
      </div>
    </>
  );
}

export default ReviewsSection;
