import updateDocument from "@/firebase/firestore/updateDocument";

export default async function update(serviceAccount) {
  if(!serviceAccount?.id)
    throw new Error('Service Account ID not available');
  const rs = await updateDocument('/service-accounts', serviceAccount?.id, serviceAccount);
  return rs;
}