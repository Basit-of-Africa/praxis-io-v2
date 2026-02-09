export type CareRole =
  | "Medical Doctor"
  | "Therapist"
  | "Yoga Instructor"
  | "Mental Health Professional"
  | "Functional Medicine Practitioner"
  | "Health Coach"
  | "Nutritionist"
  | "Dietitian"
  | "Personal Trainer"
  | "Nurse Practitioner"
  | "Naturopathic Doctor"
  | "Chiropractor";

export interface Provider {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: CareRole;
  specialization?: string;
  licenseNumber?: string;
  bio?: string;
  avatar?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  providerId?: string;
  roleSpecific?: CareRole[];
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  notes?: string;
  tags?: string[];
}

export interface Appointment {
  id: string;
  service: Service;
  date: Date;
  patient: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
  };
  providerId?: string;
  paymentReference?: string;
  status: "booked" | "completed" | "cancelled" | "no-show";
  sessionType?: "in-person" | "telehealth";
  telehealthLink?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  encrypted: boolean;
}

export interface Protocol {
  id: string;
  name: string;
  description: string;
  steps: string[];
  roleSpecific?: CareRole[];
  createdBy: string;
  createdAt: Date;
}

export interface Template {
  id: string;
  name: string;
  type: "email" | "sms" | "note" | "prescription" | "plan";
  content: string;
  variables?: string[];
  roleSpecific?: CareRole[];
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  provider: "stripe" | "paystack" | "paypal";
  status: "pending" | "completed" | "failed" | "refunded";
  appointmentId?: string;
  clientId: string;
  reference: string;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  items: InvoiceItem[];
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: Date;
  paymentId?: string;
  insuranceClaim?: boolean;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ChartNote {
  id: string;
  clientId: string;
  appointmentId?: string;
  providerId: string;
  date: Date;
  type: "soap" | "progress" | "assessment" | "plan";
  content: {
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
  };
  attachments?: string[];
}

export interface Prescription {
  id: string;
  clientId: string;
  providerId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  refills: number;
  notes?: string;
  status: "active" | "completed" | "cancelled";
  prescribedDate: Date;
}

export interface GroupSession {
  id: string;
  name: string;
  description: string;
  providerId: string;
  maxParticipants: number;
  currentParticipants: string[];
  date: Date;
  duration: number;
  price: number;
  sessionType: "in-person" | "telehealth";
  status: "scheduled" | "completed" | "cancelled";
}

export interface Program {
  id: string;
  name: string;
  description: string;
  providerId: string;
  duration: number;
  modules: ProgramModule[];
  price: number;
  enrolledClients: string[];
}

export interface ProgramModule {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  resources?: string[];
}

export interface JournalEntry {
  id: string;
  clientId: string;
  date: Date;
  content: string;
  mood?: number;
  tags?: string[];
  sharedWithProvider?: boolean;
}

export interface Automation {
  id: string;
  name: string;
  trigger: "appointment_booked" | "appointment_reminder" | "no_show" | "payment_received" | "custom";
  action: "send_email" | "send_sms" | "create_task" | "update_status";
  conditions?: Record<string, unknown>;
  templateId?: string;
  enabled: boolean;
}

export interface BrandingSettings {
  businessName: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  customDomain?: string;
  emailFooter?: string;
  bookingPageMessage?: string;
}

export interface Integration {
  id: string;
  name: string;
  type: "calendar" | "email" | "accounting" | "lab" | "ehr" | "custom";
  provider: string;
  enabled: boolean;
  credentials?: Record<string, string>;
  settings?: Record<string, unknown>;
}
