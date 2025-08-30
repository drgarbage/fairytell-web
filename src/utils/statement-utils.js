import { DateTime } from "luxon";

export function statementNameOf(statement) {
  const createdDate = DateTime.fromSeconds(statement?.createdAt || 0);
  return `${statement?.merchantInfo?.name}  ${createdDate.toFormat('MM/dd')} 對帳單`;
}