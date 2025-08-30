import { Matcher } from "@/utils/matcher";

export const calculator = (account, basedCommissions, conditions = []) => {
  for(const condition of conditions){
    if(Matcher(account, condition.query)){
      return {
        ...basedCommissions,
        ...condition.applyCommission,
      };
    }
  }
  return basedCommissions;
}