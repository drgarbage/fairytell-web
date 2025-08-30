export default {
  id: '',
  alias: '',
  name: '',
  /* deprecated */ phone: '',
  /* deprecated */ desc: '',

  /* deprecated */ city: '',
  /* deprecated */ region: '',
  /* deprecated */ address: '',
  /* deprecated */ visitInstructions: '',
  /* deprecated */ acceptsCooperation: false,
  /* deprecated */ acceptsStaffScheduling: false,

  user: null,             // 對應的真實用戶
  recommender: null,      // 對應的推薦人
  createdAt: 0,

  contactInfo: {
    // LINE: null,
    // TELEGRAM: null,
    // FACEBOOK: null,
  },

  credits: 0,
  notify: {
    message: '',
  }
}