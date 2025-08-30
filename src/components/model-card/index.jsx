import { Card, Badge, Carousel } from 'flowbite-react';

function NewModelCard({ model, onClick, isLoggedIn, newModel = false }) {
  // 只取圖片
  const images = model.medias.filter(m => m.type.startsWith('image')).map(m => m.url);

  // 取服務名稱
  const services = [
    ...(model.freeServices || []),
    ...(model.paidServices || []),
  ].map(s => s.name);

  // 價格區間
  const prices = (model.packages || []).map(p => p.price);
  const priceRange = prices.length
    ? `${Math.min(...prices)} ~ ${Math.max(...prices)}`
    : '無價格';

  // 加入日期
  const joinedDate = model.createdAt
    ? new Date(model.createdAt * 1000).toLocaleDateString()
    : '';

  // 國籍
  const nationMap = { tw: '台灣', jp: '日本', kr: '韓國' }; // 可自行擴充
  const nationality = nationMap[model.profile.nation] || model.profile.nation;

  // 位置
  const location = `${model.city || ''}${model.region || ''}`;

  return (
    <Card
      className="border-pink-200 hover:shadow-lg transition-shadow cursor-pointer group relative"
      renderImage={() =>
        <div className="relative aspect-square">
          <Carousel
            className="w-full h-full object-cover rounded-t-lg"
            slide={false}
          >
            {images.length > 0 ? images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`model-${idx}`}
                className="w-full h-full object-cover rounded-t-lg"
              />
            )) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-t-lg text-gray-400">
                無圖片
              </div>
            )}
          </Carousel>

          {newModel && (
            <Badge color="pink" className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              新進模特兒
            </Badge>
          )}
        </div>
      }
      onClick={onClick}
    >
      
      <div className="p-0">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900">{model.profile.name}</h4>
          <Badge color="success" className="text-xs border-green-300 text-green-700">
            {joinedDate}
          </Badge>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="icon-[material-symbols--location-on] mr-1"></span>
          {location} • {model.profile.age}歲 • {nationality}
        </div>

        <p className="text-sm text-pink-600 font-medium mb-3">{priceRange}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {services.slice(0, 2).map((service, index) => (
            <Badge key={index} color="pink" className="text-xs border-pink-200 text-pink-700">
              {service}
            </Badge>
          ))}
          {services.length > 2 && (
            <Badge color="pink" className="text-xs border-pink-200 text-pink-700">
              +{services.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* followers 資料結構沒有，這裡預設顯示 0 */}
          <span className="text-sm text-gray-600">{0} 追蹤者</span>
          <Badge color="pink" className="text-xs border-pink-300 text-pink-700">
            新星優惠
          </Badge>
        </div>
      </div>
    </Card>
  );
}

export default NewModelCard;