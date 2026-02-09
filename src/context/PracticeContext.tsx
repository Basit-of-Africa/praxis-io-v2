import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Protocol,
  Template,
  Payment,
  Invoice,
  ChartNote,
  Prescription,
  Automation,
  BrandingSettings,
  Integration,
} from "@/types";
import { showSuccess } from "@/utils/toast";

interface PracticeContextType {
  protocols: Protocol[];
  templates: Template[];
  payments: Payment[];
  invoices: Invoice[];
  chartNotes: ChartNote[];
  prescriptions: Prescription[];
  automations: Automation[];
  brandingSettings: BrandingSettings;
  integrations: Integration[];
  addProtocol: (protocol: Omit<Protocol, "id">) => void;
  addTemplate: (template: Omit<Template, "id">) => void;
  addPayment: (payment: Omit<Payment, "id">) => void;
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  addChartNote: (note: Omit<ChartNote, "id">) => void;
  addPrescription: (prescription: Omit<Prescription, "id">) => void;
  updateAutomation: (id: string, automation: Partial<Automation>) => void;
  updateBranding: (settings: Partial<BrandingSettings>) => void;
  updateIntegration: (id: string, integration: Partial<Integration>) => void;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

const initialBranding: BrandingSettings = {
  businessName: "WellCare Practice",
  primaryColor: "#3b82f6",
  secondaryColor: "#10b981",
  bookingPageMessage: "Welcome to our practice. Book your appointment today!",
};

const initialIntegrations: Integration[] = [
  {
    id: "int1",
    name: "Google Calendar",
    type: "calendar",
    provider: "google",
    enabled: false,
  },
  {
    id: "int2",
    name: "QuickBooks",
    type: "accounting",
    provider: "quickbooks",
    enabled: false,
  },
];

export const PracticeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [chartNotes, setChartNotes] = useState<ChartNote[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>(initialBranding);
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);

  const addProtocol = (protocolData: Omit<Protocol, "id">) => {
    const newProtocol: Protocol = {
      id: `proto${Date.now()}`,
      ...protocolData,
    };
    setProtocols((prev) => [...prev, newProtocol]);
    showSuccess("Protocol added successfully!");
  };

  const addTemplate = (templateData: Omit<Template, "id">) => {
    const newTemplate: Template = {
      id: `tmpl${Date.now()}`,
      ...templateData,
    };
    setTemplates((prev) => [...prev, newTemplate]);
    showSuccess("Template added successfully!");
  };

  const addPayment = (paymentData: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      id: `pay${Date.now()}`,
      ...paymentData,
    };
    setPayments((prev) => [...prev, newPayment]);
    showSuccess("Payment recorded successfully!");
  };

  const addInvoice = (invoiceData: Omit<Invoice, "id">) => {
    const newInvoice: Invoice = {
      id: `inv${Date.now()}`,
      ...invoiceData,
    };
    setInvoices((prev) => [...prev, newInvoice]);
    showSuccess("Invoice created successfully!");
  };

  const addChartNote = (noteData: Omit<ChartNote, "id">) => {
    const newNote: ChartNote = {
      id: `note${Date.now()}`,
      ...noteData,
    };
    setChartNotes((prev) => [...prev, newNote]);
    showSuccess("Chart note saved successfully!");
  };

  const addPrescription = (prescriptionData: Omit<Prescription, "id">) => {
    const newPrescription: Prescription = {
      id: `rx${Date.now()}`,
      ...prescriptionData,
    };
    setPrescriptions((prev) => [...prev, newPrescription]);
    showSuccess("Prescription created successfully!");
  };

  const updateAutomation = (id: string, automationData: Partial<Automation>) => {
    setAutomations((prev) =>
      prev.map((auto) => (auto.id === id ? { ...auto, ...automationData } : auto))
    );
    showSuccess("Automation updated successfully!");
  };

  const updateBranding = (settings: Partial<BrandingSettings>) => {
    setBrandingSettings((prev) => ({ ...prev, ...settings }));
    showSuccess("Branding settings updated successfully!");
  };

  const updateIntegration = (id: string, integrationData: Partial<Integration>) => {
    setIntegrations((prev) =>
      prev.map((int) => (int.id === id ? { ...int, ...integrationData } : int))
    );
    showSuccess("Integration updated successfully!");
  };

  return (
    <PracticeContext.Provider
      value={{
        protocols,
        templates,
        payments,
        invoices,
        chartNotes,
        prescriptions,
        automations,
        brandingSettings,
        integrations,
        addProtocol,
        addTemplate,
        addPayment,
        addInvoice,
        addChartNote,
        addPrescription,
        updateAutomation,
        updateBranding,
        updateIntegration,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (context === undefined) {
    throw new Error("usePracticeContext must be used within a PracticeProvider");
  }
  return context;
};
