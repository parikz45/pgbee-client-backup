'use client';

import React from 'react';
import { useFilters } from '@/contexts/FilterContext';

const ActiveFilters = () => {
  const { filters, updateFilter, clearAllFilters, getActiveFiltersCount, isMounted } = useFilters();
  
  const activeFiltersCount = getActiveFiltersCount();

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted || activeFiltersCount === 0) {
    return null;
  }

  const getFilterChips = () => {
    const chips = [];

    if (filters.gender !== 'Any') {
      chips.push({
        key: 'gender',
        label: `Gender: ${filters.gender}`,
        onRemove: () => updateFilter('gender', 'Any')
      });
    }

    if (filters.placeType !== 'Any') {
      chips.push({
        key: 'placeType',
        label: `Type: ${filters.placeType}`,
        onRemove: () => updateFilter('placeType', 'Any')
      });
    }

    if (filters.minPrice !== 1000 || filters.maxPrice !== 15000) {
      chips.push({
        key: 'price',
        label: `Price: ₹${filters.minPrice.toLocaleString()} - ₹${filters.maxPrice.toLocaleString()}`,
        onRemove: () => updateFilter('minPrice', 1000) || updateFilter('maxPrice', 15000)
      });
    }

    if (filters.rooms !== 'Any') {
      chips.push({
        key: 'rooms',
        label: `Rooms: ${filters.rooms}`,
        onRemove: () => updateFilter('rooms', 'Any')
      });
    }

    if (filters.bathrooms !== 'Any') {
      chips.push({
        key: 'bathrooms',
        label: `Bathrooms: ${filters.bathrooms}`,
        onRemove: () => updateFilter('bathrooms', 'Any')
      });
    }

    filters.selectedAmenities.forEach(amenity => {
      chips.push({
        key: `amenity-${amenity}`,
        label: amenity,
        onRemove: () => updateFilter('selectedAmenities', 
          filters.selectedAmenities.filter(a => a !== amenity)
        )
      });
    });

    return chips;
  };

  const filterChips = getFilterChips();

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Active Filters ({activeFiltersCount})
        </span>
        <button
          onClick={clearAllFilters}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterChips.map(chip => (
          <div key={chip.key} className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
            <span>{chip.label}</span>
            <button
              onClick={chip.onRemove}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
