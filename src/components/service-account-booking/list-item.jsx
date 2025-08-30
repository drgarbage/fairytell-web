import { Carousel } from "flowbite-react";
import { packagePriceOf } from "@/utils/package-utils";
import Link from "next/link";
import strings from "@/utils/strings";
import money from "@/utils/money";
import Image from "next/image";

export default function ListItem({
  account, 
  className = '', 
  hrefPattern = '#', 
  hrefBookPattern = '#', 
  commissions = {},
  booking = false,
  pricing = false,
  itemOverlay = null,
}) {
  const { id, avatar, medias } = account;
  const { city, region, address } = account?.placeInfo || {};
  const {
    name, nation,
    age, height, weight, cup,
  } = account?.profile || {};

  const [cheapestPackage] = account?.packages?.sort((a, b) => packagePriceOf(a, commissions) - packagePriceOf(b, commissions)) || [];
  const startingPrice = !!cheapestPackage ? `$${money(packagePriceOf(cheapestPackage, commissions))}+` : null;

  return (
    <div className={`flex flex-col bg-gray-100 ${className}`}>
      <div className="relative flex flex-grow items-center justify-center bg-black">
        { medias.length === 0 &&
          <>
            <div className="absolute w-[120%] h-[120%] aspect-square bg-black z-0 opacity-20" 
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
              }}
            />
            <Image 
              alt="avatar" width={1024} height={1024} 
              className="object-cover z-10" 
              src={avatar || '/images/avatar.webp'} alt={name} 
              />
          </>
        }
        { medias.length > 0 &&
          <Carousel slide={false} className="aspect-square overflow-hidden">
            { medias?.map(
              m => m.type.startsWith('video') ?
              <video key={m.url} className="" controls><source src={m.url + '#t=0.1'} /></video> :
              <Image alt="avatar" width={1024} height={1024} key={m.url} className="" src={m.url || '/images/avatar.webp'} />
            )}
          </Carousel>
        }

        {itemOverlay && itemOverlay(account)}
        
      </div>
      <div className="flex flex-row items-center p-2 gap-2 bg-white z-10">
        <div className="flex flex-col items-center justify-center rounded-full w-14 aspect-square bg-black text-white space-y-1">
          <span className="icon-[material-symbols--location-on] text-xl" />
          <span className="text-xs">{city}</span>
        </div>
        <Link href={hrefPattern.replace('[id]', account.id)} className="flex flex-col flex-grow">
          <span className="space-x-2">
            <span className="text-xl">{name}</span>
            <span className="text-sm text-gray-500">{`${age}歲 . ${height} . ${weight} . ${cup}`}</span>
          </span>
          <span className="text-sm text-gray-400">{[city, region, address].filter(o => !!o).join('.')}</span>
          <span className="text-sm text-gray-500">{`來自${strings(nation.toUpperCase())}`}</span>
        </Link>
        <Link 
          href={booking ? hrefBookPattern.replace('[id]', account.id) : hrefPattern.replace('[id]', account.id)}
          className="flex flex-col items-center justify-center rounded-full w-14 aspect-square text-gray-600 space-y-1">
          <span className="icon-[material-symbols--calendar-month] text-2xl" />
          {pricing && <span className="text-xs">{startingPrice || '預約'}</span>}
        </Link>
      </div>
    </div>
  );
}