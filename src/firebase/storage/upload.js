import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import uid from 'tiny-uid';

export default async function upload(path, blobs) {
  const storage = getStorage();
  const results = await Promise.all(blobs.map(async blob => {
    const fid = uid(7);
    const targetPath = `${path}/${fid}`;
    const storageRef = ref(storage, targetPath);
    const snapshot = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    return { blob, snapshot, url };
  }));
  return results;
}