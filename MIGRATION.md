# Migration Guide - Upgrading to Multi-Role Practice Management

This guide helps you understand the changes and new features in the expanded practice management system.

## Overview of Changes

The application has been significantly expanded from a doctor-only system to support 12+ healthcare and wellness roles with comprehensive practice management and client engagement features.

## Breaking Changes

### 1. Type Definitions

**Before:**
```typescript
// Service only had basic properties
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}
```

**After:**
```typescript
// Service now includes duration and role-specific targeting
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;              // NEW
  providerId?: string;            // NEW
  roleSpecific?: CareRole[];      // NEW
}
```

### 2. Appointment Status

**Before:**
```typescript
status: "booked" | "completed" | "cancelled"
```

**After:**
```typescript
status: "booked" | "completed" | "cancelled" | "no-show"  // Added "no-show"
```

### 3. Context Providers

**New Context Providers Added:**
- `ProviderProvider` - Manages care providers
- `PracticeProvider` - Manages practice-level features
- `ClientEngagementProvider` - Manages client engagement features

**App.tsx Update Required:**

```typescript
// Wrap your app with new providers
<ProviderProvider>
  <PracticeProvider>
    <ClientEngagementProvider>
      <ClientProvider>
        <AppointmentProvider>
          {/* Your app */}
        </AppointmentProvider>
      </ClientProvider>
    </ClientEngagementProvider>
  </PracticeProvider>
</ProviderProvider>
```

## New Features

### 1. Multi-Role Support

You can now add different types of care providers:

```typescript
import { useProviderContext } from "@/context/ProviderContext";

const { addProvider } = useProviderContext();

addProvider({
  fullName: "Dr. Jane Smith",
  email: "jane@clinic.com",
  phone: "555-0100",
  role: "Medical Doctor",
  specialization: "Cardiology",
  licenseNumber: "MD-12345"
});
```

### 2. Enhanced Client Management

Clients now support extended information:

```typescript
interface Client {
  // ... existing fields
  dateOfBirth?: string;           // NEW
  gender?: string;                // NEW
  insuranceProvider?: string;     // NEW
  insurancePolicyNumber?: string; // NEW
  emergencyContact?: {            // NEW
    name: string;
    phone: string;
    relationship: string;
  };
  tags?: string[];                // NEW
}
```

### 3. Practice Management

Access new practice management features:

```typescript
import { usePracticeContext } from "@/context/PracticeContext";

const {
  addProtocol,
  addTemplate,
  addChartNote,
  updateBranding,
  updateIntegration
} = usePracticeContext();
```

### 4. Client Engagement

New client engagement capabilities:

```typescript
import { useClientEngagementContext } from "@/context/ClientEngagementContext";

const {
  sendMessage,           // Secure messaging
  addGroupSession,       // Group classes
  addProgram,           // Educational programs
  addJournalEntry       // Client journaling
} = useClientEngagementContext();
```

## New Routes

Add these routes to your application:

```typescript
<Route path="/providers" element={<Providers />} />
<Route path="/billing" element={<Billing />} />
<Route path="/charting" element={<Charting />} />
<Route path="/messaging" element={<Messaging />} />
<Route path="/group-sessions" element={<GroupSessions />} />
<Route path="/programs" element={<Programs />} />
<Route path="/practice-settings" element={<PracticeSettings />} />
<Route path="/analytics" element={<Analytics />} />
```

## Navigation Updates

The sidebar now includes more items. Update your navigation configuration:

```typescript
const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Calendar", icon: Calendar, path: "/calendar" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Providers", icon: Stethoscope, path: "/providers" },      // NEW
  { name: "Messaging", icon: MessageSquare, path: "/messaging" },    // NEW
  { name: "Group Sessions", icon: UsersRound, path: "/group-sessions" }, // NEW
  { name: "Programs", icon: BookOpen, path: "/programs" },           // NEW
  { name: "Charting", icon: FileText, path: "/charting" },          // NEW
  { name: "Billing", icon: DollarSign, path: "/billing" },          // NEW
  { name: "Analytics", icon: BarChart3, path: "/analytics" },       // NEW
  { name: "Settings", icon: Settings, path: "/settings" },
];
```

## Environment Variables

Add new environment variables:

```bash
# Payment Gateways (existing)
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...

# New Payment Options
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_PAYPAL_CLIENT_ID=...

# Integrations (optional)
VITE_ZOOM_API_KEY=...
VITE_GOOGLE_CALENDAR_API_KEY=...
VITE_TWILIO_ACCOUNT_SID=...
```

## Data Migration

### Existing Appointments

Existing appointments will continue to work, but you may want to add the new fields:

```typescript
// Add session type to existing appointments
appointments.forEach(appointment => {
  if (!appointment.sessionType) {
    appointment.sessionType = "in-person"; // or "telehealth"
  }
});
```

### Services

Update services to include duration:

```typescript
// Add duration to existing services
services.forEach(service => {
  if (!service.duration) {
    service.duration = 30; // default 30 minutes
  }
});
```

## Component Updates

### ServiceSelection Component

Now imports Service type from @/types:

```typescript
import { Service } from "@/types";
```

### ClientContext

ClientContext now uses the Client type from @/types:

```typescript
import { Client } from "@/types";

// Method signatures updated
addClient: (clientData: Omit<Client, "id">) => void;
updateClient: (clientId: string, clientData: Partial<Client>) => void;
```

## Testing Your Migration

1. **Verify Providers Load**
   - Navigate to `/providers`
   - Ensure mock providers display correctly

2. **Test Appointment Booking**
   - Book a new appointment
   - Verify it saves with session type

3. **Check Messaging**
   - Navigate to `/messaging`
   - Verify clients list loads

4. **Test Analytics**
   - Navigate to `/analytics`
   - Ensure charts render correctly

5. **Verify Settings**
   - Navigate to `/settings`
   - Test practice settings configuration

## Common Issues

### Issue: Context Provider Not Found

**Error:** `useProviderContext must be used within a ProviderProvider`

**Solution:** Ensure all new context providers wrap your app in App.tsx

### Issue: Type Errors with Service

**Error:** Property 'duration' does not exist on type 'Service'

**Solution:** Import Service from @/types instead of defining it locally

### Issue: Navigation Items Not Showing

**Error:** Some menu items missing

**Solution:** Check that ScrollArea is imported in Sidebar component

## Rollback Plan

If you need to rollback:

1. Remove new context providers from App.tsx
2. Remove new routes
3. Revert Sidebar to original navigation items
4. Remove new pages from pages directory

## Support

For migration assistance:
- Review FEATURES.md for detailed feature documentation
- Check example implementations in the new pages
- Refer to type definitions in src/types/index.ts

## Next Steps

After migration:

1. **Customize Branding** - Visit `/practice-settings`
2. **Add Providers** - Visit `/providers`
3. **Configure Integrations** - Set up calendar and payment integrations
4. **Create Templates** - Build email and SMS templates
5. **Set Up Automations** - Configure appointment reminders

## Benefits After Migration

- Support for multiple care role types
- Comprehensive billing and invoicing
- Secure HIPAA-compliant messaging
- Group session management
- Educational programs and courses
- Clinical charting and notes
- Advanced analytics and reporting
- Custom branding options
- Multiple payment gateway support
- Integration ecosystem

---

Welcome to the expanded WellCare Practice Management System! 🎉
