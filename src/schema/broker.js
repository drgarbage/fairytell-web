import contact from "./contact";

export default {
  id: '',
  alias: '',
  name: '',
  avatar: '',
  phone: '',
  desc: '',
  bankName: '',           // 银行名称
  bankCode: '',           // 银行代码
  bankAccountNumber: '',  // 银行账号

  user: null,             // 對應的真實用戶
  recommender: null,      // 對應的推薦人

  contactInfo: {
    // LINE: null,
    // TELEGRAM: null,
    // FACEBOOK: null,
  }
}