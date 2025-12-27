# Solar Project

A full-stack application for solar energy monitoring and management with real-time data analytics, anomaly detection, and billing integration.

## Project Structure

```
solar-project/
├── solar-backend/        # Node.js + Express API server
├── solar-data-API/       # Data processing and solar data API
└── solar-frontend/       # React + Vite frontend application
```

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **Payment**: Stripe
- **Task Scheduling**: node-cron
- **API Tunneling**: ngrok (development)

### Data API
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **Data Processing**: date-fns

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form + Zod
- **Visualization**: Recharts
- **Payment**: Stripe Integration
- **Authentication**: Clerk
- **Routing**: React Router

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Clerk project (for authentication)
- Stripe account (for payments)
- ngrok account (for development tunneling)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Dinuvi9170/solar-project.git
cd solar-project
```

2. Install dependencies for each service

**Backend:**
```bash
cd solar-backend
npm install
```

**Data API:**
```bash
cd solar-data-API
npm install
```

**Frontend:**
```bash
cd solar-frontend
npm install
```

### Environment Setup

Create `.env` files in `solar-backend` and `solar-data-API` directories with the required variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# ngrok (development only)
NGROK_TOKEN=your_ngrok_token
```

### Running the Application

**Development Mode:**

Backend:
```bash
cd solar-backend
npm run dev
```

Data API:
```bash
cd solar-data-API
npm run dev
```

Frontend:
```bash
cd solar-frontend
npm run dev
```

**Production Build:**

Backend:
```bash
npm run build
npm start
```

Frontend:
```bash
npm run build
```

## Key Features

- **Real-time Solar Monitoring**: Track solar energy generation and consumption
- **Anomaly Detection**: Automated cron jobs detect unusual patterns
- **User Authentication**: Secure authentication with Clerk
- **Payment Integration**: Stripe integration for billing
- **Data Analytics**: Visualize energy data with interactive charts
- **Responsive UI**: Mobile-friendly React frontend
- **API Documentation**: RESTful API with TypeScript validation (Zod)

## Scripts

