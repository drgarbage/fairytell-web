import getDocument from "@/firebase/firestore/getDocument";

export default function getInvitation(code) {
  return getDocument('/invitations', code);
}