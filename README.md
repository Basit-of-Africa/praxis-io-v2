# WellCare - Comprehensive Practice Management System

A modern, full-featured practice management platform for healthcare and wellness professionals. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Overview

WellCare is a comprehensive practice management system designed for diverse care professionals including medical doctors, therapists, nutritionists, yoga instructors, chiropractors, and more. It provides enterprise-grade features for practice management and client engagement.

## ✨ Key Features

### Practice Management
- 👥 **Multi-Role Provider Support** - 12+ healthcare roles supported
- 📋 **Clinical Charting** - SOAP notes, progress notes, assessments
- 💰 **Billing & Payments** - Stripe, Paystack, PayPal integration
- 📊 **Analytics & Reporting** - Revenue, appointments, client metrics
- 🎨 **Custom Branding** - White-label client portal
- ⚡ **Automations** - Reminders, follow-ups, notifications
- 📝 **Templates & Protocols** - Standardized workflows
- 🔗 **Integrations** - Calendar, accounting, telehealth, EHR

### Client Engagement
- 💬 **Secure Messaging** - HIPAA-compliant encrypted chat
- 📹 **Telehealth** - Integrated video consultations
- 📅 **Online Scheduling** - Self-service appointment booking
- 👥 **Group Sessions** - Classes and group therapy
- 📚 **Programs & Courses** - Multi-module educational content
- 📖 **Client Journaling** - Progress tracking and mood logging
- 🔐 **Client Portal** - Secure access to records and resources

## 🏥 Supported Care Roles

- Medical Doctors
- Therapists
- Yoga Instructors
- Mental Health Professionals
- Functional Medicine Practitioners
- Health Coaches
- Nutritionists
- Dietitians
- Personal Trainers
- Nurse Practitioners
- Naturopathic Doctors
- Chiropractors

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your Paystack public key and other credentials

# Start development server
pnpm dev
```

Visit `http://localhost:8080` to see the application.

### Build for Production

```bash
pnpm build
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Custom components
├── context/         # React Context providers
│   ├── ClientContext.tsx
│   ├── AppointmentContext.tsx
│   ├── ProviderContext.tsx
│   ├── PracticeContext.tsx
│   └── ClientEngagementContext.tsx
├── pages/           # Route pages
│   ├── Dashboard.tsx
│   ├── Providers.tsx
│   ├── Billing.tsx
│   ├── Charting.tsx
│   ├── Messaging.tsx
│   └── ...
├── types/           # TypeScript type definitions
├── lib/             # Utility functions
└── App.tsx          # Main application component
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **State Management**: React Context API
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Notifications**: Sonner

## 💳 Payment Gateways

- **Paystack** (Active) - African markets
- **Stripe** (Available) - Global credit cards and ACH
- **PayPal** (Available) - Global payments

## 🔐 Security

- HIPAA-compliant encrypted messaging
- Secure authentication
- HTTPS-only in production
- Data encryption at rest and in transit
- Role-based access control

## 📱 Responsive Design

- Mobile-first approach
- Bottom navigation on mobile devices
- Adaptive layouts for all screen sizes
- Touch-optimized interactions

## 🎨 Customization

### Branding
Customize your practice branding through the settings:
- Logo upload
- Color schemes
- Custom domain
- Email templates
- Booking page messages

### Integrations
Connect with third-party services:
- Google Calendar, Outlook Calendar
- QuickBooks, Xero
- Zoom, Microsoft Teams
- LabCorp, Quest Diagnostics

## 📊 Analytics

Track key metrics:
- Revenue and financial trends
- Appointment completion rates
- Service popularity
- Client retention
- Provider performance

## 🧪 Development

```bash
# Run dev server
pnpm dev

# Type checking
pnpm tsc

# Linting
pnpm lint

# Build
pnpm build

# Preview production build
pnpm preview
```

## 🚀 Deployment

The application is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy!

The `vercel.json` configuration handles SPA routing automatically.

## 📖 Documentation

For detailed feature documentation, see [FEATURES.md](./FEATURES.md)

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 📄 License

[Your License Here]

## 🆘 Support

For issues or questions, please open a GitHub issue or contact support.

---

Built with ❤️ for healthcare and wellness professionals.
