# VoIP Web Application

A full-stack web application that allows users to register, manage accounts, top up balance, and make phone calls.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)

## Features
- User authentication (register/login)
- Account balance management
- Payment processing with Stripe
- Voice calls using Twilio
- Real-time balance updates
- Secure payment processing
- Mobile-responsive design

## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Payment Processing: Stripe
- Voice Calls: Twilio
- Authentication: JWT
- State Management: Context API
- API Client: Axios

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Stripe Account
- Twilio Account
- npm or yarn package manager

## Installation

### 1. Clone the repository 
    bash
    git clone <repository-url>
    cd voip-webapp

### 2. Install Dependencies

Backend: 
    bash
    cd server
    npm install

Frontend:
    bash
    cd client
    npm install

### 3. Required Dependencies

Backend Dependencies:
    bash
    npm install express mongoose bcryptjs jsonwebtoken cors dotenv stripe twilio

Frontend Dependencies:
    bash
    npm install react react-dom react-router-dom @stripe/react-stripe-js @stripe/stripe-js axios

## Project Structure

plaintext
voip-webapp/
├── client/ # Frontend React application
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── context/ # Context providers
│ │ ├── utils/ # Utility functions
│ │ ├── styles/ # CSS styles
│ │ └── App.js # Main application component
│ └── package.json
│
├── server/ # Backend Node.js application
│ ├── routes/ # API routes
│ ├── models/ # Database models
│ ├── middleware/ # Custom middleware
│ ├── config/ # Configuration files
│ └── server.js # Server entry point
│
└── README.md

## Configuration

### 1. Environment Variables

Backend (.env):
    plaintext
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    TWILIO_ACCOUNT_SID=your_twilio_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number

Frontend (.env):
    plaintext
    REACT_APP_API_URL=http://localhost:5000
    REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

## Running the Application

### Development Mode

1. Start the backend server:
    bash
    cd server
    npm run dev

2. Start the frontend development server:
    bash
    cd client
    npm start

The application will be available at `http://localhost:3000`

### Production Mode

1. Build the frontend:
    bash
    cd client
    npm run build

2. Start the production server:
    bash
    cd server
    npm start

The application will be available at `http://localhost:5000`

## Component Breakdown

### Frontend Components

1. **Auth Components**
   - `Register.js`: Handles user registration
   - `Login.js`: Manages user login
   - Both components use JWT for authentication

2. **Dashboard Components**
   - `Dashboard.js`: Main user interface
   - `TopUpModal.js`: Handles balance top-up with Stripe
   - `Dialer.js`: Phone dialer interface

3. **Layout Components**
   - `Navigation.js`: Top navigation bar
   - Handles routing and authentication state

### Backend Routes

1. **Auth Routes**
   - POST `/api/auth/register`: User registration
   - POST `/api/auth/login`: User login

2. **Payment Routes**
   - POST `/api/payments/topup`: Handle balance top-up

3. **Call Routes**
   - POST `/api/calls/make-call`: Initiate phone calls

## Deployment

### Backend Deployment (Example using Heroku)

1. Create a Heroku account
2. Install Heroku CLI
3. Deploy:
    bash
    heroku login
    heroku create
    git push heroku main

### Frontend Deployment (Example using Netlify)

1. Create a Netlify account
2. Build the frontend:
    bash
    cd client
    npm run build
3. Deploy the `build` folder through Netlify UI or CLI

## Security Considerations

1. JWT token storage in localStorage
2. CORS configuration
3. Environment variables protection
4. API rate limiting
5. Input validation
6. Secure payment processing

## API Documentation

### Authentication Endpoints
plaintext
POST /api/auth/register
Body: {
"email": "user@example.com",
"password": "password",
"fullName": "John Doe"
}
POST /api/auth/login
Body: {
"email": "user@example.com",
"password": "password"
}

### Payment Endpoints
plaintext
POST /api/payments/topup
Headers: {
"Authorization": "Bearer <token>"
}
Body: {
"amount": 100,
"currency": "USD"
}

### Call Endpoints
plaintext
POST /api/calls/make-call
Headers: {
"Authorization": "Bearer <token>"
}
Body: {
"phoneNumber": "+1234567890"
}


## Troubleshooting

Common issues and solutions:

1. **MongoDB Connection Issues**
   - Check MongoDB URI
   - Verify network connectivity
   - Ensure MongoDB service is running

2. **Stripe Integration Issues**
   - Verify Stripe keys
   - Check webhook configuration
   - Test mode vs. Live mode

3. **Twilio Call Issues**
   - Verify Twilio credentials
   - Check phone number format
   - Review Twilio console logs

## Support

For additional support or questions, please create an issue in the repository or contact the development team.
This README provides a comprehensive guide for:
Setting up the development environment
Understanding the application structure
Deploying to production
Troubleshooting common issues
API documentation