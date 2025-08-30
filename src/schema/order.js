export default {
  // id: '',                             // UID(7)
  status: 'REQUESTING',               // REQUESTING | ACCEPTED | COMPLETED | CANCELED | REJECTED
  serviceAccount: '',                 // Service Account ID
  provider: '',                       // Provider User ID
  customer: '',                       // Customer User ID
  broker: '',                         // Broker User ID
  agent: '',                          // Agent User ID
  merchant: '',                       // Merchant Account ID
  createdAt: 0,                       // UTC Timestamp (seconds)
  completedAt: 0,                     // UTC Timestamp (seconds)
  collected: false,                   // Boolean

  reservedPeriod: {
    begin: 0,                         // UTC Timestamp (seconds)
    // end: 0,
    // duration: 0,
  },

  serviceAccountInfo: {},             // Reference Info of Service Account
  providerInfo: {},
  customerInfo: {},                   // Reference Info of Customer
  brokerInfo: {},                     // Reference Info of Dealer
  agentInfo: {},                      // Reference Info of Agent
  merchantInfo: {},                   // Reference Info of Merchant
  locationInfo: {},                   // Reference Info of Location
  paymentInfo: {},                    // 
  commissions: {},
  
  checkoutStatement: '',              // Checkout Statement ID

  total: 0,
  flags: {
    paid: false,                      // 已付款
    collected: false,                 // 已跟小姐取款
    reconciled: false,                // 已產生對帳單
    settled: false,                   // 已完成結算
  },
  tags: [
    // "COLLECTED", 已收款
    // "CLOSED", 已結算
    // "ISSUE", 問題單
  ],
  items: [
    // { name: '【全】短鐘餐', price: 2500, commissions: { 'BROKER': 500, 'MERCHANT': 500 } },
    // { name: '毒龍', price: 500 },
  ],
  
  memo: null,
}