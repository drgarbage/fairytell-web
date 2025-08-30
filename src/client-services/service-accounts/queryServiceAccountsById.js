import getDocumentsById from "@/firebase/firestore/getDocumentsById";

export default function queryServiceAccountsById(ids) {
  return getDocumentsById('/service-accounts', ids);
}