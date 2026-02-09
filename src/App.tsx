import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import BookAppointment from "./pages/BookAppointment";
import ClientDetails from "./pages/ClientDetails";
import AppointmentDetails from "./pages/AppointmentDetails";
import NotFound from "./pages/NotFound";
import Providers from "./pages/Providers";
import Billing from "./pages/Billing";
import Charting from "./pages/Charting";
import Messaging from "./pages/Messaging";
import GroupSessions from "./pages/GroupSessions";
import Programs from "./pages/Programs";
import PracticeSettings from "./pages/PracticeSettings";
import Analytics from "./pages/Analytics";
import { ClientProvider } from "./context/ClientContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { ProviderProvider } from "./context/ProviderContext";
import { PracticeProvider } from "./context/PracticeContext";
import { ClientEngagementProvider } from "./context/ClientEngagementContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ProviderProvider>
          <PracticeProvider>
            <ClientEngagementProvider>
              <ClientProvider>
                <AppointmentProvider>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/clients/:clientId" element={<ClientDetails />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/book-appointment" element={<BookAppointment />} />
                      <Route path="/appointments/:appointmentId" element={<AppointmentDetails />} />
                      <Route path="/providers" element={<Providers />} />
                      <Route path="/billing" element={<Billing />} />
                      <Route path="/charting" element={<Charting />} />
                      <Route path="/messaging" element={<Messaging />} />
                      <Route path="/group-sessions" element={<GroupSessions />} />
                      <Route path="/programs" element={<Programs />} />
                      <Route path="/practice-settings" element={<PracticeSettings />} />
                      <Route path="/analytics" element={<Analytics />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </AppointmentProvider>
              </ClientProvider>
            </ClientEngagementProvider>
          </PracticeProvider>
        </ProviderProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;