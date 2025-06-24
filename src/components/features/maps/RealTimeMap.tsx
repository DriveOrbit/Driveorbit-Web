'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { IconSearch, IconFilter, IconCar, IconX } from '@tabler/icons-react';
import mockData from '@/features/maps/types/vehicledata';

// Updated vehicle interface to match the latest modifications
interface VehicleData {
  id: string;
  status: 'active' | 'warning' | 'error';
  time?: string;
  driver: string;
  location?: string;
  position: {
    lat: number;
    lng: number;
  };
  fuelConsumption?: string;
  condition?: string;
  emergency?: string;
  isDriving?: boolean;
}

export default function RealTimeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [vehicles, setVehicles] = useState<VehicleData[]>(mockData.FIXED_VEHICLES);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleData[]>(mockData.FIXED_VEHICLES);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Check if API key exists
        if (!process.env.NEXT_PUBLIC_MAPS_API_KEY) {
          console.error('Google Maps API key is not configured');
          return;
        }

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: 'quarterly',
          libraries: ['maps', 'places'], // Added places library for future features
        });

        const { Map, InfoWindow } = await loader.importLibrary('maps');

        const colomboCenter = mockData.COLOMBO_CENTER; const options: google.maps.MapOptions = {
          center: colomboCenter,
          zoom: 13,
          mapId: 'NEXT_MAPS_Tuts',
          // Security and performance enhancements
          gestureHandling: 'cooperative',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          // Restrict map bounds to Sri Lanka for better performance
          restriction: {
            latLngBounds: {
              north: 10.0,
              south: 5.5,
              west: 79.0,
              east: 82.0,
            },
          },
        };

        const newMap = new Map(mapRef.current as HTMLDivElement, options);
        setMap(newMap);
        setInfoWindow(new InfoWindow({ disableAutoPan: true }));
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (isLoaded && map && filteredVehicles.length > 0 && infoWindow) {
      updateMarkers(filteredVehicles);
    }
  }, [filteredVehicles, isLoaded, map, infoWindow]);

  const updateMarkers = (vehiclesToUpdate: VehicleData[]) => {
    const { Marker } = google.maps;

    vehiclesToUpdate.forEach(vehicle => {
      if (markersRef.current[vehicle.id]) {
        markersRef.current[vehicle.id].setPosition(vehicle.position);
        markersRef.current[vehicle.id].setIcon(createCarSvgIcon(vehicle.status));
      } else {
        const marker = new Marker({
          position: vehicle.position,
          map: map,
          title: vehicle.id,
          icon: createCarSvgIcon(vehicle.status),
        });

        marker.addListener('mouseover', () => {
          if (infoWindow) {
            infoWindow.setContent(createInfoWindowContent(vehicle));
            infoWindow.open(map, marker);
          }
        });

        marker.addListener('mouseout', () => {
          if (infoWindow) {
            infoWindow.close();
          }
        });

        markersRef.current[vehicle.id] = marker;
      }
    });

    Object.keys(markersRef.current).forEach(id => {
      if (!vehiclesToUpdate.find(v => v.id === id)) {
        markersRef.current[id].setMap(null);
        delete markersRef.current[id];
      }
    });
  };

  const createCarSvgIcon = (status: string) => {
    const carPath =
      'M23.5,11.6c-0.1-0.3-0.3-0.6-0.5-0.8l-2.2-2.5c-0.6-0.7-1.5-1.2-2.5-1.2h-12c-1,0-1.9,0.4-2.5,1.2L1.9,10.8c-0.2,0.2-0.4,0.5-0.5,0.8C0.5,12.3,0,13.3,0,14.5v4c0,0.8,0.7,1.5,1.5,1.5h1c0.8,0,1.5-0.7,1.5-1.5v-1h16v1c0,0.8,0.7,1.5,1.5,1.5h1c0.8,0,1.5-0.7,1.5-1.5v-4C24,13.3,23.5,12.3,23.5,11.6z';

    let fillColor = '#10B981';
    if (status === 'warning') fillColor = '#F59E0B';
    if (status === 'error') fillColor = '#EF4444';

    return {
      path: carPath,
      fillColor,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 1,
      scale: 1,
      anchor: new google.maps.Point(12, 12),
    };
  };

  const createInfoWindowContent = (vehicle: VehicleData) => {
    return `
      <div class="p-2 bg-neutral-800 text-white rounded-lg">
        <h3 class="font-bold">${vehicle.id}</h3>
        <p><strong>Driver:</strong> ${vehicle.driver || 'N/A'}</p>
        <p><strong>Location:</strong> ${vehicle.location || 'Unknown'}</p>
        <p><strong>Condition:</strong> ${vehicle.condition || 'Unknown'}</p>
      </div>
    `;
  };

  const validateVehicleNumber = (input: string): boolean => {
    // Common Sri Lankan vehicle number patterns: 
    // Like ABC-1234, AB-1234, CAB-1234, 30-1234, etc.
    const regex = /^[a-zA-Z0-9-]*$/;
    return regex.test(input);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setSearchQuery(query);

    // Validate input
    const isValid = validateVehicleNumber(query);
    setIsValidInput(isValid);

    if (!isValid) {
      // If invalid, don't update filtered vehicles
      return;
    }

    // Filter vehicles and generate suggestions
    if (query === '') {
      setFilteredVehicles(vehicles);
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      // For suggestions, we use a more relaxed matching to help users
      const matchingVehicles = vehicles.filter(vehicle =>
        vehicle.id.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredVehicles(matchingVehicles);

      // Generate suggestions based on current vehicles
      const suggestedIds = matchingVehicles
        .map(v => v.id)
        .slice(0, 5); // Limit to 5 suggestions

      setSuggestions(suggestedIds);
      setShowSuggestions(suggestedIds.length > 0);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setFilteredVehicles(vehicles.filter(v => v.id === suggestion));
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredVehicles(vehicles);
    setIsValidInput(true);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const focusOnVehicle = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle && map && markersRef.current[vehicleId]) {
      map.panTo(vehicle.position);
      map.setZoom(15);

      if (infoWindow) {
        infoWindow.setContent(createInfoWindowContent(vehicle));
        infoWindow.open(map, markersRef.current[vehicleId]);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vehicles by number..."
            className={`pl-8 pr-10 py-2 rounded-md bg-neutral-700 text-white text-sm w-64 focus:outline-none focus:ring-1 ${isValidInput ? 'focus:ring-green-500' : 'focus:ring-red-500 border border-red-500'
              }`}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
          />
          <IconSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />

          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white p-1 rounded-full"
            >
              <IconX className="w-4 h-4" />
            </button>
          )}

          {!isValidInput && (
            <p className="absolute text-red-500 text-xs mt-1">Please enter a valid vehicle number</p>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 mt-1 w-64 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-neutral-700 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <IconCar className="mr-2 text-green-500 w-4 h-4" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredVehicles.length === 0 && searchQuery && isValidInput && (
          <div className="text-amber-400 text-sm ml-2">
            No vehicles matching "{searchQuery}"
          </div>
        )}
      </div>

      {filteredVehicles.length > 0 && searchQuery && (
        <div className="mb-4 p-2 bg-neutral-800 rounded-md">
          <p className="text-white text-sm mb-2">Found {filteredVehicles.length} vehicle(s):</p>
          <div className="flex flex-wrap gap-2">
            {filteredVehicles.slice(0, 5).map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => focusOnVehicle(vehicle.id)}
                className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md text-white text-xs flex items-center"
              >
                <IconCar className="mr-1 w-3 h-3" />
                {vehicle.id}
              </button>
            ))}
            {filteredVehicles.length > 5 && (
              <span className="text-neutral-400 text-xs flex items-center">
                +{filteredVehicles.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="relative flex-grow">
        <div className="absolute inset-0" ref={mapRef}></div>
        {!isLoaded && <div className="absolute inset-0 flex items-center justify-center text-white">Loading map...</div>}
      </div>
    </div>
  );
}