import {auth} from "@/firebase/auth";
import addDocument from "@/firebase/firestore/addDocument";

export default async function createReview({ user, serviceAccountId, reviewData }) {
  if (!user) {
    throw new Error("權限不足，請先登入");
  }

  const data = {
    ...reviewData,
    userId: user.uid,
    userName: user.displayName,
    userAvatar: user.photoUrl,
    createdAt: new Date(),
  };

  const rs = await addDocument(`/service-accounts/${serviceAccountId}/reviews`, data);
  data.id = rs.id;
  return data;
}