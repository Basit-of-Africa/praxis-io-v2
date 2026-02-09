import React, { useState, useMemo } from 'react';
import { useClientContext } from '@/context/ClientContext';
import { usePracticeContext } from '@/context/PracticeContext';
import { Client, Invoice } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { showSuccess, showError } from '@/utils/toast';
import { X } from 'lucide-react';

interface CreateInvoicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateInvoicePopup: React.FC<CreateInvoicePopupProps> = ({ isOpen, onClose }) => {
  const { clients, addClient } = useClientContext();
  const { addInvoice } = usePracticeContext();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCreatingClient, setIsCreatingClient] = useState(false);

  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');

  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([{ description: '', amount: '' }]);

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

  const handleItemChange = (index: number, field: 'description' | 'amount', value: string) => {
    const newItems = [...invoiceItems];
    newItems[index][field] = value;
    setInvoiceItems(newItems);
  };

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', amount: '' }]);
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
    setInvoiceItems([{ description: '', amount: '' }]);
  };

  const handleClose = () => {
    resetState();
    onClose();
  }

  const renderClientSelection = () => (
    <div>
      <Label htmlFor="client-select">Select a Client</Label>
      <Select onValueChange={(clientId) => setSelectedClient(clients.find(c => c.id === clientId) || null)}>
        <SelectTrigger id="client-select">
          <SelectValue placeholder="Choose a client..." />
        </SelectTrigger>
        <SelectContent>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
                    <Input 
                        placeholder="Item description" 
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    />
                    <Input 
                        type="number" 
                        placeholder="Amount" 
                        className="w-32 shrink-0"
                        value={item.amount}
                        onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
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
