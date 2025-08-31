import { Card } from 'flowbite-react';
import { Button, Badge } from 'flowbite-react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ThumbsUp, MessageSquare, Share2, Calendar, MapPin } from 'lucide-react';

function PostCard({ post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Card 
      className="mb-6"
      renderImage={() => 
        
        <div className="relative">
          <img
            src={post.images[currentImageIndex]}
            alt="Post image"
            className="w-full aspect-video object-cover rounded-t-lg"
          />
          {post.images.length > 1 && (
            <>
              <Button
                color="gray"
                size="xs"
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length)
                }
                className="!absolute left-2 top-1/2 -translate-y-1/2 !bg-black/50 hover:!bg-black/70 !text-white !rounded-full !p-1"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                color="gray"
                size="xs"
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev + 1) % post.images.length)
                }
                className="!absolute right-2 top-1/2 -translate-y-1/2 !bg-black/50 hover:!bg-black/70 !text-white !rounded-full !p-1"
              >
                <ChevronRight size={20} />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {post.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

      }>

      {/* Post Content */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Button color="light" size="xs" className="!text-gray-600 hover:!text-pink-600">
              <ThumbsUp size={16} className="mr-1" />
              {post.likes}
            </Button>
            <Button color="light" size="xs" className="!text-gray-600 hover:!text-pink-600">
              <MessageSquare size={16} className="mr-1" />
              {post.comments}
            </Button>
            <Button color="light" size="xs" className="!text-gray-600 hover:!text-pink-600">
              <Share2 size={16} />
            </Button>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {post.date}
          </div>
        </div>

        <p className="text-gray-800 mb-3 leading-relaxed">{post.caption}</p>

        {post.location && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={14} className="mr-1" />
            {post.location}
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag, index) => (
            <Badge key={index} color="pink" className="!text-xs !border-pink-200 !text-pink-700">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default PostCard;