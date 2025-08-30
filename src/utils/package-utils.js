import { period } from './datetime-utils';
import _ from 'lodash';

export function packageNameOf(pkg) {
  if(!pkg) return '';
  return pkg?.name || `${period(pkg?.duration || 0)}${pkg?.quantity === -1 ? '無限' : ` ${pkg?.quantity} `}次套餐`;
}

export function packagePriceOf (pkg, extraCommissions = {}) {
  if(!pkg) return 0;
  return (pkg?.unitprice || 0) + _.sum(Object.values({...pkg?.commissions, ...extraCommissions}));
}