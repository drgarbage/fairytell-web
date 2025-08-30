import { format } from "date-fns";
import { Duration } from "luxon";

// 顯示日期用
export function date(unix_timestamp, fmt = 'MM/dd') {
  return format(new Date(unix_timestamp * 1000), fmt);
}

// 顯示時間用
export function time(unix_timestamp, fmt = 'HH:mm') {
  return format(new Date(unix_timestamp * 1000), fmt);
}

export function period(seconds) {
  if(seconds % 3600 > 0) {
    return Duration.fromObject({minutes: Math.floor(seconds / 60)}).toHuman({listStyle: 'narrow', locale: 'zh-TW'}).replace(' ', '');
  }
  // 计算小时、分钟和剩余秒数
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const config = { days, hours, minutes, seconds: remainingSeconds };

  for(let key in config)
    if(config[key] === 0)
      delete config[key];

  // 使用 Luxon 的 Duration 来创建一个包含小时、分钟和秒的对象
  let duration = Duration.fromObject(config);
  
  // 格式化输出，例如：'1 小時 1 分鐘'
  return duration.toHuman({listStyle: 'narrow', locale: 'zh-TW'}).replace(' ', '');
}

// 將日期物件換算為 unix timestamp (seconds from 1970)
export function timestamp(date = new Date()) {
  return parseInt((date?.getTime() || 0) / 1000);
}

export const withBaseHour = (baseHour) => (date) => {
  date.setHours(baseHour, 0, 0, 0);
  return date;
}