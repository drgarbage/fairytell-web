import { useState } from 'react';
import { Button } from 'flowbite-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Carousel({
  images,
  className = '',
  aspect = 'aspect-video',
  rounded = 'rounded-lg',
  href,
  onClick,
}) {
  const [current, setCurrent] = useState(0);

  const Wrapper = href
    ? 'a'
    : onClick
    ? 'button'
    : 'div';

  const wrapperProps = {
    className: `relative w-full ${aspect} ${rounded} overflow-hidden ${className}`,
    ...(href ? { href } : {}),
    ...(onClick ? { onClick } : {}),
    ...(Wrapper === 'button' ? { type: 'button' } : {}),
    style: { padding: 0, border: 'none', background: 'none', cursor: href || onClick ? 'pointer' : 'default' },
  };

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center w-full ${aspect} ${rounded} bg-gray-200 text-gray-500 text-lg font-medium ${className}`}
      >
        暫無圖片
      </div>
    );
  }

  return (
    <Wrapper {...wrapperProps}>
      <img
        src={images[current]}
        alt={`carousel-img-${current}`}
        className={`w-full h-full object-cover ${rounded}`}
        onClick={e => e.stopPropagation()}
        style={{ display: 'block' }}
      />
      {images.length > 1 && (
        <>
          <Button
            color="gray"
            size="xs"
            onClick={e => {
              e.stopPropagation();
              setCurrent((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="!absolute left-2 top-1/2 -translate-y-1/2 !bg-black/50 hover:!bg-black/70 !text-white !rounded-full !p-1"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            color="gray"
            size="xs"
            onClick={e => {
              e.stopPropagation();
              setCurrent((prev) => (prev + 1) % images.length);
            }}
            className="!absolute right-2 top-1/2 -translate-y-1/2 !bg-black/50 hover:!bg-black/70 !text-white !rounded-full !p-1"
          >
            <ChevronRight size={20} />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={e => {
                  e.stopPropagation();
                  setCurrent(idx);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === current ? 'bg-white' : 'bg-white/50'
                }`}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default Carousel;