import getDocuments from "@/firebase/firestore/getDocuments";

export default function queryUsers(matches = {}, options = undefined) {
  return getDocuments('/users', matches, options);
}