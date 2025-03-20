'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { IconSearch, IconFilter, IconCar, IconTruck, IconGasStation, IconAlertTriangle } from '@tabler/icons-react';

// Extended vehicle interface
interface VehicleData {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'warning' | 'error';
  driver?: string;
  fuelConsumption?: string;
  condition?: string;
  emergency?: string;
  location?: string;
}

export default function RealTimeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: 'quarterly',
        });
        
        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');
        const { InfoWindow } = await loader.importLibrary('maps');
        
        const colomboCenter = {
          lat: 6.927079,
          lng: 79.861244,
        };
        
        const options: google.maps.MapOptions = {
          center: colomboCenter,
          zoom: 13,
          mapId: 'NEXT_MAPS_Tuts',
          styles: [
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#ffffff"}]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": [{"color": "#000000"}, {"lightness": 13}]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#000000"}]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [{"color": "#144b53"}, {"lightness": 14}, {"weight": 1.4}]
            },
            {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [{"color": "#08304b"}]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [{"color": "#0c4152"}, {"lightness": 5}]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#000000"}]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [{"color": "#0b434f"}, {"lightness": 25}]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#000000"}]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry.stroke",
              "stylers": [{"color": "#0b3d51"}, {"lightness": 16}]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [{"color": "#000000"}]
            },
            {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [{"color": "#146474"}]
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": [{"color": "#021019"}]
            }
          ]
        };
        
        const newMap = new Map(mapRef.current as HTMLDivElement, options);
        setMap(newMap);
        
        // Create an info window for hover popups
        const newInfoWindow = new InfoWindow({
          disableAutoPan: true
        });
        setInfoWindow(newInfoWindow);
        
        // Enhanced vehicle data with more information
        const vehicles: VehicleData[] = [
          { 
            id: 'KY 7766', 
            position: { lat: 6.927079, lng: 79.861244 }, 
            status: 'active',
            driver: 'Michael Smith',
            fuelConsumption: '8.3 L/100km',
            condition: 'Excellent'
          },
          { 
            id: 'PN 8719', 
            position: { lat: 6.917079, lng: 79.871244 }, 
            status: 'active',
            driver: 'Sarah Johnson',
            fuelConsumption: '9.1 L/100km',
            condition: 'Good'
          },
          { 
            id: 'DL 6389', 
            position: { lat: 6.937079, lng: 79.851244 }, 
            status: 'error',
            driver: 'David Lee',
            fuelConsumption: '12.7 L/100km',
            condition: 'Needs Maintenance',
            emergency: 'Engine overheating'
          },
          { 
            id: 'VB 4285', 
            position: { lat: 6.927079, lng: 79.881244 }, 
            status: 'warning',
            driver: 'Emma Wilson',
            fuelConsumption: '10.5 L/100km',
            condition: 'Check Required',
            emergency: 'Low fuel'
          },
          { 
            id: 'CR 8565', 
            position: { lat: 6.907079, lng: 79.861244 }, 
            status: 'active',
            driver: 'James Brown',
            fuelConsumption: '7.8 L/100km',
            condition: 'Excellent'
          },
        ];
        
        // Create SVG car icons for different status types
        const createCarSvgIcon = (status: string) => {
          // Improved car SVG path - more detailed and recognizable car shape
          const carPath = "M23.5,11.6c-0.1-0.3-0.3-0.6-0.5-0.8l-2.2-2.5c-0.6-0.7-1.5-1.2-2.5-1.2h-12c-1,0-1.9,0.4-2.5,1.2L1.9,10.8c-0.2,0.2-0.4,0.5-0.5,0.8C0.5,12.3,0,13.3,0,14.5v4c0,0.8,0.7,1.5,1.5,1.5h1c0.8,0,1.5-0.7,1.5-1.5v-1h16v1c0,0.8,0.7,1.5,1.5,1.5h1c0.8,0,1.5-0.7,1.5-1.5v-4C24,13.3,23.5,12.3,23.5,11.6z M6.5,17C5.1,17,4,15.9,4,14.5S5.1,12,6.5,12S9,13.1,9,14.5S7.9,17,6.5,17z M17.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S18.9,17,17.5,17z M3,10l2-3h14l2,3H3z";

          // Set colors based on vehicle status
          let fillColor = '#10B981'; // Green for active
          if (status === 'warning') fillColor = '#F59E0B'; // Yellow for warning
          if (status === 'error') fillColor = '#EF4444'; // Red for error

          return {
            path: carPath,
            fillColor: fillColor,
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 1,
            scale: 1,
            anchor: new google.maps.Point(12, 12),
          };
        };
        
        // Function to create popup content
        const createInfoWindowContent = (vehicle: VehicleData) => {
          const emergencySection = vehicle.emergency ? 
            `<div class="flex items-center mt-2 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="font-medium">${vehicle.emergency}</span>
            </div>` : '';
            
          return `
            <div class="bg-neutral-800 text-white rounded-lg shadow-lg p-3 min-w-[200px]">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-lg">${vehicle.id}</h3>
                <div class="flex items-center">
                  <span class="w-2 h-2 rounded-full ${
                    vehicle.status === 'active' ? 'bg-green-500' :
                    vehicle.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  } mr-1"></span>
                  <span class="text-xs uppercase">${vehicle.status}</span>
                </div>
              </div>
              
              <div class="border-t border-neutral-700 pt-2">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-neutral-400">Driver:</span>
                  <span>${vehicle.driver}</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-neutral-400">Fuel:</span>
                  <span>${vehicle.fuelConsumption}</span>
                </div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-neutral-400">Condition:</span>
                  <span>${vehicle.condition}</span>
                </div>
              </div>
              ${emergencySection}
            </div>
          `;
        };
        
        // Add vehicle markers with hover events
        vehicles.forEach(vehicle => {
          const marker = new Marker({
            position: vehicle.position,
            map: newMap,
            title: vehicle.id,
            icon: createCarSvgIcon(vehicle.status)
          });
          
          // Add mouse over event to show info window
          marker.addListener('mouseover', () => {
            if (newInfoWindow) {
              newInfoWindow.setContent(createInfoWindowContent(vehicle));
              newInfoWindow.open(newMap, marker);
            }
          });
          
          // Hide info window on mouse out
          marker.addListener('mouseout', () => {
            if (newInfoWindow) {
              newInfoWindow.close();
            }
          });
          
          // Optional: click handler for more detailed view
          marker.addListener('click', () => {
            // You could trigger a state change here to show more details in a sidebar
            console.log(`Vehicle ${vehicle.id} clicked`);
          });
        });
        
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };
    
    initializeMap();
  }, []);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vehicles..."
            className="pl-8 pr-4 py-1 rounded-md bg-neutral-700 text-white text-sm w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <IconSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 px-3 py-1 rounded text-sm">
            <IconFilter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-1 bg-green-500/20 hover:bg-green-500/30 text-green-500 px-3 py-1 rounded text-sm">
            <IconCar className="w-4 h-4" />
            <span>All Vehicles</span>
          </button>
        </div>
      </div>
      
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