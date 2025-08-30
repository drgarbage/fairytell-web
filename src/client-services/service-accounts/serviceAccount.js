import getDocument from "@/firebase/firestore/getDocument";

export default function serviceAccount(serviceAccountId) {
  return getDocument('/service-accounts', serviceAccountId);
}