import { Button } from 'flowbite-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

function Carousel({
  medias,
  className = '',
  aspect = 'aspect-square',
  rounded = 'rounded-lg',
  href,
  onClick,
}) {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleScrollEvent = () => {
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setCurrentIndex(newIndex);
  };

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
    style: { 
      padding: 0, 
      border: 'none', 
      background: 'none', 
      cursor: href || onClick ? 'pointer' : 'default' },
  };

  if (!medias || medias.length === 0) {
    return (
      <div
        className={`flex items-center justify-center w-full ${aspect} ${rounded} bg-gray-200 text-gray-500 text-lg font-medium ${className}`}
      >
        暫無媒體
      </div>
    );
  }

  return (
    <Wrapper {...wrapperProps}>
      <div
        ref={scrollContainerRef}
        onScroll={handleScrollEvent}
        className="flex overflow-x-auto scroll-snap-x snap-mandatory"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {medias.map((media, idx) => {
          if (media.type.startsWith('image/')) {
            return (
              <img
                key={idx}
                src={media.url}
                alt={`carousel-img-${idx}`}
                className={`flex-shrink-0 w-full h-auto object-cover ${rounded} snap-center`}
                style={{ width: '100%', height: '100%' }}
              />
            );
          }
          if (media.type.startsWith('video/')) {
            return (
              <video
                key={idx}
                src={media.url}
                className={`flex-shrink-0 w-full h-auto object-cover ${rounded} snap-center`}
                style={{ width: '100%', height: '100%' }}
                autoPlay={idx === currentIndex}
                muted
                loop
                playsInline
                controls={false}
              />
            );
          }
          return null;
        })}
      </div>
      {medias.length > 1 && (
        <>
          <Button
            color="gray"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              handleScroll('left');
            }}
            className="!absolute left-2 top-1/2 -translate-y-1/2 !bg-black/50 hover:!bg-black/70 !text-white !rounded-full !p-1"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            color="gray"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              handleScroll('right');
            }}
            className="!absolute right-2 top-1/2 -translate-y-1/2 !bg-black/50 hover:!bg-black/70 !text-white !rounded-full !p-1"
          >
            <ChevronRight size={20} />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
            {medias.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default Carousel;