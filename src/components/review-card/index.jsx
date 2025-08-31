import { Card } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import StarRating from '@/components/star-rating';

function ReviewCard({ review }) {
  return (
    <Card className="border-gray-200">
      <div className="flex items-start space-x-3 p-4">
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
                {review.projectType}
              </Badge>
            </div>
            <div className="text-right">
              <StarRating rating={review.rating} />
              <p className="text-xs text-gray-500 mt-1">{review.date}</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </Card>
  );
}

export default ReviewCard;