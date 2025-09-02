import axios from 'axios';
import districts from '@/components/districts/districts.json';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // 替換為您的 API 金鑰

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('瀏覽器不支援地理定位'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
      );
    }
  });
}

export async function getCityFromCurrentLocation() {
  try {
    const { latitude, longitude } = await getCurrentPosition();

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    );

    const results = response.data.results;
    if (results.length === 0) {
      throw new Error('無法取得地址資訊');
    }

    const addressComponents = results[0].address_components;
    const cityComponent = addressComponents.find((component) =>
      component.types.includes('administrative_area_level_1') ||
      component.types.includes('locality')
    );

    if (!cityComponent) {
      throw new Error('無法解析縣市名稱');
    }

    const cityName = cityComponent.long_name;

    const matchedCity = Object.keys(districts).find((key) => cityName.includes(key));
    if (!matchedCity) {
      throw new Error(`縣市 "${cityName}" 不在資料中`);
    }

    return matchedCity;
  } catch (error) {
    console.error('Error fetching city from current location:', error);
    throw error;
  }
}