'use client';

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notificationService from '@/services/notification-service';

const NotificationManager = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const [target, setTarget] = useState('all'); // 'all', 'driver', 'vehicle', 'group'
  const [targetId, setTargetId] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch drivers, vehicles, and groups
  useEffect(() => {
    // Mock data - replace with actual API calls
    setDrivers([
      { id: 'driver1', name: 'John Driver' },
      { id: 'driver2', name: 'Jane Driver' }
    ]);
    
    setVehicles([
      { id: 'vehicle1', name: 'KL-01-AB-1234' },
      { id: 'vehicle2', name: 'KL-01-CD-5678' }
    ]);
    
    setGroups([
      { id: 'group1', name: 'North Region' },
      { id: 'group2', name: 'South Region' }
    ]);
  }, []);

  const sendNotification = async () => {
    if (!title || !message) {
      toast.error('Title and message are required');
      return;
    }

    setIsLoading(true);
    
    try {
      const notification = {
        title,
        message,
        type,
        id: Date.now().toString()
      };

      let result;
      
      switch (target) {
        case 'driver':
          result = await notificationService.sendNotification(
            notification, 
            null, 
            `driver_${targetId}`
          );
          break;
        case 'vehicle':
          result = await notificationService.sendNotification(
            notification, 
            null, 
            `vehicle_${targetId}`
          );
          break;
        case 'group':
          result = await notificationService.sendNotification(
            notification, 
            null, 
            `driver_group_${targetId}`
          );
          break;
        case 'all':
        default:
          result = await notificationService.sendNotification(
            notification, 
            null, 
            'all'
          );
          break;
      }
      
      // Show success in dashboard
      toast.success('Notification sent successfully');
      
      // Clear form
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send notification');
    } finally {
      setIsLoading(false);
    }
  };

  // Template notifications
  const useTemplate = (templateType) => {
    switch (templateType) {
      case 'maintenance':
        setTitle('Maintenance Alert');
        setMessage('Vehicle is scheduled for maintenance. Please complete all pending trips.');
        setType('alert');
        break;
      case 'assignment':
        setTitle('New Assignment');
        setMessage('You have been assigned a new vehicle. Please check your schedule.');
        setType('info');
        break;
      case 'completion':
        setTitle('Trip Completed');
        setMessage('Your trip has been completed successfully.');
        setType('success');
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Notification Manager</h2>
      
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Quick Templates</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => useTemplate('maintenance')}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
          >
            Maintenance Alert
          </button>
          <button 
            onClick={() => useTemplate('assignment')}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            New Assignment
          </button>
          <button 
            onClick={() => useTemplate('completion')}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
          >
            Trip Completed
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded bg-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            placeholder="Notification Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded bg-transparent"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded bg-transparent"
            >
              <option value="info">Info</option>
              <option value="alert">Alert</option>
              <option value="success">Success</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Target</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-2 border rounded bg-transparent"
            >
              <option value="all">All Drivers</option>
              <option value="driver">Specific Driver</option>
              <option value="vehicle">Vehicle</option>
              <option value="group">Driver Group</option>
            </select>
          </div>
        </div>
        
        {target !== 'all' && (
          <div>
            <label className="block text-sm font-medium mb-1">
              {target === 'driver' ? 'Select Driver' : 
               target === 'vehicle' ? 'Select Vehicle' : 'Select Group'}
            </label>
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full p-2 border rounded bg-transparent"
            >
              <option value="">Select...</option>
              {target === 'driver' && drivers.map(driver => (
                <option key={driver.id} value={driver.id}>{driver.name}</option>
              ))}
              {target === 'vehicle' && vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
              ))}
              {target === 'group' && groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
        )}
        
        <button
          onClick={sendNotification}
          disabled={isLoading}
          className={`w-full bg-primary text-white p-2 rounded hover:bg-primary/90 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Sending...' : 'Send Notification'}
        </button>
      </div>
    </div>
  );
};

export default NotificationManager;
