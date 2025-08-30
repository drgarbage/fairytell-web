import { TalentListProvider } from "./context";
import FilterView from "./filters";
import ListView from "./list";
import DrawerView, { DrawerProvider } from "./drawer";
import Toolbar from "./toolbar";
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

export default async function BookingUI({
  hrefPattern,
  hrefBookPattern,
  commissions = {},
  conditionalCommissions = [],
  matches = {},
  options = {},
  booking = false,
  pricing = false,
  itemOverlay = null,
}){
  const preferences = await fetchPreferences();

  return (
    <TalentListProvider 
      commissions={commissions}
      conditionalCommissions={conditionalCommissions}
      matches={matches} options={options}
      booking={booking} pricing={pricing}
      itemOverlay={itemOverlay}
      >
      <DrawerProvider>
        <div className="relative flex flex-col bg-gray-200">
          <div className="p-4 sticky top-12 z-20">
            <Toolbar />
          </div>
          <DrawerView>
            <FilterView 
              countries={preferences.countries}
              districts={preferences.districts}
              tags={preferences.tags}
              cups={preferences.cups}
              services={preferences.services}
              />
          </DrawerView>
          <ListView 
            hrefPattern={hrefPattern}
            hrefBookPattern={hrefBookPattern}
            />
        </div>
      </DrawerProvider>
    </TalentListProvider>
  );
}