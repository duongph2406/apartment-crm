import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Tenants from './pages/Tenants';
import Contracts from './pages/Contracts';
import Invoices from './pages/Invoices';
import MyRoom from './pages/MyRoom';
import MyInvoices from './pages/MyInvoices';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/rooms" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Layout>
                  <Rooms />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/tenants" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Layout>
                  <Tenants />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Placeholder routes for other pages */}
            <Route path="/contracts" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Layout>
                  <Contracts />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/invoices" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Layout>
                  <Invoices />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/my-room" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <Layout>
                  <MyRoom />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/my-contract" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <Layout>
                  <MyRoom />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/my-invoices" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <Layout>
                  <MyInvoices />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/incidents" element={
              <ProtectedRoute>
                <Layout>
                  <div>Báo cáo sự cố - Coming soon</div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/feedbacks" element={
              <ProtectedRoute>
                <Layout>
                  <div>Phản ánh - Coming soon</div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/notifications" element={
              <ProtectedRoute>
                <Layout>
                  <div>Thông báo - Coming soon</div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/rules" element={
              <ProtectedRoute>
                <Layout>
                  <div>Nội quy & Quy định - Coming soon</div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/expenses" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Layout>
                  <div>Quản lý chi phí - Coming soon</div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/accounts" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Layout>
                  <div>Quản lý tài khoản - Coming soon</div>
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/system" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <div>Quản lý hệ thống - Coming soon</div>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
