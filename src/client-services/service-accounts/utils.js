export function status(serviceAccount) {
  return false == serviceAccount?.activated ?
    "INACTIVE" : serviceAccount?.state;
}

export function publishStatus(serviceAccount) {
  const expiry = serviceAccount?.publishExpiry;
  if (!expiry || typeof expiry.toDate !== 'function') {
    return "UNPUBLISHED";
  }
  return expiry.toDate() > new Date() ? "PUBLISHED" : "UNPUBLISHED";
}