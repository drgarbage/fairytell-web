import { deleteObject, getStorage, ref } from "firebase/storage";

export default function deleteFiles(urls) {
  const storage = getStorage();
  return Promise.all(urls.map(url => {
    const storageRef = ref(storage, url);
    return deleteObject(storageRef);
  }));
}