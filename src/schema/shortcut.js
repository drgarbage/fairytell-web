import { book } from "@/client-services/orders";

export const Shortcut = {
  id: null,
  name: '',
  url: '',
}

export const BCM = { // Broker Custom Menu
  id: null,
  name: null,
  url: '',
  type: 'bcm',
  broker: null,
  brokerInfo: null,
  customer: null,
  customerInfo: { name: '' },
  commissions: {},
  pricing: false,
  booking: false,

  // new feature
  titls: 'Girls of the day',
  conditionalCommissions: [],
}

export const Conditions = {
  // 符合條件者，加入特定的價格規則
  // 狀況一：國籍符合 ["TW", "HK", "MO"] 抽佣改為 $1200
  query: null, // { profile: { nation: ['in', 'MY,TW'] } }
  applyCommission: { "BROKER": 0 }
}