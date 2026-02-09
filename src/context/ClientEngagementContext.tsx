import React, { createContext, useContext, useState, ReactNode } from "react";
import { Message, GroupSession, Program, JournalEntry } from "@/types";
import { showSuccess } from "@/utils/toast";

interface ClientEngagementContextType {
  messages: Message[];
  groupSessions: GroupSession[];
  programs: Program[];
  journalEntries: JournalEntry[];
  sendMessage: (message: Omit<Message, "id" | "timestamp" | "read">) => void;
  markMessageAsRead: (id: string) => void;
  addGroupSession: (session: Omit<GroupSession, "id" | "currentParticipants">) => void;
  joinGroupSession: (sessionId: string, clientId: string) => void;
  addProgram: (program: Omit<Program, "id" | "enrolledClients">) => void;
  enrollInProgram: (programId: string, clientId: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, "id">) => void;
}

const ClientEngagementContext = createContext<ClientEngagementContextType | undefined>(undefined);

const initialGroupSessions: GroupSession[] = [
  {
    id: "gs1",
    name: "Morning Yoga",
    description: "Start your day with energizing yoga practice",
    providerId: "prov4",
    maxParticipants: 15,
    currentParticipants: ["cl1"],
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    duration: 60,
    price: 25,
    sessionType: "in-person",
    status: "scheduled",
  },
];

const initialPrograms: Program[] = [
  {
    id: "prog1",
    name: "8-Week Wellness Transformation",
    description: "Comprehensive program for sustainable health improvements",
    providerId: "prov3",
    duration: 56,
    modules: [
      {
        id: "mod1",
        title: "Nutrition Foundations",
        description: "Understanding macros and meal planning",
        content: "Learn the basics of nutrition...",
        order: 1,
      },
    ],
    price: 499,
    enrolledClients: [],
  },
];

export const ClientEngagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupSessions, setGroupSessions] = useState<GroupSession[]>(initialGroupSessions);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const sendMessage = (messageData: Omit<Message, "id" | "timestamp" | "read">) => {
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      timestamp: new Date(),
      read: false,
      ...messageData,
    };
    setMessages((prev) => [...prev, newMessage]);
    showSuccess("Message sent successfully!");
  };

  const markMessageAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const addGroupSession = (sessionData: Omit<GroupSession, "id" | "currentParticipants">) => {
    const newSession: GroupSession = {
      id: `gs${Date.now()}`,
      currentParticipants: [],
      ...sessionData,
    };
    setGroupSessions((prev) => [...prev, newSession]);
    showSuccess("Group session created successfully!");
  };

  const joinGroupSession = (sessionId: string, clientId: string) => {
    setGroupSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId && session.currentParticipants.length < session.maxParticipants) {
          return {
            ...session,
            currentParticipants: [...session.currentParticipants, clientId],
          };
        }
        return session;
      })
    );
    showSuccess("Successfully joined group session!");
  };

  const addProgram = (programData: Omit<Program, "id" | "enrolledClients">) => {
    const newProgram: Program = {
      id: `prog${Date.now()}`,
      enrolledClients: [],
      ...programData,
    };
    setPrograms((prev) => [...prev, newProgram]);
    showSuccess("Program created successfully!");
  };

  const enrollInProgram = (programId: string, clientId: string) => {
    setPrograms((prev) =>
      prev.map((program) => {
        if (program.id === programId) {
          return {
            ...program,
            enrolledClients: [...program.enrolledClients, clientId],
          };
        }
        return program;
      })
    );
    showSuccess("Successfully enrolled in program!");
  };

  const addJournalEntry = (entryData: Omit<JournalEntry, "id">) => {
    const newEntry: JournalEntry = {
      id: `je${Date.now()}`,
      ...entryData,
    };
    setJournalEntries((prev) => [...prev, newEntry]);
    showSuccess("Journal entry saved successfully!");
  };

  return (
    <ClientEngagementContext.Provider
      value={{
        messages,
        groupSessions,
        programs,
        journalEntries,
        sendMessage,
        markMessageAsRead,
        addGroupSession,
        joinGroupSession,
        addProgram,
        enrollInProgram,
        addJournalEntry,
      }}
    >
      {children}
    </ClientEngagementContext.Provider>
  );
};

export const useClientEngagementContext = () => {
  const context = useContext(ClientEngagementContext);
  if (context === undefined) {
    throw new Error("useClientEngagementContext must be used within a ClientEngagementProvider");
  }
  return context;
};
