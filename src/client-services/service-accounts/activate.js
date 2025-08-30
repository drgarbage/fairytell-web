import updateDocument from "@/firebase/firestore/updateDocument";

export default function activate(uid) {
  return updateDocument('/service-accounts', uid, {activated: true});
}