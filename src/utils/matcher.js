/**
 * 通用 JSON 條件比對工具
 *
 * @param {Object} object - 任意結構的 JSON 物件
 * @param {Object} queryOptions - 欲比對的條件物件，每個欄位對應一個條件或巢狀條件
 *
 * 支援的運算符：
 * - ['==', value]
 * - ['!=', value]
 * - ['>', value]
 * - ['<', value]
 * - ['>=', value]
 * - ['<=', value]
 * - ['in', 'A,B,C']
 * - ['not-in', 'A,B,C']
 *
 * 支援巢狀物件比對，例如：
 * queryOptions = {
 *   name: ['==', '小美'],
 *   activated: ['==', true],
 *   profile: {
 *     weight: ['>', 50],
 *     height: ['<', 170],
 *     nation: ['in', 'MY,TW']
 *   }
 * }
 *
 * 回傳：
 * - true：符合所有條件
 * - false：有任一條件不符
 */
export const Matcher = (object, queryOptions) => {
  /**
   * 基本比較邏輯
   * @param {*} value - 目標值
   * @param {Array} condition - 比對條件，如 ['==', 123]
   */
  const compare = (value, [operator, expected]) => {
    const normalizeList = (str) =>
      typeof str === 'string'
        ? str.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

    switch (operator) {
      case '==':
        return value === expected;
      case '!=':
        return value !== expected;
      case '>':
        return value > expected;
      case '<':
        return value < expected;
      case '>=':
        return value >= expected;
      case '<=':
        return value <= expected;
      case 'in': {
        const list = normalizeList(expected);
        return list.includes(value);
      }
      case 'not-in': {
        const list = normalizeList(expected);
        return !list.includes(value);
      }
      default:
        return false;
    }
  };

  /**
   * 遞迴處理比對邏輯，支援巢狀結構
   * @param {Object} obj - 當前物件（可為巢狀）
   * @param {Object} query - 對應的查詢條件
   */
  const matchRecursive = (obj, query) => {
    return Object.entries(query).every(([key, condition]) => {
      const val = obj?.[key];

      if (Array.isArray(condition) && typeof condition[0] === 'string') {
        // 單一欄位的基本比對條件
        return compare(val, condition);
      } else if (typeof condition === 'object' && condition !== null) {
        // 巢狀物件條件
        return typeof val === 'object' && matchRecursive(val, condition);
      }

      return false;
    });
  };

  return matchRecursive(object, queryOptions);
};
