import { sendEmailVerification as mailVerify } from "firebase/auth";
export default function sendEmailVerification(user) {
  return mailVerify(user);
}