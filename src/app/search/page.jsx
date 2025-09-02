import { TalentListProvider } from "@/components/service-account-booking/context";
import DrawerView, { DrawerProvider } from "@/components/service-account-booking/drawer";
import FilterView from "@/components/service-account-booking/filters";
import PageClient from "./page.client";
import getDocument from "@/firebase/firestore/getDocument";
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

export default async function Page() {
  const preferences = await fetchPreferences();
  return (
    <TalentListProvider
      // commissions={commissions}
      // conditionalCommissions={conditionalCommissions}
      // matches={matches} options={options}
      // booking={booking} pricing={pricing}
      // itemOverlay={itemOverlay}
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
