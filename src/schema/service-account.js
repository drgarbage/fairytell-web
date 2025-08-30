export default {
    id: '',                             // uid(7)
    avatar: '',                         // photo url
    state: 'OFFLINE',                   // INACTIVE | ONLINE | OFFLINE
    activated: false,
    createdAt: 0,                       // unix timestamp (seconds from 1970)
    profile: {
      name: '', 
      age: 22,                          // fake age, won't change
      // birthday: 0,                   // [deprecated] unix timestamp (seconds from 1970)
      nation: 'tw',
      height: 165,
      weight: 40,
      cup: 'C',                         // A | B | C | D | E | F
    },
    medias: [
      // { type: 'image/png', url: 'https://' },
      // { type: 'video/mp4', url: 'https://' },
    ],
    tags: [],
    packages: [
      // { name: '【全】短鐘餐', price: 2500, commissions: { 'BROKER': 500, 'MERCHANT': 500 } },
      // { name: '【全】超長鐘餐', price: 5000, commissions: { 'BROKER': 500, 'MERCHANT': 500 } },
      // { name: '【全】長鐘餐', price: 3000, commissions: { 'BROKER': 500, 'MERCHANT': 500 } },
      // { name: '【全】快樂餐', price: 2000, commissions: { 'BROKER': 500, 'MERCHANT': 500 } },
    ],
    freeServices: [
      // { name: '無套吹', price: 0 },
      // { name: '按摩', price: 0 },
    ],
    paidServices: [
      // { name: '毒龍', price: 500 },
    ],
    schedules: [
      // { type: 'WEEKLY', begin: 0, end: 0 },
      // { type: 'DATE', begin: 0, end: 0 },
    ],

    agent: '',
    agentInfo: {
      name: 'Robot',
    },
    merchant: '',
    merchantInfo: {},
    city: '',
    region: '',
    address: '',

    user: null,             // 對應的真實用戶
    recommender: null,      // 對應的推薦人
    publishExpiry: 0,       // 刊登效期 unix timestamp (seconds from 1970)
  }