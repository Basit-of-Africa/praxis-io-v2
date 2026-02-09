import React, { useState, useMemo } from 'react';
import { useClientContext } from '@/context/ClientContext';
import { usePracticeContext } from '@/context/PracticeContext';
import { useServiceContext } from '@/context/ServiceContext';
import { Client, Invoice, Service } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { showSuccess, showError } from '@/utils/toast';
import { X, ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateInvoicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateInvoicePopup: React.FC<CreateInvoicePopupProps> = ({ isOpen, onClose }) => {
  const { clients, addClient } = useClientContext();
  const { addInvoice } = usePracticeContext();
  const { services } = useServiceContext();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  
  const [clientSearchOpen, setClientSearchOpen] = useState(false);

  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');

  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [invoiceItems, setInvoiceItems] = useState<{ serviceId: string | null; description: string; amount: string; }[]>([]);

  const handleCreateClient = () => {
    if (!newClientName || !newClientEmail) {
      showError('Please fill in all fields for the new client.');
      return;
    }
    
    const newClient: Omit<Client, 'id' | 'appointments' | 'status'> = {
        name: newClientName,
        email: newClientEmail,
    };
    
    const addedClient = addClient(newClient);
    setSelectedClient(addedClient);
    setIsCreatingClient(false);
    setNewClientName('');
    setNewClientEmail('');
    showSuccess('New client created successfully!');
  };

  const totalAmount = useMemo(() => {
    return invoiceItems.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
  }, [invoiceItems]);

  const handleCreateInvoice = () => {
    if (!selectedClient || !invoiceDueDate || totalAmount <= 0) {
      showError('Please select a client, set a due date, and add at least one item.');
      return;
    }

    const newInvoice: Omit<Invoice, 'id' | 'status'> = {
      clientId: selectedClient.id,
      amount: totalAmount,
      dueDate: new Date(invoiceDueDate),
      items: invoiceItems.map(item => ({...item, amount: parseFloat(item.amount)})).filter(item => item.description && item.amount > 0),
    };

    addInvoice(newInvoice);
    showSuccess('Invoice created successfully!');
    onClose();
  };

  const handleItemAmountChange = (index: number, value: string) => {
    const newItems = [...invoiceItems];
    newItems[index]['amount'] = value;
    setInvoiceItems(newItems);
  };

  const handleServiceSelect = (index: number, serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        const newItems = [...invoiceItems];
        newItems[index] = {
            serviceId: service.id,
            description: service.name,
            amount: String(service.price)
        };
        setInvoiceItems(newItems);
    }
  }

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { serviceId: null, description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(newItems);
  };
  
  const resetState = () => {
    setSelectedClient(null);
    setIsCreatingClient(false);
    setNewClientName('');
    setNewClientEmail('');
    setInvoiceDueDate('');
    setInvoiceItems([]);
  };

  const handleClose = () => {
    resetState();
    onClose();
  }

  const renderClientSelection = () => (
    <div>
      <Label>Select a Client</Label>
        <Popover open={clientSearchOpen} onOpenChange={setClientSearchOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={clientSearchOpen}
                    className="w-full justify-between mt-2"
                >
                    {selectedClient ? clients.find((client) => client.id === selectedClient.id)?.name : "Select client..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder="Search client..." />
                    <CommandEmpty>No client found.</CommandEmpty>
                    <CommandGroup>
                        {clients.map((client) => (
                            <CommandItem
                                key={client.id}
                                value={client.name}
                                onSelect={() => {
                                    setSelectedClient(client)
                                    setClientSearchOpen(false)
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", selectedClient?.id === client.id ? "opacity-100" : "opacity-0")} />
                                {client.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
      <p className="text-sm text-center my-4 text-muted-foreground">Or</p>
      <Button variant="outline" className="w-full" onClick={() => setIsCreatingClient(true)}>
        Create a New Client
      </Button>
    </div>
  );

  const renderCreateClientForm = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-center">Create New Client</h4>
      <div>
        <Label htmlFor="new-client-name">Full Name</Label>
        <Input
          id="new-client-name"
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label htmlFor="new-client-email">Email Address</Label>
        <Input
          id="new-client-email"
          type="email"
          value={newClientEmail}
          onChange={(e) => setNewClientEmail(e.target.value)}
          placeholder="john.doe@example.com"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => setIsCreatingClient(false)}>Cancel</Button>
        <Button onClick={handleCreateClient}>Save Client</Button>
      </div>
    </div>
  );

  const renderInvoiceForm = () => (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h4 className="font-semibold">New Invoice for {selectedClient?.name}</h4>
            <Button variant="link" className="h-auto p-0" onClick={() => setSelectedClient(null)}>Change client</Button>
        </div>
        <div>
            <Label>Invoice Items</Label>
            {invoiceItems.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                    <Select onValueChange={(serviceId) => handleServiceSelect(index, serviceId)} value={item.serviceId || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a service..." />
                        </SelectTrigger>
                        <SelectContent>
                            {services.map(service => (
                                <SelectItem key={service.id} value={service.id}>
                                    {service.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input 
                        type="number" 
                        placeholder="Amount" 
                        className="w-32 shrink-0"
                        value={item.amount}
                        onChange={(e) => handleItemAmountChange(index, e.target.value)}
                    />
                    <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleRemoveItem(index)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddItem}>Add Item</Button>
        </div>
        <div>
            <Label htmlFor="invoice-due-date">Due Date</Label>
            <Input
                id="invoice-due-date"
                type="date"
                value={invoiceDueDate}
                onChange={(e) => setInvoiceDueDate(e.target.value)}
            />
        </div>
        <p className="font-bold text-lg text-right">Total: ${totalAmount.toFixed(2)}</p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {!selectedClient ? (
            isCreatingClient ? renderCreateClientForm() : renderClientSelection()
          ) : (
            renderInvoiceForm()
          )}
        </div>
        {selectedClient && (
            <DialogFooter>
                <Button onClick={handleCreateInvoice}>Create Invoice for ${totalAmount.toFixed(2)}</Button>
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoicePopup;
