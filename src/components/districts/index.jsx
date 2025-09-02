const districts = require('./districts.json');
const cities = Object.keys(districts);
const defaultCity = cities[0];
const defaultRegion = districts[cities[0]][0];

export default function Districts({
  defaultValue = { city: defaultCity, region: defaultRegion }, 
  className, 
  onChange = ({city, region})=> {}
}) {
  const { city, region } = defaultValue;
  const regions = districts[city] || [];

  function onCityChanged(e) {
    const cityValue = e.target.value;
    const regionValue = districts[cityValue][0];
    onChange({city: cityValue, region: regionValue})
  }

  function onRegionChanged(e) {
    const regionValue = e.target.value;
    onChange({city, region: regionValue})
  }

  return (
    <div className={`flex flex-row ${className || '/images/avatar.webp'}`}>
      <select 
        className='border-none bg-transparent'
        value={city}
        onChange={onCityChanged}>
        {cities.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
      <select 
        className='border-none bg-transparent'
        value={region}
        onChange={onRegionChanged}>
        {regions.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  );
}