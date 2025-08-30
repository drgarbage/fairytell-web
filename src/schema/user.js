export default {
  uid: '',                // firebase user id
  displayName: '',        // firebase user display name
  email: '',              // firebase user email
  emailVerified: false,   // firebase user email verified
  phoneNumber: '',        // firebase user phone number
  photoURL: '',           // firebase user photo url

  auth: {
    admin: false,
    recommender: false,   // variable for the recommender
  },

  serviceAccounts: [],
  agentAccounts: [],
  brokerAccounts: [],
  merchantAccounts: [],
  
}