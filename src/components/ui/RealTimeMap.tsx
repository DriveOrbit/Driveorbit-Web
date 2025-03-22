'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { IconSearch, IconFilter, IconCar } from '@tabler/icons-react';
import mockData from '@/lib/types/vehicledata';

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

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: 'quarterly',
        });

        const { Map, InfoWindow } = await loader.importLibrary('maps');

        const colomboCenter = mockData.COLOMBO_CENTER;

        const options: google.maps.MapOptions = {
          center: colomboCenter,
          zoom: 13,
          mapId: 'NEXT_MAPS_Tuts',
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '' || /^[a-zA-Z0-9]+$/.test(query)) {
      const filtered = vehicles.filter(vehicle =>
        vehicle.id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVehicles(filtered);
    } else {
      alert('Invalid input. Please enter a valid vehicle number.');
      setFilteredVehicles([]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vehicles..."
            className="pl-8 pr-4 py-1 rounded-md bg-neutral-700 text-white text-sm w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
        </div>
      </div>

      <div className="relative flex-grow">
        <div className="absolute inset-0" ref={mapRef}></div>
        {!isLoaded && <div className="absolute inset-0 flex items-center justify-center text-white">Loading map...</div>}
      </div>
    </div>
  );
}
