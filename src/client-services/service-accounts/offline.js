import updateDocument from "@/firebase/firestore/updateDocument";

export default function offline(uid) {
  return updateDocument('/service-accounts', uid, {state: 'OFFLINE'});
}