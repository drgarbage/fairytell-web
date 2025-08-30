import getDocument from "@/firebase/firestore/getDocument";

export default function getUser(uid) {
  return getDocument('/users', uid);
}