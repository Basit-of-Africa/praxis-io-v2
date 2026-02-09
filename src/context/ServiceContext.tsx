'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Service } from '@/types';

interface ServiceContextType {
  services: Service[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (serviceId: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);

  const addService = (service: Service) => {
    // In a real app, you'd also update the database
    setServices(prevServices => [...prevServices, { ...service, id: String(Date.now()) }]);
  };

  const updateService = (updatedService: Service) => {
    // In a real app, you'd also update the database
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const deleteService = (serviceId: string) => {
    // In a real app, you'd also update the database
    setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  };

  return (
    <ServiceContext.Provider value={{ services, addService, updateService, deleteService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};
