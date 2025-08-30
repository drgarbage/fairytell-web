import { db } from "../config";
import {
  collection,
  getDocs,
  where,
  orderBy,
  query,
  limit,
  startAt,
  endAt,
} from "firebase/firestore";

/**
 * 通用 Firestore 查詢工具（支援 not-in 字串形式）
 *
 * @param {string} path - Firestore collection 路徑
 * @param {object} matches - 查詢條件，例如 { status: ['not-in', 'A,B,C'] }
 * @param {object} options - 其他查詢選項，例如 { limit, orderBy, startAt, endAt }
 * @returns {Array} 回傳陣列 [{ id, ...docData }]
 */
export default async function getDocuments(path, matches, options = {}) {
  const ref = collection(db, path);
  const queryArgs = [];

  const notInConditions = [];
  const effectiveLimit = options.limit ?? 10000;

  // 處理 matches 條件
  for (let attr in matches) {
    const value = matches[attr];

    if (Array.isArray(value) && typeof value[0] === 'string') {
      const [operator, operand] = value;

      // 特殊處理：not-in with comma-separated string
      if (operator === 'not-in' && typeof operand === 'string') {
        const values = operand.split(',').map(s => s.trim()).filter(Boolean);
        if (values.length <= 10) {
          queryArgs.push(where(attr, 'not-in', values));
        } else {
          notInConditions.push({ attr, excludeList: values });
        }
      }

      // 一般比對運算符
      else {
        queryArgs.push(where(attr, operator, operand));
        queryArgs.push(orderBy(attr, 'asc'));
      }

    } else if (typeof value === 'function') {
      queryArgs.push(where(attr, ...value()));
    } else if (typeof value === 'object' && value !== null) {
      queryArgs.push(value);
    } else if (value !== undefined && value !== null) {
      queryArgs.push(where(attr, '==', value));
      queryArgs.push(orderBy(attr, 'asc'));
    }
  }

  // 排序與分頁
  if (options.orderBy) {
    queryArgs.push(orderBy(options.orderBy[0], options.orderBy[1] || 'desc'));
  } else {
    queryArgs.push(orderBy('createdAt', 'desc'));
  }

  if (effectiveLimit) queryArgs.push(limit(effectiveLimit));
  if (options.startAt) queryArgs.push(startAt(options.startAt));
  if (options.endAt) queryArgs.push(endAt(options.endAt));

  // 查詢執行
  const q = query(ref, ...queryArgs);
  const snapshot = await getDocs(q);

  let output = [];
  snapshot.forEach((doc) => {
    output.push({ id: doc.id, ...doc.data() });
  });

  // 手動過濾 not-in 超過限制的條件
  for (const { attr, excludeList } of notInConditions) {
    output = output.filter(doc => !excludeList.includes(doc[attr]));
  }

  // 提醒：是否打到限制
  if (output.length === effectiveLimit) {
    console.warn(
      `getDocuments: Query on "${path}" returned exactly ${effectiveLimit} documents. There may be more data not retrieved.`
    );
  }

  return output;
}
