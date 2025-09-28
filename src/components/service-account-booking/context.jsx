'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { logError } from "@/utils/log";
import { Icons, useMessage } from "@/hooks/useMessage";
import { calculator } from "@/utils/broker-commission-calculator";
import queryServiceAccounts from "@/client-services/service-accounts/queryServiceAccounts";
import { getCityFromCurrentLocation } from "@/utils/gps";

function genIndex(account) {
  const indexingKeys = [
    // account?.id,
    account?.profile?.name,
    account?.profile?.age,
    account?.profile?.weight,
    account?.profile?.height,
    account?.profile?.cup,
    account?.agentInfo?.alias,
    account?.agentInfo?.name,
    account?.merchantInfo?.alias,
    account?.merchantInfo?.name,
    account?.merchantInfo?.city,
    account?.merchantInfo?.region,
    account?.merchantInfo?.address,
  ];
  if(account?.profile)
    indexingKeys.push(Object.keys(account.profile).map(key => `${key.toUpperCase()}=${account.profile[key]}`));
  if(account?.tags)
    indexingKeys.push(...account.tags);
  if(account?.state)
    indexingKeys.push(account.state);
  if(account?.activated)
    indexingKeys.push(account.activated ? 'ACTIVE' : 'INACTIVE');
  if(account?.freeServices)
    indexingKeys.push(...account.freeServices.map(s=>s.name));
  if(account?.paidServices)
    indexingKeys.push(...account.paidServices.map(s=>s.name));

  return indexingKeys.filter(v => v !== undefined).join();
}

function ranking(index, query, keys){
  if(!query && keys.length === 0) return 1;

  const max = index.length;
  const rankingValues = keys.map(key => {
    const idx = index.indexOf(key);
    if(idx < 0) return 0;
    return max - idx;
  });
  return rankingValues.reduce((a,b) => a+b, 0);
}

export const TalentListContext = createContext({});
export const useTalentList = () => {
  const context = useContext(TalentListContext);
  if(!context)
    throw new Error('BookingContext not found');
  return context;
}
export const TalentListProvider = ({ 
  children, matches, options, commissions = {}, 
  conditionalCommissions = [],
  booking = false, pricing = false,
  itemOverlay = null,
}) => {
  const {loading, setLoading, alertStatic} = useMessage();
  const [query, setQuery] = useState('');
  const [keys, setKeys] = useImmer({});
  const [cities, setCities] = useImmer({});
  const [regions, setRegions] = useImmer({});
  const [cups, setCups] = useImmer({});
  const [tags, setTags] = useImmer({});
  const [services, setServices] = useImmer({});
  const [countries, setCountries] = useImmer({});

  const [currentCity, setCurrentCity] = useState(null);

  const citiesKeys = Object.keys(cities).filter(k => cities[k]);
  const regionsKeys = Object.keys(regions).filter(k => regions[k]);
  const cupsKeys = Object.keys(cups).filter(k => cups[k]);
  const tagsKeys = Object.keys(tags).filter(k => tags[k]);
  const servicesKeys = Object.keys(services).filter(k => services[k]);
  const countriesKeys = Object.keys(countries).filter(k => countries[k]);
  const activeFiltersCount = citiesKeys.length + regionsKeys.length + cupsKeys.length + tagsKeys.length + servicesKeys.length + countriesKeys.length;

  const [accounts, setAccounts] = useState([]);
  const filteredAccounts = accounts
    .filter(o => {
      if (!o?.publishExpiry) return false;
      const expiryDate = typeof o.publishExpiry.toDate === 'function'
        ? o.publishExpiry.toDate()
        : new Date(o.publishExpiry);
      return expiryDate > new Date();
    })
    .filter(o => countriesKeys.length === 0 ? true : countriesKeys.includes(o?.profile?.nation))
    .filter(o => cupsKeys.length === 0 ? true : cupsKeys.includes(o?.profile?.cup))
    .filter(o => tagsKeys.length === 0 ? true : tagsKeys.some(tag => o?.tags?.includes(tag)))
    .filter(o => servicesKeys.length === 0 ? true: [...o.paidServices, ...o.freeServices].some(s => servicesKeys.includes(s.name)))
    .filter(o => citiesKeys.length === 0 ? true : citiesKeys.includes(o?.placeInfo?.city))
    .filter(o => regionsKeys.length === 0 ? true : regionsKeys.includes(o?.placeInfo?.region))
    .map(a => ({ ...a, index: genIndex(a).indexOf(query) }))
    .filter(o => o.index >= 0)
    .sort((a,b) => a.index - b.index);

  const latestAccounts = [...accounts].sort((a,b) => b.createdAt - a.createdAt).slice(0, 3);
  const nearbyAccounts = [...accounts].filter(a => a?.placeInfo?.city === currentCity)?.slice(0,6);

  const toggleKey = (key) => {
    setKeys(draft => {
      if(!key in draft)
        draft[key] = false;
      draft[key] = !draft[key];
    });
  };

  const clearKeys = (keys) => {
    setKeys(draft => {
      keys.forEach(k => draft[k] = false);
    });
  }

  const clearAllKeys = () => {
    setKeys({});
  }

  // @special rule: custom pricing according to conditions
  const commissionsByAccount = (account) => {
    return calculator(account, commissions, conditionalCommissions);
  }

  useEffect(() => {
    setLoading(true);
    queryServiceAccounts(matches, options)
      .then(setAccounts)
      .catch(err => {
        logError(err);
        alertStatic({
          icon: Icons.ERROR,
          color: Icons.ERROR,
          message: '載入時發生錯誤，請稍後重試。',
          debugMessage: err.message
        });
      })
      .finally(() => setLoading(false));
    getCityFromCurrentLocation()
      .then(setCurrentCity)
      .catch(err => {
        logError(err);
      });
    return () => setLoading(false);
  }, []);
      
  return (
    <TalentListContext.Provider value={{
      loading,
      currentCity, setCurrentCity,
      query, setQuery,
      keys, toggleKey, clearKeys, clearAllKeys,
      cities, setCities,
      regions, setRegions,
      cups, setCups,
      tags, setTags,
      services, setServices,
      countries, setCountries,
      accounts, setAccounts,
      // commissions,
      commissionsByAccount,
      filteredAccounts,
      latestAccounts,
      nearbyAccounts,
      booking,
      pricing,
      activeFiltersCount,
      // additional tools
      itemOverlay,
    }}>
      {children}
    </TalentListContext.Provider>
  );
}