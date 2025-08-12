import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Tenants from './pages/Tenants';
import Contracts from './pages/Contracts';
import Invoices from './pages/Invoices';
import Incidents from './pages/Incidents';
import Notifications from './pages/Notifications';
import Rules from './pages/Rules';
import { PERMISSIONS } from './utils/permissions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route 
          path="/rooms" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_ROOMS}>
              <Rooms />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/tenants" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_TENANTS}>
              <Tenants />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/contracts" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_CONTRACTS}>
              <Contracts />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/invoices" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_INVOICES}>
              <Invoices />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/incidents" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_INCIDENTS}>
              <Incidents />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_NOTIFICATIONS}>
              <Notifications />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/rules" 
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_RULES}>
              <Rules />
            </ProtectedRoute>
          } 
        />
        
        {/* Placeholder routes for other pages */}
        <Route path="/feedbacks" element={<div>Phản ánh - Coming soon</div>} />
        <Route path="/expenses" element={<div>Quản lý chi phí - Coming soon</div>} />
        <Route path="/accounts" element={<div>Quản lý tài khoản - Coming soon</div>} />
        <Route path="/system" element={<div>Quản lý hệ thống - Coming soon</div>} />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
