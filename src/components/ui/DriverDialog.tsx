// src/components/ui/DriverDialog.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Driver } from '@/lib/types/driver';

interface DriverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (driver: Omit<Driver, 'id'>) => void;
}

export function DriverDialog({ open, onOpenChange, onSave }: DriverDialogProps) {
  const [formData, setFormData] = useState<Omit<Driver, 'id'>>({
    fullName: '',
    nic: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    emergencyContact: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    licenseExpireDate: '',
    licenseIssueDate: '',
    licenseNumber: '',
    licenseType: '',
    password: '',
    photoUrl: '',
  });

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Driver</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
          <div>
            <Label>NIC</Label>
            <Input name="nic" value={formData.nic} onChange={handleChange} />
          </div>
          <div>
            <Label>Address</Label>
            <Input name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Emergency Contact</Label>
            <Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
          </div>
          <div>
            <Label>Emergency Contact Name</Label>
            <Input name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
          </div>
          <div>
            <Label>Emergency Contact Relation</Label>
            <Input name="emergencyContactRelation" value={formData.emergencyContactRelation} onChange={handleChange} />
          </div>
          <div>
            <Label>License Number</Label>
            <Input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
          </div>
          <div>
            <Label>License Type</Label>
            <Input name="licenseType" value={formData.licenseType} onChange={handleChange} />
          </div>
          <div>
            <Label>License Issue Date</Label>
            <Input name="licenseIssueDate" type="date" value={formData.licenseIssueDate} onChange={handleChange} />
          </div>
          <div>
            <Label>License Expire Date</Label>
            <Input name="licenseExpireDate" type="date" value={formData.licenseExpireDate} onChange={handleChange} />
          </div>
          <div>
            <Label>Password</Label>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <Label>Photo URL</Label>
            <Input name="photoUrl" value={formData.photoUrl} onChange={handleChange} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}