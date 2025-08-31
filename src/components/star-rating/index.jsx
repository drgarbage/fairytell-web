import { Rating, RatingStar } from 'flowbite-react';

function StarRating(props) {
  const { rating } = props;
  return (
    <div className="flex items-center">
      <Rating>
        {[1, 2, 3, 4, 5].map((star) => (
          <RatingStar
            key={star}
            filled={star <= rating}
            className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
          />
        ))}
      </Rating>
    </div>
  );
}

export default StarRating;