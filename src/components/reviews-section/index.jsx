import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button, Textarea, Label } from "flowbite-react";
import { useUser } from "@/hooks/useUser";
import ReviewCard from "@/components/review-card";
import StarRating from "@/components/star-rating";
import createReview from "@/client-services/service-accounts/review/createReview";
import updateReview from "@/client-services/service-accounts/review/updateReview";
import deleteReview from "@/client-services/service-accounts/review/deleteReview";

function ReviewsSection({ reviews, serviceAccountId }) {
  const { user, isLoggedIn } = useUser();
  const [showAll, setShowAll] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newContent, setNewContent] = useState("");
  const [allReviews, setAllReviews] = useState(reviews);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [editingRating, setEditingRating] = useState(0);

  const reviewCount = allReviews.length;
  const rating = reviewCount > 0 ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1) : 0;

  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 3);

  const handleAddReview = async () => {
    if (!newContent.trim() || newRating === 0) return;
    const reviewData = { rating: newRating, comment: newContent };
    try {
      const newReview = await createReview({ user, serviceAccountId, reviewData });
      setAllReviews([newReview, ...allReviews]);
      setNewRating(0);
      setNewContent("");
      setShowAll(true);
    } catch (error) {
      console.error("新增評價失敗：", error);
    }
  };

  const handleEditReview = (reviewId) => {
    const review = allReviews.find((r) => r.id === reviewId);
    setEditingReviewId(reviewId);
    setEditingContent(review.comment);
    setEditingRating(review.rating);
  };

  const handleSaveEdit = async () => {
    const reviewData = { rating: editingRating, comment: editingContent };
    try {
      await updateReview({ user, serviceAccountId, reviewId: editingReviewId, reviewData });
      setAllReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === editingReviewId
            ? { ...review, comment: editingContent, rating: editingRating }
            : review
        )
      );
      setEditingReviewId(null);
      setEditingContent("");
      setEditingRating(0);
    } catch (error) {
      console.error("更新評價失敗：", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview({ user, serviceAccountId, reviewId });
      setAllReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("刪除評價失敗：", error);
    }
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
            <div key={review.id}>
              {editingReviewId === review.id ? (
                <div className="mb-4">
                  <StarRating
                    size={32}
                    rating={editingRating}
                    onChange={setEditingRating}
                    editable
                  />
                  <Textarea
                    className="mb-2"
                    rows={3}
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button color="pink" onClick={handleSaveEdit}>
                      儲存
                    </Button>
                    <Button color="light" onClick={() => setEditingReviewId(null)}>
                      取消
                    </Button>
                  </div>
                </div>
              ) : (
                <ReviewCard 
                  review={review} 
                  editable={review?.userId === user?.uid} 
                  onEdit={() => handleEditReview(review.id)}
                  onDelete={() => handleDeleteReview(review.id)}
                />
              )}
            </div>
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
      {isLoggedIn && (
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
      )}
    </>
  );
}

export default ReviewsSection;
