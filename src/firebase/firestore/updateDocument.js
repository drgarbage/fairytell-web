import { db } from "../config";
import { updateDoc, doc } from "firebase/firestore";

export default async function updateDocument(path, id, data) {
  const docRef = doc(db, path, id);
  await updateDoc(docRef, data);
  return data;
}