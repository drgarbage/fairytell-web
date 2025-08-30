import { db } from "../config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { timestamp } from "@/utils/datetime-utils";

export default async function addDocument(path, data) {
  const createdAt = timestamp();
  const collectionRef = collection(db, path);
  const { id } = await addDoc(collectionRef, {...data, createdAt});
  const rs = await updateDoc(doc(db, path, id), { id });
  return { id };
}