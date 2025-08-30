'use client'
import { useEffect, useState } from "react";
import { useTalentList } from "./context";
import { useDrawer } from "./drawer";
import { Button } from "flowbite-react";
import i18nCountries from "i18n-iso-countries";

const SectionTitle = ({children}) => 
  <span className="flex text-xl text-gray-900">{children}</span>

const SectionOptions = ({
  values,
  hits = {},
  checkSelection = value => false,
  extractKey = value => value,
  onToggle = value => {},
  renderItem = value => value,
  hideEmptyHits = false,
}) => 
  <div className="flex flex-row flex-wrap gap-2">
    {values.filter(v => hideEmptyHits ? hits[v] > 0 : true).map((value, index) =>
      <span 
        className={`cursor-pointer px-2 min-w-8 text-center rounded-full ${checkSelection(value) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white'}`} 
        onClick={() => onToggle(value, index)}
        key={extractKey(value)}>
          {renderItem(value, index)}
        </span>
    )}
  </div>

const Gap = () => <div className="flex h-4" />
const GapGrow = () => <div className="flex min-h-16 flex-grow" />
const EmptyHits = { cities: {}, regions: {}, cups: {}, tags: {}, services: {}, countries: {} };

export default function FilterView({
  countries: allCountries, 
  districts: allDistrics, 
  tags: allTags, 
  cups: allCups, 
  services: allServices,
}) {
  const { 
    keys, toggleKey, clearKeys,
    cities, setCities,
    regions, setRegions,
    cups, setCups,
    tags, setTags,
    services, setServices,
    countries, setCountries,
    accounts,
  } = useTalentList();
  const { setShowDrawer } = useDrawer();
  const [ hits, setHits ] = useState({...EmptyHits});
  const allCities = Object.keys(allDistrics);
  const selectedCities = Object.keys(cities).filter(k => cities[k]);
  i18nCountries.registerLocale(require("@/utils/zh.json"));
  const nationNames = i18nCountries.getNames("zh");

  function onClear(){
    setCities({});
    setRegions({});
    setCups({});
    setTags({});
    setServices({});
    setCountries({});
  };

  useEffect(() => {
    if(!accounts || accounts.length === 0) {
      setHits({...EmptyHits});
      return;
    }

    const nextHits = accounts.reduce((hits, account) => {
      const { tags, freeServices, paidServices } = account;
      const { cup, nation } = account?.profile || {};
      const { city, region } = account?.placeInfo || {};

      tags.forEach(tag => {
        if(!hits.tags[tag])
          hits.tags[tag] = 0;
        hits.tags[tag] += 1
      });

      freeServices.forEach(service => {
        if(!hits.services[service.name])
          hits.services[service.name] = 0;
        hits.services[service.name] += 1;
      });

      paidServices.forEach(service => {
        if(!hits.services[service.name])
          hits.services[service.name] = 0;
        hits.services[service.name] += 1;
      });

      if(!hits.cities[city])
        hits.cities[city] = 0;
      hits.cities[city] += 1;

      if(!hits.regions[region])
        hits.regions[region] = 0;
      hits.regions[region] += 1;

      if(!hits.cups[cup])
        hits.cups[cup] = 0;
      hits.cups[cup] += 1;

      if(!hits.countries[nation])
        hits.countries[nation] = 0;
      hits.countries[nation] += 1;
      
      return hits;
    }, {...EmptyHits});

    setHits(nextHits);
  }, [accounts]);
  
  return (
    <div className="relative flex flex-col pt-8 space-y-4">

      <SectionTitle>縣市</SectionTitle>
      <SectionOptions 
        hideEmptyHits
        values={allCities}
        hits={hits.cities}
        checkSelection={city => cities[city]}
        extractKey={city => city}
        renderItem={city => city}
        onToggle={city => setCities(draft => {
          if(!city in draft)
            draft[city] = false;
          draft[city] = !draft[city];
        })}
      />

      {selectedCities.length > 0 &&
        <SectionTitle>地區</SectionTitle>
      }
      
      {selectedCities.length > 0 &&
        <SectionOptions 
          hideEmptyHits
          values={allDistrics[selectedCities[0]]}
          hits={hits.regions}
          checkSelection={region => regions[region]}
          extractKey={region => region}
          renderItem={region => region}
          onToggle={region => setRegions(draft => {
            if(!region in draft)
              draft[region] = false;
            draft[region] = !draft[region];
          })}
        />
      }

      <Gap />

      <SectionTitle>國籍</SectionTitle>
      <SectionOptions 
        hideEmptyHits
        values={allCountries}
        hits={hits.countries}
        checkSelection={country => countries[country]}
        extractKey={country => country}
        renderItem={country => nationNames[country]}
        onToggle={country => setCountries(draft => {
          if(!country in draft)
            draft[country] = false;
          draft[country] = !draft[country];
        })}
      />

      <Gap />


      <SectionTitle>罩杯</SectionTitle>
      <SectionOptions
        hideEmptyHits
        values={allCups}
        hits={hits.cups}
        checkSelection={cup => cups[cup]}
        extractKey={cup => cup}
        renderItem={cup => cup}
        onToggle={cup => setCups(draft => {
          if(!cup in draft)
            draft[cup] = false;
          draft[cup] = !draft[cup];
        })}
      />

      <Gap />

      <SectionTitle>身材</SectionTitle>
      <SectionOptions 
        hideEmptyHits
        values={allTags["身材類型"]}
        hits={hits.tags}
        checkSelection={tag => tags[tag]}
        extractKey={tag => tag}
        renderItem={tag => tag}
        onToggle={tag => setTags(draft => {
          if(!tag in draft)
            draft[tag] = false;
          draft[tag] = !draft[tag];
        })}
      />

      <Gap />

      <SectionTitle>熱門標籤</SectionTitle>
      <SectionOptions 
        hideEmptyHits
        values={allTags["熱門標籤"]}
        hits={hits.tags}
        checkSelection={tag => tags[tag]}
        extractKey={tag => tag}
        renderItem={tag => tag}
        onToggle={tag => setTags(draft => {
          if(!tag in draft)
            draft[tag] = false;
          draft[tag] = !draft[tag];
        })}
      />

      <Gap />

      <SectionTitle>服務</SectionTitle>
      <SectionOptions
        hideEmptyHits
        values={allServices}
        hits={hits.services}
        checkSelection={service => services[service]}
        extractKey={service => service}
        renderItem={service => service}
        onToggle={service => setServices(draft => {
          if(!service in draft)
            draft[service] = false;
          draft[service] = !draft[service];
        })}
      />

      <GapGrow />

      <Button className="sticky bottom-4" onClick={onClear}>清除設定</Button>
      
    </div>
  );
}