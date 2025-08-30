'use client'
import { Spinner } from "flowbite-react";
import { useTalentList } from "./context";
import ListItem from "./list-item";

export default function ListView({ hrefPattern, hrefBookPattern }){
  const { 
    loading, filteredAccounts, 
    booking, pricing,
    // commissions, 
    commissionsByAccount,
    itemOverlay,
  } = useTalentList();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:p-4">
      {!loading && filteredAccounts.length === 0 &&
        <div className="flex flex-row md:col-span-2 items-center justify-center">
          無符合條件的用戶
        </div>
      }
      {filteredAccounts.map(account => 
        <ListItem 
          className="md:rounded-xl overflow-clip" 
          commissions={commissionsByAccount(account)}
          key={account.id} 
          account={account}
          hrefPattern={hrefPattern} 
          hrefBookPattern={hrefBookPattern}
          booking={booking}
          pricing={pricing}
          itemOverlay={itemOverlay}
          />
      )}
    </div>
  );
}