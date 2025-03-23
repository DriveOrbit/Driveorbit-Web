"use client";

import React, { useState } from "react";
import { IconUsersGroup, IconHistory, IconPhone, IconMail, IconStar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Driver, TripRecord, mockDriver, mockTripHistory } from "./drivertype";


const mockDrivers: Driver[] = [
  mockDriver,
  
];

// Driver List Component
const DriversList = ({ onSelectDriver }: { onSelectDriver: (driver: Driver) => void }) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-6">
      <h3 className="text-neutral-300 text-xl font-semibold mb-4">Registered Drivers</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-neutral-900 text-neutral-200 rounded-lg">
          <thead>
            <tr className="bg-neutral-700 text-left">
              <th className="py-2 px-4">Driver ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Contact Number</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Rating</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDrivers.map((driver) => (
              <tr key={driver.id} className="border-b border-neutral-700 hover:bg-neutral-800">
                <td className="py-2 px-4">{driver.id}</td>
                <td className="py-2 px-4">{driver.name}</td>
                <td className="py-2 px-4">{driver.contact.phone}</td>
                <td className="py-2 px-4">
                  <span className={cn(
                    "px-2 py-1 text-xs font-semibold rounded-md",
                    driver.status === "active" ? "bg-green-600 text-white" :
                    driver.status === "inactive" ? "bg-red-600 text-white" :
                    "bg-yellow-500 text-black"
                  )}>
                    {driver.status.replace("_", " ")}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <span className="text-yellow-400">★ {driver.rating}</span>
                </td>
                <td className="py-2 px-4">
                  <button 
                    onClick={() => onSelectDriver(driver)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Driver Info Tab
const DriverInfoTab = ({ driver }: { driver: Driver }) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-6">
      <h3 className="text-neutral-300 text-xl font-semibold mb-4">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-neutral-400 text-xs">Full Name</p>
          <p className="text-neutral-200">{driver.name}</p>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Driver ID</p>
          <p className="text-neutral-200">{driver.id}</p>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Status</p>
          <span className={cn(
            "px-2 py-1 text-sm font-medium rounded-md",
            driver.status === "active" ? "bg-green-600 text-white" :
            driver.status === "inactive" ? "bg-red-600 text-white" :
            "bg-yellow-500 text-black"
          )}>
            {driver.status.replace("_", " ")}
          </span>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Rating</p>
          <span className="text-yellow-400">★ {driver.rating}/5.0</span>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Date of Birth</p>
          <p className="text-neutral-200">{driver.dateOfBirth}</p>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Join Date</p>
          <p className="text-neutral-200">{driver.joinDate}</p>
        </div>
      </div>
      
      <h3 className="text-neutral-300 text-xl font-semibold mt-6 mb-4">Contact Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-neutral-400 text-xs">Phone</p>
          <p className="text-neutral-200">{driver.contact.phone}</p>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Email</p>
          <p className="text-neutral-200">{driver.contact.email}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-neutral-400 text-xs">Address</p>
          <p className="text-neutral-200">{driver.contact.address}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-neutral-400 text-xs">Emergency Contact</p>
          <p className="text-neutral-200">
            {driver.contact.emergency.name} ({driver.contact.emergency.relation}) - {driver.contact.emergency.phone}
          </p>
        </div>
      </div>

      <h3 className="text-neutral-300 text-xl font-semibold mt-6 mb-4">License Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-neutral-400 text-xs">License Number</p>
          <p className="text-neutral-200">{driver.license.number}</p>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">License Type</p>
          <p className="text-neutral-200">{driver.license.type}</p>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Issue Date</p>
          <p className="text-neutral-200">{driver.license.issueDate}</p>
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Expiry Date</p>
          <p className="text-neutral-200">{driver.license.expiryDate}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-neutral-400 text-xs">Restrictions</p>
          <p className="text-neutral-200">{driver.license.restrictions.join(", ") || "None"}</p>
        </div>
      </div>

      <h3 className="text-neutral-300 text-xl font-semibold mt-6 mb-4">Vehicle Assignment</h3>
      <div className="grid grid-cols-1 gap-6">
        {driver.currentVehicle && (
          <div className="bg-neutral-700 p-4 rounded-lg">
            <p className="text-neutral-300 font-medium">Current Vehicle</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-neutral-400 text-xs">Vehicle ID</p>
                <p className="text-neutral-200">{driver.currentVehicle.vehicleId}</p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs">Vehicle Name</p>
                <p className="text-neutral-200">{driver.currentVehicle.vehicleName}</p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs">Assigned Date</p>
                <p className="text-neutral-200">{driver.currentVehicle.assignedDate}</p>
              </div>
            </div>
          </div>
        )}
        
        {driver.pastVehicles.length > 0 && (
          <div>
            <p className="text-neutral-300 font-medium mb-2">Past Vehicles</p>
            {driver.pastVehicles.map((vehicle, index) => (
              <div key={index} className="bg-neutral-700 p-4 rounded-lg mb-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-neutral-400 text-xs">Vehicle ID</p>
                    <p className="text-neutral-200">{vehicle.vehicleId}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs">Vehicle Name</p>
                    <p className="text-neutral-200">{vehicle.vehicleName}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs">Assigned Date</p>
                    <p className="text-neutral-200">{vehicle.assignedDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Trip History Tab
const TripHistoryTab = ({ driverId }: { driverId: string }) => {

  const history = mockTripHistory;

  return (
    <div className="bg-neutral-800 rounded-lg p-6">
      <h3 className="text-neutral-300 text-xl font-semibold mb-4">Trip History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-neutral-900 text-neutral-200 rounded-lg">
          <thead>
            <tr className="bg-neutral-700 text-left">
              <th className="py-2 px-4">Trip ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Route</th>
              <th className="py-2 px-4">Distance</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((trip) => (
              <tr key={trip.id} className="border-b border-neutral-700">
                <td className="py-2 px-4">{trip.id}</td>
                <td className="py-2 px-4">{trip.date}</td>
                <td className="py-2 px-4">{trip.startTime} - {trip.endTime}</td>
                <td className="py-2 px-4">
                  <span className="block text-xs text-neutral-400">From:</span>
                  {trip.startLocation}
                  <span className="block text-xs text-neutral-400 mt-1">To:</span>
                  {trip.endLocation}
                </td>
                <td className="py-2 px-4">{trip.distance} km</td>
                <td className="py-2 px-4">
                  <span className={cn(
                    "px-2 py-1 text-xs font-semibold rounded-md",
                    trip.status === "completed" ? "bg-green-600 text-white" :
                    trip.status === "cancelled" ? "bg-red-600 text-white" :
                    "bg-yellow-500 text-black"
                  )}>
                    {trip.status.replace("_", " ")}
                  </span>
                  {trip.incidents && trip.incidents.length > 0 && (
                    <div className="mt-1 text-xs text-red-400">
                      {trip.incidents.join("; ")}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Component with Tabs
export default function DriversPage() {
  const [viewMode, setViewMode] = useState<"list" | "details">("list");
  const [hydrated, setHydrated] = useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setViewMode("details");
    setActiveTab("info");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedDriver(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {viewMode === "list" ? (
        <>
          <h1 className="text-3xl font-bold text-white mb-6">Registred Drivers</h1>
          <DriversList onSelectDriver={handleSelectDriver} />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Driver Details</h1>
            <button
              className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-md"
              onClick={handleBackToList}
            >
              Back to Driver List
            </button>
          </div>
          
          {selectedDriver && (
            <>
              {/* Driver Quick Info */}
              <div className="bg-neutral-800 rounded-lg p-4 mb-6 flex items-center">
                <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {hydrated && selectedDriver.profilePicture ? (
                    <img 
                        src={selectedDriver.profilePicture} 
                        alt={selectedDriver.name} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                  selectedDriver.name.split(' ').map(n => n[0]).join('')
                )}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-white">{selectedDriver.name}</h2>
                  <div className="flex text-neutral-400 text-sm mt-1">
                    <span className="flex items-center mr-4">
                      <IconUsersGroup size={16} className="mr-1" /> {selectedDriver.id}
                    </span>
                    <span className="flex items-center mr-4">
                      <IconPhone size={16} className="mr-1" /> {selectedDriver.contact.phone}
                    </span>
                    <span className="flex items-center mr-4">
                      <IconMail size={16} className="mr-1" /> {selectedDriver.contact.email}
                    </span>
                    <span className="flex items-center text-yellow-400">
                      <IconStar size={16} className="mr-1" /> {selectedDriver.rating}/5.0
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-4 mb-4">
                <button
                  className={`px-4 py-2 rounded-md font-medium ${
                    activeTab === "info" ? "bg-blue-500 text-white" : "bg-neutral-700 text-neutral-300"
                  }`}
                  onClick={() => setActiveTab("info")}
                >
                  <IconUsersGroup className="inline-block mr-2" size={18} /> Driver Info
                </button>
                <button
                  className={`px-4 py-2 rounded-md font-medium ${
                    activeTab === "history" ? "bg-blue-500 text-white" : "bg-neutral-700 text-neutral-300"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  <IconHistory className="inline-block mr-2" size={18} /> Trip History
                </button>
              </div>

              {/* Render Tabs */}
              {activeTab === "info" ? (
                <DriverInfoTab driver={selectedDriver} />
              ) : (
                <TripHistoryTab driverId={selectedDriver.id} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}