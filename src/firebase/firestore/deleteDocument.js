import { db } from "../config";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deleteDocument(path, id) {
  const docRef = doc(db, path, id);
  return await deleteDoc(docRef);
}