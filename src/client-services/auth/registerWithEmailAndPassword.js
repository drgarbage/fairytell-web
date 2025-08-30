import { auth } from '@/firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { timestamp } from '@/utils/datetime-utils';
import setDocument from '@/firebase/firestore/setDocument';
import USER from '@/schema/user';

export default async function registerWithEmailAndPassword(email, password, profile) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;
  const data =  {
    ...USER, 
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    ...profile,

    createdAt: timestamp(),
  };
  await updateProfile(credential.user, profile);
  await setDocument('users', user.uid, data);
  return user;
}