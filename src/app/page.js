import { TalentListProvider } from "@/components/service-account-booking/context";
import { PLATFORM_COMMISSION } from "@/schema/globals";
import DrawerView, { DrawerProvider } from "@/components/service-account-booking/drawer";
import FilterView from "@/components/service-account-booking/filters";
import PageClient from "./page.client";
import getDocument from "@/firebase/firestore/getDocument";
import fetchDefaultBroker from "@/client-services/preference/defaultBroker";

const districts = require('@/components/districts/districts.json');

async function fetchPreferences(){
  const [
    {
      countries,
      countryCode,
      cups,
      regions,
      timezone
    },
    {
      i18n: i18nServices,
      services, // array
    },
    {
      i18n: i18nTags,
      tags // [Category: Tag[]]
    }
  ] = await Promise.all([
    getDocument('/preference', 'defaults'),
    getDocument('/preference', 'service-configs'),
    getDocument('/preference', 'tag-configs')
  ]);

  // todo: districts should be load from firestore
  return {
    countries,
    cups,
    districts,
    services: services.map(s => s.name),
    tags,
  }
}

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "GirlHub",
  robots: { index: false }, // 避免被搜尋引擎索引
};

export default async function Page() {
  const preferences = await fetchPreferences();
  const defaultBroker = await fetchDefaultBroker();
  
  return (
    <TalentListProvider
      commissions={{...defaultBroker.commissions, ...PLATFORM_COMMISSION}}
      conditionalCommissions={defaultBroker.conditionalCommissions || []}
      matches={{...defaultBroker.matches, state: 'ONLINE'}} 
      options={defaultBroker.options}
      booking={defaultBroker.booking} 
      pricing={defaultBroker.pricing}
    >
      <DrawerProvider>
        <DrawerView>
          <FilterView 
            countries={preferences.countries}
            districts={preferences.districts}
            tags={preferences.tags}
            cups={preferences.cups}
            services={preferences.services}
            />
        </DrawerView>
        <PageClient preferences={preferences} />
      </DrawerProvider>
    </TalentListProvider>
  );
}
