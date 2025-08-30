export const TRANSACTION_TYPES = {
  DEPOSIT: 'DEPOSIT',         // 儲值
  WITHDRAW: 'WITHDRAW',       // 扣點
};

export const REASONS = {
  CONSUME_BY_EXTENDING_PUBLISH_PERIOD: 'CONSUME_BY_EXTENDING_PUBLISH_PERIOD',
  RECHARGE_BY_PURCHASING_PLAN: 'RECHARGE_BY_PURCHASING_PLAN',
  RECHARGE_BY_ADMIN: 'RECHARGE_BY_ADMIN',
};

export default {
  id: '',                       // Firestore document ID
  type: 'DEPOSIT',              // 'DEPOSIT' | 'WITHDRAW'，代表交易方向
  amount: 0,                    // 點數數值（正整數）
  before: 0,                    // 交易前點數餘額
  after: 0,                     // 交易後點數餘額
  reason: 'MANUAL_TOPUP',       // 原因分類：'MANUAL_TOPUP' | 'PUBLISH_EXTENSION' | ...
  serviceAccountId: '',         // 若為扣點用途，對應的帳號 ID，可為 null
  planId: '',                   // 交易時的方案 ID（可為 null）

  createdAt: 0,                 // UNIX timestamp（毫秒）

  /* derived data, not stored */
  merchantId: '',               // 僅查詢時附加（不會存入 Firestore）

  note: '',                     // optional 管理者備註
};
