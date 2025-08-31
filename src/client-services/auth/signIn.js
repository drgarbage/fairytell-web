import { auth } from '@/firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}