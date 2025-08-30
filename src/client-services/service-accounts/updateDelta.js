import updateDocument from "@/firebase/firestore/updateDocument";

export default function updateDelta(serviceAccountId, changes) {
  if(!serviceAccountId) 
    throw new Error('Service Account ID not available');
  if(!changes || Object.keys(changes).length == 0)
    throw new Error('No changes to update');
  return updateDocument('/service-accounts', serviceAccountId, changes);
}