import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Elements } from '@stripe/stripe-react-js';
import { loadStripe } from '@stripe/stripe-react-js';
import { AuthProvider } from './context/AuthContext';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Navigation from './components/layout/Navigation';
import './styles/components.css';
import './styles/navigation.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Elements stripe={stripePromise}>
          <div className="app">
            <Navigation />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  localStorage.getItem('token') ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
        </Elements>
      </Router>
    </AuthProvider>
  );
}

export default App; 