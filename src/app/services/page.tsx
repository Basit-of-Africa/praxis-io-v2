'use client';

import React, { useState } from 'react';
import { useServiceContext } from '@/context/ServiceContext';
import { Button } from '@/components/ui/button';
import { Service } from '@/types';
import { ServiceCard } from '@/components/ServiceCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ServicesPage = () => {
  const { services = [], addService, updateService, deleteService } = useServiceContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAdd = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    deleteService(serviceId);
  };

  const handleSave = (service: Service) => {
    if (service.id) {
      updateService(service);
    } else {
      addService(service);
    }
    setIsDialogOpen(false);
    setEditingService(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button onClick={handleAdd}>Add New Service</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
      <ServiceFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        service={editingService}
      />
    </div>
  );
};

interface ServiceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  service: Service | null;
}

const ServiceFormDialog: React.FC<ServiceFormDialogProps> = ({ isOpen, onClose, onSave, service }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  React.useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description);
      setPrice(service.price);
      setDuration(service.duration);
    } else {
      setName('');
      setDescription('');
      setPrice(0);
      setDuration(0);
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: service?.id || '',
      name,
      description,
      price,
      duration,
      // NOTE: These fields are not in the form, so we use default values.
      // In a real application, you would add form fields for these as well.
      requiresPreAuthorization: service?.requiresPreAuthorization || false,
      cptCodes: service?.cptCodes || [],
      serviceCategories: service?.serviceCategories || [],
      programAssociation: service?.programAssociation || '',
      status: service?.status || 'Active',
      relatedDiagnoses: service?.relatedDiagnoses || [],
      ageAppropriateness: service?.ageAppropriateness || '',
      telehealthCompatible: service?.telehealthCompatible || false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Service Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />
          </div>
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input id="duration" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} required />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{service ? 'Save Changes' : 'Create Service'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesPage;
