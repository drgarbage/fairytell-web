import deleteDocument from "@/firebase/firestore/deleteDocument";

export default function deleteAccount(uid) {
  return deleteDocument('/service-accounts', uid);
}