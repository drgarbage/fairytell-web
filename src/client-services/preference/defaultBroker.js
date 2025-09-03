import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default async function() {
  const docRef = doc(db, '/preference/defaults/webs', process.env.DEFAULT_BROKER_DOMAIN);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const shortcutRef = docSnap.get('shortcut');
    if (shortcutRef) {
      const shortcutSnap = await getDoc(shortcutRef);
      if (shortcutSnap.exists()) {
        return shortcutSnap.data();
      }
    }
  }
  return null;
}
