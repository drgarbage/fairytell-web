import getDocuments from "@/firebase/firestore/getDocuments";

export default function queryInvitationCodes(matches = undefined, options = undefined) {
  return getDocuments('/invitations', matches, options);
} 