// Define types for vehicle attributes
export interface Vehicle {
    id: string;
    position: { lat: number; lng: number };
    status: "active" | "warning" | "error";
    driver: string;
    fuelPercentage?: string;
    condition: string;
    emergency?: string;
    location: string;
    time: string;
  }
  
  // Base coordinates for Colombo
  export const COLOMBO_CENTER = {
    lat: 6.927079,
    lng: 79.861244
  };
  
  // Fixed set of vehicles for consistent tracking across both list and map
  export const FIXED_VEHICLES: Vehicle[] = [
    {
      id: "KY 7766",
      position: { lat: 6.927079, lng: 79.861244 },
      status: "active",
      driver: "Michael Smith",
      fuelPercentage: "75%",
      condition: "Excellent",
      location: "Colombo Fort",
      time: "1h 15min"
    },
    {
      id: "PN 8719",
      position: { lat: 6.917079, lng: 79.871244 },
      status: "active",
      driver: "Sarah Johnson",
      fuelPercentage: "60%",
      condition: "Good",
      location: "Kollupitiya",
      time: "0h 45min"
    },
    {
      id: "DL 6389",
      position: { lat: 6.937079, lng: 79.851244 },
      status: "error",
      driver: "David Lee",
      fuelPercentage: "40%",
      condition: "Needs Maintenance",
      emergency: "Engine overheating",
      location: "Wellawatte",
      time: "2h 10min"
    },
    {
      id: "VB 4285",
      position: { lat: 6.927079, lng: 79.881244 },
      status: "warning",
      driver: "Emma Wilson",
      fuelPercentage: "10%",
      condition: "Check Required",
      emergency: "Low fuel",
      location: "Bambalapitiya",
      time: "0h 30min"
    },
    {
      id: "CR 8565",
      position: { lat: 6.907079, lng: 79.861244 },
      status: "active",
      driver: "James Brown",
      fuelPercentage: "70%",
      condition: "Excellent",
      location: "Maradana",
      time: "1h 50min"
    },
    {
      id: "JN 9934",
      position: { lat: 6.947079, lng: 79.861244 },
      status: "active",
      driver: "Olivia Taylor",
      fuelPercentage: "80%",
      condition: "Good",
      location: "Nugegoda",
      time: "0h 55min"
    }
  ];
  
  // Export the fixed vehicle data
  export default {
    FIXED_VEHICLES,
    COLOMBO_CENTER
  };
  