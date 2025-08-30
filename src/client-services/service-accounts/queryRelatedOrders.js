import getDocuments from "@/firebase/firestore/getDocuments";

export default function queryRelatedOrders(accountId, options = undefined) {
  return getDocuments('/orders', {serviceAccount: accountId}, options);
}