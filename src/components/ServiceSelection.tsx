'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Service } from '@/types';

interface ServiceSelectionProps {
  services: Service[];
  onServiceSelect: (service: Service | null) => void;
  selectedService: Service | null;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ services, onServiceSelect, selectedService }) => {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">No Services Found</h3>
        <p className="text-muted-foreground mb-6">
          It looks like there are no services available for booking right now.
        </p>
        <a href="/services">
          <Button>Go to Services to Add Some</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Card
          key={service.id}
          className={cn(
            'cursor-pointer hover:border-primary transition-colors',
            selectedService?.id === service.id && 'border-primary ring-2 ring-primary',
          )}
          onClick={() => onServiceSelect(service)}
        >
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">{service.description}</p>
            <p className="text-lg font-semibold">${service.price.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceSelection;
