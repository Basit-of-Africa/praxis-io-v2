"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Client } from "@/types";
import { showSuccess, showError } from "@/utils/toast";

interface ClientContextType {
  clients: Client[];
  addClient: (clientData: Omit<Client, "id">) => void;
  updateClient: (clientId: string, clientData: Partial<Client>) => void;
  deleteClient: (clientId: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const initialMockClients: Client[] = [
  {
    id: "cl1",
    fullName: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "123-456-7890",
    address: "101 Oak Ave",
    notes: "Regular patient, prefers morning appointments.",
  },
  {
    id: "cl2",
    fullName: "Bob Johnson",
    email: "bob.j@example.com",
    phone: "098-765-4321",
    address: "202 Pine St",
    notes: "New patient, referred by Dr. Lee.",
  },
];

export const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(initialMockClients);

  const addClient = (clientData: Omit<Client, "id">) => {
    const newClient: Client = {
      id: `cl${Date.now()}`,
      ...clientData,
    };
    setClients((prevClients) => [...prevClients, newClient]);
    showSuccess(`Client ${newClient.fullName} added successfully!`);
  };

  const updateClient = (clientId: string, clientData: Partial<Client>) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, ...clientData } : client
      )
    );
    showSuccess(`Client updated successfully!`);
  };

  const deleteClient = (clientId: string) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
    showSuccess("Client deleted successfully!");
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};