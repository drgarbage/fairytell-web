import React from "react";
import Image from "next/image";

function PortfolioSection({ model }) {
  const portfolioImages =
    model.medias?.filter((m) => m.type.startsWith("image/")).map((m) => m.url) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {portfolioImages.map((image, idx) => (
        <div key={idx} className="relative group">
          <Image
            src={image}
            alt={`${model.profile.name} 作品 ${idx + 1}`}
            fill={false}
            width={512}
            height={512}
            className="w-full object-cover rounded-lg"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}

export default PortfolioSection;
