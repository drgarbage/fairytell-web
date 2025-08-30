import { db } from "../config";
import { doc, setDoc } from "firebase/firestore";

export default async function setDocument(path, id, data) {
  const docRef = doc(db, path, id);
  await setDoc(docRef, data);
  return data;
}