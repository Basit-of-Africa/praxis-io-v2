import React, { createContext, useContext, useState, ReactNode } from "react";
import { Provider, CareRole } from "@/types";
import { showSuccess } from "@/utils/toast";

interface ProviderContextType {
  providers: Provider[];
  addProvider: (provider: Omit<Provider, "id">) => void;
  updateProvider: (id: string, provider: Partial<Provider>) => void;
  deleteProvider: (id: string) => void;
  getProvidersByRole: (role: CareRole) => Provider[];
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

const initialProviders: Provider[] = [
  {
    id: "prov1",
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@clinic.com",
    phone: "555-0101",
    role: "Medical Doctor",
    specialization: "Family Medicine",
    licenseNumber: "MD-12345",
    bio: "Board-certified family physician with 15 years of experience.",
  },
  {
    id: "prov2",
    fullName: "Emily Chen",
    email: "emily.chen@clinic.com",
    phone: "555-0102",
    role: "Therapist",
    specialization: "Cognitive Behavioral Therapy",
    licenseNumber: "LT-67890",
    bio: "Licensed therapist specializing in anxiety and depression treatment.",
  },
  {
    id: "prov3",
    fullName: "Michael Rodriguez",
    email: "michael.r@clinic.com",
    phone: "555-0103",
    role: "Nutritionist",
    specialization: "Sports Nutrition",
    licenseNumber: "RD-11111",
    bio: "Registered dietitian with expertise in athletic performance nutrition.",
  },
];

export const ProviderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);

  const addProvider = (providerData: Omit<Provider, "id">) => {
    const newProvider: Provider = {
      id: `prov${Date.now()}`,
      ...providerData,
    };
    setProviders((prev) => [...prev, newProvider]);
    showSuccess(`Provider ${newProvider.fullName} added successfully!`);
  };

  const updateProvider = (id: string, providerData: Partial<Provider>) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === id ? { ...provider, ...providerData } : provider
      )
    );
    showSuccess("Provider updated successfully!");
  };

  const deleteProvider = (id: string) => {
    setProviders((prev) => prev.filter((provider) => provider.id !== id));
    showSuccess("Provider deleted successfully!");
  };

  const getProvidersByRole = (role: CareRole) => {
    return providers.filter((provider) => provider.role === role);
  };

  return (
    <ProviderContext.Provider
      value={{ providers, addProvider, updateProvider, deleteProvider, getProvidersByRole }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderContext = () => {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error("useProviderContext must be used within a ProviderProvider");
  }
  return context;
};
