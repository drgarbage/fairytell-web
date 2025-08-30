import upload from "@/firebase/storage/upload";

export default async function(blobs) {
  const results = await upload('/medias', blobs);
  return results.map(({blob, url}) => ({ type: blob.type, url }))
}