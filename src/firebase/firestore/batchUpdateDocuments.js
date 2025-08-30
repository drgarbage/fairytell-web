import { db } from "../config";
import { doc, writeBatch } from "firebase/firestore";

export default async function batchUpdateDocuments(path, ids, changes) {
  const batch = writeBatch(db);
  ids.forEach((id) => {
    const documentRef = doc(db, path, id);
    batch.update(documentRef, changes);
  });
  await batch.commit();
  return ids;
}