import { Card, Badge } from 'flowbite-react';
import Carousel from '../carousel';
import strings from '@/utils/strings';
import { MapPin } from 'lucide-react';
import { packagePriceOf } from '@/utils/package-utils';
import money from '@/utils/money';

function ModelCard({ model, onClick, isLoggedIn, newModel = false, commissions = {} }) {
  // 只取圖片
  const images = model.medias.filter(m => m.type.startsWith('image')).map(m => m.url);
  const medias = model.medias || [];

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
  const nationality = strings(model?.profile?.nation?.toUpperCase());
  const location = model?.placeInfo?.city;

  const [cheapestPackage] = model?.packages?.sort((a, b) => packagePriceOf(a, commissions) - packagePriceOf(b, commissions)) || [];
  const startingPrice = !!cheapestPackage ? `$${money(packagePriceOf(cheapestPackage, commissions))}+` : null;


  return (
    <Card
      renderImage={() => 
        <div className="relative w-full">
          <Carousel medias={medias} className="w-full" rounded="rounded-t-lg" />
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
          <MapPin size={12} className="mr-1" />
          {location} • {model.profile.age}歲 • {nationality}
        </div>

        <p className="text-sm text-pink-600 font-medium mb-3">{startingPrice}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {model.tags?.slice(0, 2).map((service, index) => (
            <Badge key={index} color="pink" className="text-xs border-pink-200 text-pink-700">
              {service}
            </Badge>
          ))}
          {model.tags?.length > 2 && (
            <Badge color="pink" className="text-xs border-pink-200 text-pink-700">
              +{model.tags?.length - 2}
            </Badge>
          )}
        </div>

        {/* <div className="flex flex-wrap gap-1 mb-3">
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
        </div> */}

        {/* <div className="flex items-center justify-between"> */}
          {/* followers 資料結構沒有，這裡預設顯示 0 */}
          {/* <span className="text-sm text-gray-600">{0} 追蹤者</span> */}
          {/* <Badge color="pink" className="text-xs border-pink-300 text-pink-700">
            新星優惠
          </Badge> */}
        {/* </div> */}
      </div>
    </Card>
  );
}

export default ModelCard;