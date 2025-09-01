import { auth } from '@/firebase/auth';
import { signOut as fbSignOut } from 'firebase/auth';

export default function signOut() {
  return fbSignOut(auth);
}