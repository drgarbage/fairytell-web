import { timestamp } from "@/utils/datetime-utils";
import getInvitation from "./getInvitation";
import updateDocument from "@/firebase/firestore/updateDocument";
import getUser from "./getUser";

export default async function redeemInvitationCode(code, user, accountType, accountInfo) {
  const invitation = await getInvitation(code);
  const now = timestamp();

  if (invitation.expiredAfter < now) 
    throw new Error('邀請碼已過期');

  if (invitation.activatedAt > 0) 
    throw new Error('邀請碼已被使用');

  const changes = {
    user: user.uid,
    userInfo: {
      displayName: user.displayName,
      photoURL: user.photoURL,
    },
    accountType,
    accountInfo,
    activatedAt: now,
  };

  await updateDocument('/invitations', code, changes);
  return {...invitation, ...changes};
}