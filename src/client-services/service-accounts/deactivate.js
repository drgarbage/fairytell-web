import updateDocument from "@/firebase/firestore/updateDocument";

export default function deactivate(uid) {
  return updateDocument('/service-accounts', uid, {activated: false});
}