### solar-backend
- `npm run dev` - Start development server with nodemon
- `npm run dev:ngrok` - Start ngrok tunnel for backend
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run seed` - Seed database with initial data
- `npm run anomaly-cron` - Run anomaly detection background job

### solar-data-API
- `npm run dev` - Start development server
- `npm run dev:ngrok` - Start ngrok tunnel
- `npm run build` - Build TypeScript
- `npm run seed` - Seed database

### solar-frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Dependencies Overview

### Backend Key Packages
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `@clerk/express` - Authentication middleware
- `stripe` - Payment processing
- `node-cron` - Background job scheduling
- `zod` - Runtime type validation
- `date-fns` - Date utilities

### Frontend Key Packages
- `react` - UI library
- `react-redux` - State management
- `react-router-dom` - Client-side routing
- `@stripe/react-stripe-js` - Stripe payment components
- `recharts` - Data visualization
- `tailwindcss` - CSS framework
- `zod` - Form validation

## Anomaly Detection System

The solar project includes an automated anomaly detection system that monitors solar energy generation data for unusual patterns and potential issues.

### Anomaly Types

#### 1. **Sudden Drop in Generation**
- **Description**: Unexpected significant decrease in solar power generation during peak sunlight hours
- **Detection Technique**:
  - Compare current generation against baseline (rolling 7-day average for same time period)
  - Threshold: Generation drops >40% below expected baseline without weather correlation
  - Statistical method: Z-score analysis on normalized generation data
  - Account for seasonal variations and time-of-day patterns
- **Severity Levels**:
  - 🔴 **High**: >70% drop from baseline for >30 minutes
  - 🟠 **Medium**: 40-70% drop from baseline for >15 minutes
  - 🟡 **Low**: 20-40% drop from baseline (transient fluctuations)
- **User Impact**: Indicates potential equipment malfunction, panel degradation, or panel obstruction. Users should check for debris, dirt buildup, or inverter status. May affect daily energy targets and revenue projections.

#### 2. **Inverter Inefficiency / No Output**
- **Description**: Inverter not converting DC power to AC power effectively or complete failure
- **Detection Technique**:
  - Monitor DC/AC power ratio (should maintain ~90-98% efficiency)
  - Threshold: DC power present but AC output is zero or ratio drops below 80%
  - Duration check: Condition persists for >5 minutes during daylight hours
  - Correlate with weather data to distinguish from natural low-generation periods
- **Severity Levels**:
  - 🔴 **High**: 0% AC output with active DC input for >10 minutes
  - 🟠 **Medium**: AC/DC ratio <85% for >5 minutes
  - 🟡 **Low**: AC/DC ratio 85-90% (minor efficiency loss)
- **User Impact**: Indicates inverter failure or malfunction. Revenue loss from unmonitored power. Users should restart inverter, check error codes, or contact technician. Urgent action required to avoid extended downtime.

#### 3. **Weather Mismatch**
- **Description**: Generation levels inconsistent with actual weather conditions (e.g., high generation on cloudy days or low generation on sunny days)
- **Detection Technique**:
  - Compare generation against irradiance/cloud cover data from weather API
  - Machine learning model trained on historical weather-generation correlation
  - Threshold: Generation outside 2-sigma bounds of expected range for weather conditions
  - Cumulative daily error: Actual generation >20% variance from weather-predicted generation
- **Severity Levels**:
  - 🔴 **High**: Persistent generation >50% above expected for weather conditions (data anomaly/sensor error)
  - 🟠 **Medium**: Generation 20-50% variance from weather-predicted levels
  - 🟡 **Low**: Generation 10-20% variance (minor deviations, monitor)
- **User Impact**: Indicates potential sensor calibration issues, measurement equipment failure, or data quality problems. Users should verify monitoring equipment calibration. May require professional inspection if persistent.

#### 4. **Performance Degradation**
- **Description**: Gradual decline in system efficiency over extended period (weeks/months)
- **Detection Technique**:
  - Linear regression on normalized performance scores over rolling 30-day window
  - Metric: Performance Ratio (actual energy / expected energy normalized for weather)
  - Threshold: >2% month-over-month decline in Performance Ratio
  - Account for seasonal changes and weather normalization
  - Exclude anomalous days (>2 sigma outliers) from trend analysis
- **Severity Levels**:
  - 🔴 **High**: >5% monthly degradation (potential major fault)
  - 🟠 **Medium**: 2-5% monthly degradation (maintenance recommended)
  - 🟡 **Low**: 0.5-2% degradation (normal aging, monitor)
- **User Impact**: Indicates panel soiling, inverter aging, or component wear. Revenue impact accumulates over time. Users should schedule cleaning, servicing, or component replacement. Helps with predictive maintenance planning.

### User Impact & Actions

#### For Each Anomaly Type

**Sudden Drop in Generation**
- *Impact*: Lost revenue, missed daily targets
- *Recommended Actions*:
  - Check for physical obstructions (dirt, leaves, bird droppings)
  - Verify weather conditions (clouds, rain)
  - Check inverter display for error codes
  - Review monitoring equipment readings

**Inverter Inefficiency / No Output**
- *Impact*: Complete or partial revenue loss, system downtime
- *Recommended Actions*:
  - Check inverter power and status lights
  - Restart inverter (turn off/on cycle)
  - Review error codes on inverter display or app
  - Contact qualified technician if issue persists >30 minutes
  - Check electrical connections and breakers

**Weather Mismatch**
- *Impact*: Data reliability issues, inaccurate performance tracking
- *Recommended Actions*:
  - Verify monitoring equipment calibration
  - Compare with nearby weather stations
  - Check for sensor damage or loose connections
  - Request professional calibration if persistent

**Performance Degradation**
- *Impact*: Gradual revenue loss, efficiency decline
- *Recommended Actions*:
  - Schedule professional panel cleaning (monthly or bi-monthly)
  - Arrange inverter inspection and servicing
  - Check for shading from new structures/trees
  - Plan component replacement in maintenance budget


