import React, { useState } from "react";
import Image from "next/image";

function PortfolioSection({ model }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const medias = model.medias || [];

  const handleOpenModal = (media) => {
    setModalContent(media);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medias.map((media, idx) => (
          <div key={idx} className="relative group cursor-pointer">
            {media.type.startsWith("image/") ? (
              <div onClick={() => handleOpenModal(media)}>
                <Image
                  src={media.url}
                  alt={`${model.profile.name} 作品 ${idx + 1}`}
                  width={512}
                  height={512}
                  className="w-full object-cover rounded-lg"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : media.type.startsWith("video/") ? (
              <div
                className="relative"
                onClick={() => handleOpenModal(media)}
                style={{ width: "100%", height: "100%" }}
              >
                <video
                  src={media.url}
                  width={512}
                  height={512}
                  className="w-full object-cover rounded-lg"
                  style={{ objectFit: "cover" }}
                  poster=""
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="bg-black bg-opacity-50 rounded-full p-3 text-white"
                    aria-label="播放影片"
                  >
                    ▶
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg p-4 pt-8 relative max-w-3xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-4 text-gray-700 text-2xl"
              onClick={handleCloseModal}
              aria-label="關閉"
            >
              ×
            </button>
            {modalContent?.type.startsWith("image/") ? (
              <Image
                src={modalContent.url}
                alt="放大圖片"
                width={800}
                height={800}
                className="max-h-[80vh] w-auto object-contain rounded"
                style={{ objectFit: "contain" }}
              />
            ) : modalContent?.type.startsWith("video/") ? (
              <video
                src={modalContent.url}
                controls
                autoPlay
                className="max-h-[80vh] w-auto object-contain rounded"
                style={{ objectFit: "contain" }}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default PortfolioSection;
