import getDocuments from "./getDocuments";

export default async function getDocumentsById(path, ids) {
  if(ids.length < 30) 
    return getDocuments(path, { id: ['in', ids]});

  const idGroups = _.chunk(ids, 30);
  const groupedDocs = await Promise.all(idGroups.map(ids => getDocuments(path, { id: ['in', ids]})));
  const docs = _.flatten(groupedDocs);
  return docs;
}