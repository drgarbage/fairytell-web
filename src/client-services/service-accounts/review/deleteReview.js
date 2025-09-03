import getDocument from "@/firebase/firestore/getDocument";
import deleteDocument from "@/firebase/firestore/deleteDocument";

export default async function deleteReview({ user, serviceAccountId, reviewId }) {
  
  if (!user) {
    throw new Error("權限不足，請先登入");
  }

  const review = await getDocument(`/service-accounts/${serviceAccountId}/reviews`, reviewId);
  if (!review) {
    throw new Error("指定的評論不存在");
  }

  if (review.userId !== user.uid) {
    throw new Error("您只能刪除自己的評論");
  }

  await deleteDocument(`/service-accounts/${serviceAccountId}/reviews`, reviewId);
}