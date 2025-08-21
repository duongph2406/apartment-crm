import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import {
  Dashboard,
  Home,
  People,
  Description,
  Receipt,
  ReportProblem,
  Feedback,
  Notifications,
  Rule,
  AttachMoney,
  AccountCircle,
  Settings,
  ExitToApp,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

const Sidebar = ({ open, collapsed, onClose, onToggleCollapse }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { text: 'Trang chủ', icon: <Dashboard />, path: '/dashboard' },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { text: 'Quản lý phòng', icon: <Home />, path: '/rooms' },
        { text: 'Quản lý khách thuê', icon: <People />, path: '/tenants' },
        { text: 'Quản lý hợp đồng', icon: <Description />, path: '/contracts' },
        { text: 'Quản lý hóa đơn', icon: <Receipt />, path: '/invoices' },
        { text: 'Báo cáo sự cố', icon: <ReportProblem />, path: '/incidents' },
        { text: 'Phản ánh', icon: <Feedback />, path: '/feedbacks' },
        { text: 'Quản lý thông báo', icon: <Notifications />, path: '/notifications' },
        { text: 'Nội quy & Quy định', icon: <Rule />, path: '/rules' },
        { text: 'Quản lý chi phí', icon: <AttachMoney />, path: '/expenses' },
        { text: 'Quản lý tài khoản', icon: <AccountCircle />, path: '/accounts' },
        { text: 'Quản lý hệ thống', icon: <Settings />, path: '/system' }
      ];
    } else if (user?.role === 'manager') {
      return [
        ...baseItems,
        { text: 'Quản lý phòng', icon: <Home />, path: '/rooms' },
        { text: 'Quản lý khách thuê', icon: <People />, path: '/tenants' },
        { text: 'Quản lý hợp đồng', icon: <Description />, path: '/contracts' },
        { text: 'Quản lý hóa đơn', icon: <Receipt />, path: '/invoices' },
        { text: 'Báo cáo sự cố', icon: <ReportProblem />, path: '/incidents' },
        { text: 'Phản ánh', icon: <Feedback />, path: '/feedbacks' },
        { text: 'Quản lý thông báo', icon: <Notifications />, path: '/notifications' },
        { text: 'Nội quy & Quy định', icon: <Rule />, path: '/rules' },
        { text: 'Quản lý chi phí', icon: <AttachMoney />, path: '/expenses' },
        { text: 'Quản lý tài khoản', icon: <AccountCircle />, path: '/accounts' }
      ];
    } else {
      return [
        ...baseItems,
        { text: 'Thông tin phòng', icon: <Home />, path: '/my-room' },
        { text: 'Hợp đồng của tôi', icon: <Description />, path: '/my-contract' },
        { text: 'Hóa đơn của tôi', icon: <Receipt />, path: '/my-invoices' },
        { text: 'Báo cáo sự cố', icon: <ReportProblem />, path: '/incidents' },
        { text: 'Phản ánh', icon: <Feedback />, path: '/feedbacks' },
        { text: 'Thông báo', icon: <Notifications />, path: '/notifications' },
        { text: 'Nội quy & Quy định', icon: <Rule />, path: '/rules' }
      ];
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (!collapsed) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = getMenuItems();

  const SidebarItem = ({ item, isLogout = false }) => {
    const isSelected = location.pathname === item.path;
    
    if (collapsed) {
      return (
        <Tooltip 
          title={item.text} 
          placement="right"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: 'rgba(0,0,0,0.9)',
                fontSize: '0.875rem',
                fontWeight: 500
              }
            }
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={isLogout ? handleLogout : () => handleNavigation(item.path)}
              selected={isSelected}

              sx={{
                minHeight: 56,
                justifyContent: 'center',
                px: 2.5,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    backgroundColor: '#fff',
                    borderRadius: '0 8px 8px 0'
                  }
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.3s ease',
                position: 'relative',
                color: 'white'
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: 'white',
                  minWidth: 0,
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Tooltip>
      );
    }

    return (
      <ListItem disablePadding>
        <ListItemButton
          onClick={isLogout ? handleLogout : () => handleNavigation(item.path)}
          selected={isSelected}
          sx={{
            minHeight: 56,
            '&.Mui-selected': {
              backgroundColor: 'rgba(255,255,255,0.15)',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                backgroundColor: '#fff',
                borderRadius: '0 8px 8px 0'
              }
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
            transition: 'all 0.3s ease',
            position: 'relative',
            color: 'white',
            px: 3
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.text}
            primaryTypographyProps={{
              fontSize: '0.95rem',
              fontWeight: isSelected ? 600 : 400
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1a1d29 0%, #2d3748 50%, #4318FF 100%)',
          color: 'white',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
          borderRight: 'none',
          position: 'relative'
        }
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          p: collapsed ? 1 : 2, 
          textAlign: collapsed ? 'center' : 'left',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between'
        }}
      >
        {!collapsed && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>
              CRM Căn hộ
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
              {user?.name}
            </Typography>
          </Box>
        )}
        
        {collapsed && (
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              width: 40, 
              height: 40,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '16px'
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
        )}
        
        <IconButton
          onClick={onToggleCollapse}
          sx={{ 
            color: 'white',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px'
            }
          }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
      
      {/* Menu Items */}
      <List sx={{ flexGrow: 1, py: 1 }}>
        {menuItems.map((item) => (
          <SidebarItem key={item.text} item={item} />
        ))}
      </List>
      
      {/* Logout */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <SidebarItem 
          item={{ 
            text: 'Đăng xuất', 
            icon: <ExitToApp />, 
            path: '/logout' 
          }} 
          isLogout={true} 
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;