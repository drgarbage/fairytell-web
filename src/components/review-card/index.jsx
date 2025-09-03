import { Card } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import StarRating from '@/components/star-rating';

function ReviewCard({ review, editable, onEdit, onDelete }) {
  return (
    <Card className="border-gray-200">
      <div className="flex items-start space-x-3">
        <Avatar img={review.userAvatar} rounded size="md">
          {!review.userAvatar && (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-700">
              {review.userName[0]}
            </div>
          )}
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h5 className="font-medium text-gray-900">{review.userName}</h5>
              <Badge color="info" className="text-xs mt-1">
                VIP 用戶
              </Badge>
            </div>
            <div className="text-right">
              <StarRating rating={review.rating} />
              <p className="text-xs text-gray-500 mt-1">{review.date}</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
          {editable && (
            <div className="flex space-x-2 mt-3">
              <button
                className="text-blue-500 text-sm hover:underline"
                onClick={onEdit}
              >
                編輯
              </button>
              <button
                className="text-red-500 text-sm hover:underline"
                onClick={onDelete}
              >
                刪除
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ReviewCard;