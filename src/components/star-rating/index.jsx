import { Rating, RatingStar } from 'flowbite-react';

function StarRating(props) {
  const { rating, onChange = () => {}, size = 24 } = props;
  return (
    <div className="flex items-center">
      <Rating>
        {[1, 2, 3, 4, 5].map((star) => (
          <RatingStar
            key={star}
            filled={star <= rating}
            className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
            onClick={() => onChange(star)}
            style={{ width: size, height: size }}
          />
        ))}
      </Rating>
    </div>
  );
}

export default StarRating;