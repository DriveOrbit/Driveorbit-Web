'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { IconSearch, IconFilter, IconCar, IconTruck } from '@tabler/icons-react';

export default function RealTimeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: 'quarterly',
        });
        
        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');
        
        const colomboCenter = {
          lat: 6.927079,
          lng: 79.861244,
        };
        
        const options: google.maps.MapOptions = {
          center: colomboCenter,
          zoom: 13,
          mapId: 'NEXT_MAPS_Tuts',
          
        };
        
        const map = new Map(mapRef.current as HTMLDivElement, options);
      
        
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };
    
    initializeMap();
  }, []);
  
  return (
    <div className="flex flex-col h-full">
      
      
      <div className="relative flex-grow">
        <div className="absolute inset-0" ref={mapRef}></div>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50">
            <div className="text-white">Loading map...</div>
          </div>
        )}
      </div>
    </div>
  );
}