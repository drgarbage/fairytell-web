import React from "react";
import getServiceAccount from "@/client-services/service-accounts/serviceAccount";
import PageClient from "./page.client";
import getDocuments from "@/firebase/firestore/getDocuments";
import fetchDefaultBroker from "@/client-services/preference/defaultBroker";
import getDocument from "@/firebase/firestore/getDocument";

async function fetchData(uid) {
  const [serviceAccount, postsRaw, reviewsRaw] = await Promise.all([
    getServiceAccount(uid).then(({ createdAt, publishExpiry, ...rest }) => rest),
    getDocuments(`/service-accounts/${uid}/posts`, {}),
    getDocuments(`/service-accounts/${uid}/reviews`, {})
  ]);

  // 將 posts/reviews 的 createdAt (Firebase Timestamp) 轉為 Date 物件
  const posts = postsRaw.map(post => ({
    ...post,
    createdAt: post.createdAt && typeof post.createdAt.toDate === 'function'
      ? post.createdAt.toDate()
      : post.createdAt
  }));

  const reviews = reviewsRaw.map(review => ({
    ...review,
    createdAt: review.createdAt && typeof review.createdAt.toDate === 'function'
      ? review.createdAt.toDate()
      : review.createdAt
  }));

  return { serviceAccount, posts, reviews };
}

async function ProfilePage({ params }) {
  const { uid } = await params;
  const { serviceAccount, posts, reviews } = await fetchData(uid);
  const defaultBroker = await fetchDefaultBroker();
  defaultBroker.brokerInfo = await getDocument(`/brokers`, defaultBroker.broker);
  return (
    <PageClient defaultBroker={defaultBroker} model={serviceAccount} posts={posts} reviews={reviews} />
  );
}

export default ProfilePage;