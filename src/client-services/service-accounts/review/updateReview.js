import getDocument from "@/firebase/firestore/getDocument";
import updateDocument from "@/firebase/firestore/updateDocument";

export default async function updateReview({ user, serviceAccountId, reviewId, reviewData }) {
  
  if (!user) {
    throw new Error("權限不足，請先登入");
  }

  const review = await getDocument(`/service-accounts/${serviceAccountId}/reviews`, reviewId);
  
  if (!review) {
    throw new Error("指定的評論不存在");
  }

  if (review.userId !== user.uid) {
    throw new Error("您只能更新自己的評論");
  }

  const { createdAt, userId, userName, userAvatar, ...data } = reviewData;

  await updateDocument(`/service-accounts/${serviceAccountId}/reviews`, reviewId, data);

  return {
    ...review,
    ...data,
  };
}
