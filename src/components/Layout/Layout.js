import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Get saved state from localStorage or default to false
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen(true);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Box className="layout-container">
      <Sidebar 
        open={sidebarOpen} 
        collapsed={sidebarCollapsed}
        onClose={handleSidebarClose}
        onToggleCollapse={handleToggleCollapse}
      />
      
      <Box className="main-content">
        <Header 
          onMenuClick={handleMenuClick} 
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <Box
          component="main"
          className="content-area"
          sx={{
            bgcolor: '#f8fafc',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%)',
              pointerEvents: 'none',
              zIndex: 0
            }
          }}
        >
          <Box sx={{ p: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1, minHeight: '100%' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;