const nationNames = require('./zh.json');
const lang = {
  // Service Account
  "ONLINE": "線上",
  "OFFLINE": "離線",
  "INACTIVE": "未啟用",
  "ACTIVE": "已啟用",

  // 刊登狀態
  "PUBLISHED": "刊登中",
  "UNPUBLISHED": "未刊登",

  // Order
  "REQUESTING" : "訂單確認中",
  "ACCEPTED" : "訂單已接受",
  "REJECTED" : "訂單已拒絕",
  "COMPLETED" : "訂單已完成",
  "CANCELED" : "作廢",

  // STATEMENT
  "STATEMENT_IN_REVIEW" : "帳單處理中",
  "STATEMENT_COMPLETED" : "帳單已完成",
  "STATEMENT_CANCELED" : "帳單已作廢",

  // ALL
  "NEW" : "新建立",

  // Auth Errors
  "LOGIN_FAILED" : "登入失敗",
  "REGISTER_FAILED" : "註冊失敗",
  "auth/invalid-credential" : "無效的憑證",
  "auth/email-already-in-use": "此電子郵件信箱已被使用",

  ...nationNames?.countries,
}

export default function strings(key, defaultValue = '') {
  return lang?.[key] || defaultValue;
}