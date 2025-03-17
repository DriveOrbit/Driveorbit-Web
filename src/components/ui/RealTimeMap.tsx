"use client";

import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Map container style
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Default center (fallback if user location is not available)
const center = {
  lat: 7.8731, // Latitude for Sri Lanka
  lng: 80.7718, // Longitude for Sri Lanka
};

// Custom map styles to hide POI (Points of Interest) labels
const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export default function RealTimeMap() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyD9PILxIkeKyNug0d5Gtpx7qHPTg--xhvc", //  API key 
  });

  // Track user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle errors while loading the map
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15} // Zoom level for better visibility of user location
      center={userLocation || center} // Use user location if available, otherwise fallback to default center
      options={{ styles: mapStyles }} // Apply custom map styles
    >
      {/* Display a marker at the user's location */}
      {userLocation && <Marker position={userLocation} />}
    </GoogleMap>
  );
}