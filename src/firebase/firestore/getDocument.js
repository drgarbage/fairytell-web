import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";

export default async function getDocument(collection, id) {
  const docRef = doc(db, collection, id);
  const snapshot = await getDoc(docRef);
  return snapshot.data();
}