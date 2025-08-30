export default {
  duration: 0,        // 預約歷時 (seconds)
  quantity: 0,        // 服務次數
  unitprice: 0,       // 美女帳號收到的金額
  price: 0,           // 顧客支付的價格 = unitprice + sum(commissions)
  commissions: {
    "BROKER": 0,      // 幹部疊價
    "AGENT": 0,       // 經紀疊價
    "MERCHANT": 0,    // 商戶疊價
    "PLATFORM": 0     // 平台疊價
  }
}