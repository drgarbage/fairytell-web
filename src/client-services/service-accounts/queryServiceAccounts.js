import getDocuments from "@/firebase/firestore/getDocuments";

export default function queryServiceAccounts(matches = {}, options = undefined) {
  return getDocuments('/service-accounts', matches, options);
}