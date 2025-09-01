import React, { useState } from "react";
import { Button, Checkbox, Drawer, Label, RangeSlider, Badge } from "flowbite-react";
import { SlidersHorizontal } from "react-icons/sl";

// 假設這些選項已經定義
const locationOptions = ["台北", "新北", "台中", "高雄"];
const shootingTypeOptions = ["寫真", "商業", "婚紗"];
const nationalityOptions = ["台灣", "日本", "韓國"];
const serviceOptions = ["外拍", "棚拍"];
const featureOptions = ["高挑", "甜美", "運動"];

function FloatingFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    locations: [],
    shootingTypes: [],
    ageRange: [18, 40],
    nationalities: [],
    services: [],
    features: [],
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const countActiveFilters = (f) =>
    f.locations.length +
    f.shootingTypes.length +
    f.nationalities.length +
    f.services.length +
    f.features.length +
    (f.ageRange[0] !== 18 || f.ageRange[1] !== 40 ? 1 : 0);

  const activeFiltersCount = countActiveFilters(filters);

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange && onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const cleared = {
      locations: [],
      shootingTypes: [],
      ageRange: [18, 40],
      nationalities: [],
      services: [],
      features: [],
    };
    setFilters(cleared);
    onFilterChange && onFilterChange(cleared);
  };

  const toggleFilter = (category, value) => {
    if (category === "ageRange") return;
    const current = filters[category];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [category]: newValues });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Button
          color="pink"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal size={20} />
          過濾器
          {activeFiltersCount > 0 && (
            <Badge color="failure" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          position="right"
          className="w-full max-w-md"
        >
          <Drawer.Header title="進階篩選" />
          <Drawer.Items>
            <div className="space-y-6 pb-6">
              {activeFiltersCount > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    已套用 {activeFiltersCount} 個篩選條件
                  </span>
                  <Button color="light" size="xs" onClick={clearAllFilters}>
                    清除全部
                  </Button>
                </div>
              )}

              {/* 地區 */}
              <div>
                <Label value="地區" className="font-medium mb-3" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {locationOptions.map((location) => (
                    <div key={location} className="flex items-center gap-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.locations.includes(location)}
                        onChange={() => toggleFilter("locations", location)}
                      />
                      <Label htmlFor={`location-${location}`}>{location}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 拍攝類型 */}
              <div>
                <Label value="拍攝類型" className="font-medium mb-3" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {shootingTypeOptions.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.shootingTypes.includes(type)}
                        onChange={() => toggleFilter("shootingTypes", type)}
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 年齡範圍 */}
              <div>
                <Label value="年齡範圍" className="font-medium mb-3" />
                <div className="px-3 mt-2">
                  <RangeSlider
                    min={18}
                    max={40}
                    value={filters.ageRange[0]}
                    onChange={(e) =>
                      updateFilters({
                        ageRange: [Number(e.target.value), filters.ageRange[1]],
                      })
                    }
                  />
                  <RangeSlider
                    min={18}
                    max={40}
                    value={filters.ageRange[1]}
                    onChange={(e) =>
                      updateFilters({
                        ageRange: [filters.ageRange[0], Number(e.target.value)],
                      })
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{filters.ageRange[0]} 歲</span>
                    <span>{filters.ageRange[1]} 歲</span>
                  </div>
                </div>
              </div>

              {/* 國籍 */}
              <div>
                <Label value="國籍" className="font-medium mb-3" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {nationalityOptions.map((nationality) => (
                    <div key={nationality} className="flex items-center gap-2">
                      <Checkbox
                        id={`nationality-${nationality}`}
                        checked={filters.nationalities.includes(nationality)}
                        onChange={() => toggleFilter("nationalities", nationality)}
                      />
                      <Label htmlFor={`nationality-${nationality}`}>{nationality}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 服務類型 */}
              <div>
                <Label value="服務類型" className="font-medium mb-3" />
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center gap-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={filters.services.includes(service)}
                        onChange={() => toggleFilter("services", service)}
                      />
                      <Label htmlFor={`service-${service}`}>{service}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 特色 */}
              <div>
                <Label value="特色" className="font-medium mb-3" />
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {featureOptions.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={filters.features.includes(feature)}
                        onChange={() => toggleFilter("features", feature)}
                      />
                      <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </div>
    </div>
  );
}

export default FloatingFilter;