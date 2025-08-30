import addDocument from "@/firebase/firestore/addDocument";
// import redeemInvitationCode from "../auth/redeemInvitationCode";

export default async function createServiceAccount(serviceAccount, options = {}) {
  // todo: handle redeem process in the future.
  // const { user, code } = options;
  // const invitation = await redeemInvitationCode(code, user, 'SERVICE_ACCOUNT', serviceAccount);
  // const doc = await addDocument('/service-accounts', {
  //   ...serviceAccount,
  //   user: user?.uid,
  //   recommender: invitation?.recommender
  // });
  
  // if(user)
  //   await updateDocument('/users', user?.uid, { serviceAccounts: [...user?.serviceAccounts, doc.id]});
  const doc = await addDocument('/service-accounts', serviceAccount);
  
  return doc;
}