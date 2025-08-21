import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  Box
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
  ExitToApp
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
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
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = getMenuItems();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          CRM Quản lý Căn hộ
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
          {user?.name} ({user?.role})
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                color: 'white'
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ color: 'white' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;