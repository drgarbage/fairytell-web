import updateDocument from "@/firebase/firestore/updateDocument";

export default function online(uid) {
  return updateDocument('/service-accounts', uid, {state: 'ONLINE'});
}