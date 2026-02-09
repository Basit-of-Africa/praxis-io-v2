"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appointment, Service } from "@/types";
import { showSuccess, showError } from "@/utils/toast";

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointmentData: Omit<Appointment, "id" | "status">) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment["status"]) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const initialMockAppointments: Appointment[] = [
  {
    id: "app1",
    service: { id: "1", name: "General Consultation", description: "A standard consultation", price: 50.00, duration: 30 },
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    patient: { fullName: "Alice Smith", email: "alice.smith@example.com", phone: "123-456-7890" },
    status: "booked",
    sessionType: "in-person",
  },
  {
    id: "app2",
    service: { id: "2", name: "Follow-up Visit", description: "A follow-up appointment", price: 30.00, duration: 20 },
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    patient: { fullName: "Bob Johnson", email: "bob.j@example.com", phone: "098-765-4321" },
    status: "completed",
    sessionType: "telehealth",
  },
];

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialMockAppointments);

  const addAppointment = (appointmentData: Omit<Appointment, "id" | "status">) => {
    const newAppointment: Appointment = {
      id: `app${Date.now()}`,
      status: "booked",
      ...appointmentData,
    };
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    showSuccess(`Appointment for ${newAppointment.patient.fullName} booked successfully!`);
  };

  const updateAppointmentStatus = (appointmentId: string, status: Appointment["status"]) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === appointmentId ? { ...app, status } : app
      )
    );
    showSuccess(`Appointment status updated to ${status}!`);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, updateAppointmentStatus }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointmentContext must be used within an AppointmentProvider");
  }
  return context;
};