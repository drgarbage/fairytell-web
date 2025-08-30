import { timestamp } from "@/utils/datetime-utils";
import INVITATION from "@/schema/invitation";
import setDocument from "@/firebase/firestore/setDocument";
import uid from "tiny-uid";

export default async function createInvitationCode(recommenderId, expiredAfterSeconds = 172800) {
  if(!recommenderId) 
    throw new Error('Recommender Account Incorrect.');
  
  const code = uid(6, true).toUpperCase();
  const data = {
    ...INVITATION,
    id: code,
    code,
    recommender: recommenderId,
    activatedAt: -1,
    createdAt: timestamp(),
    expiredAfter: timestamp() + expiredAfterSeconds,
  };
  await setDocument('/invitations', code, data);
  return data;
}