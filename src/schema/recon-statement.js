export default {
  // id: '',                          // UID(7)
  merchant: '',                       // Merchant Account ID
  merchantInfo: {},
  status: 'STATEMENT_IN_REVIEW',      // STATEMENT_IN_REVIEW, STATEMENT_COMPLETED, STATEMENT_CANCELED
  createdAt: 0,                       // UTC Timestamp (seconds)
  completedAt: 0,                     // UTC Timestamp (seconds)

  totalRevenue: 0,
  totalCount: 0,
  totalServiceAccountRevenue: 0,
  totalAgentRevenue: 0,
  totalBrokerRevenue: 0,
  totalMerchantRevenue: 0,
  platformRevenue: 0,
  platformCount: 0,

  serviceAccounts: [
    // { info: {}, total: 0, paid: false, referenceFiles: [] },
  ],
  agents: [
    // { info: {}, total: 0, paid: false, referenceFiles: [] },
  ],
  brokers: [
    // { info: {}, total: 0, paid: false, referenceFiles: [] },
  ],
  merchants: [
    // { info: {}, total: 0, paid: false, referenceFiles: [] },
  ],
  orders: [
    // { ...order },
  ]
}