// Type definitions for driver data
export interface License {
    number: string;
    type: string;
    issueDate: string;
    expiryDate: string;
    restrictions: string[];
  }
  
  export interface VehicleAssignment {
    vehicleId: string;
    vehicleName: string;
    assignedDate: string;
    status: "active" | "pending" | "ended";
  }
  
  export interface DriverContact {
    phone: string;
    email: string;
    address: string;
    emergency: {
      name: string;
      relation: string;
      phone: string;
    };
  }
  
  export interface Driver {
    id: string;
    name: string;
    avatar: string;
    dateOfBirth: string;
    joinDate: string;
    status: "active" | "inactive" | "on_leave";
    license: License;
    currentVehicle?: VehicleAssignment;
    pastVehicles: VehicleAssignment[];
    contact: DriverContact;
    rating: number;
    profilePicture?: string; 
  }
  
  export interface TripRecord {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    startLocation: string;
    endLocation: string;
    distance: number;
    vehicleId: string;
    vehicleName: string;
    status: "completed" | "cancelled" | "in_progress";
    incidents?: string[];
  }
  
  // Mock data for a single driver
  export const mockDriver: Driver = {
    id: "DRV001",
    name: "John Miller",
    avatar: "/placeholder/150/150",
    dateOfBirth: "1985-06-12",
    joinDate: "2021-04-15",
    status: "active",
    profilePicture: "https://avatars.githubusercontent.com/u/188667694?v=4",
    license: {
      number: "DL123456789",
      type: "Commercial",
      issueDate: "2019-03-10",
      expiryDate: "2026-03-09",
      restrictions: ["Corrective Lenses"]
    },
    currentVehicle: {
      vehicleId: "VEH005",
      vehicleName: "Toyota Hilux",
      assignedDate: "2023-01-15",
      status: "active"
    },
    pastVehicles: [
      {
        vehicleId: "VEH002",
        vehicleName: "Ford Transit",
        assignedDate: "2021-05-10",
        status: "ended"
      },
      {
        vehicleId: "VEH003",
        vehicleName: "Mercedes Sprinter",
        assignedDate: "2022-02-18",
        status: "ended"
      }
    ],
    contact: {
      phone: "555-123-4567",
      email: "john.miller@example.com",
      address: "123 Main Street, Anytown, ST 12345",
      emergency: {
        name: "Sarah Miller",
        relation: "Spouse",
        phone: "555-765-4321"
      }
    },
    rating: 4.7
  };
  
  // Mock data for trip history
  export const mockTripHistory: TripRecord[] = [
    {
      id: "TRP0045",
      date: "2025-03-15",
      startTime: "08:30",
      endTime: "11:45",
      startLocation: "Warehouse HQ",
      endLocation: "Central Distribution Center",
      distance: 78.5,
      vehicleId: "VEH005",
      vehicleName: "Toyota Hilux",
      status: "completed"
    },
    {
      id: "TRP0044",
      date: "2025-03-14",
      startTime: "09:15",
      endTime: "12:30",
      startLocation: "Central Distribution Center",
      endLocation: "North Outlet",
      distance: 45.2,
      vehicleId: "VEH005",
      vehicleName: "Toyota Hilux",
      status: "completed"
    },
    {
      id: "TRP0043",
      date: "2025-03-12",
      startTime: "07:45",
      endTime: "14:20",
      startLocation: "Warehouse HQ",
      endLocation: "South Distribution Point",
      distance: 112.8,
      vehicleId: "VEH005",
      vehicleName: "Toyota Hilux",
      status: "completed",
      incidents: ["Minor delay due to traffic"]
    },
    {
      id: "TRP0042",
      date: "2025-03-10",
      startTime: "10:00",
      endTime: "13:15",
      startLocation: "Warehouse HQ",
      endLocation: "East Regional Center",
      distance: 67.3,
      vehicleId: "VEH005",
      vehicleName: "Toyota Hilux",
      status: "completed"
    },
    {
      id: "TRP0041",
      date: "2025-03-08",
      startTime: "08:00",
      endTime: "16:45",
      startLocation: "Warehouse HQ",
      endLocation: "West County Depot",
      distance: 156.2,
      vehicleId: "VEH005",
      vehicleName: "Toyota Hilux",
      status: "completed"
    }
  ];