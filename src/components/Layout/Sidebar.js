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
  AccountBalance,
  AccountCircle,
  Settings,
  Logout
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { canAccess, PERMISSIONS } from '../../utils/permissions';

const drawerWidth = 280;

const menuItems = [
  {
    text: 'Trang chủ',
    icon: <Dashboard />,
    path: '/dashboard',
    permission: null
  },
  {
    text: 'Quản lý phòng',
    icon: <Home />,
    path: '/rooms',
    permission: PERMISSIONS.VIEW_ROOMS
  },
  {
    text: 'Quản lý khách thuê',
    icon: <People />,
    path: '/tenants',
    permission: PERMISSIONS.VIEW_TENANTS
  },
  {
    text: 'Quản lý hợp đồng',
    icon: <Description />,
    path: '/contracts',
    permission: PERMISSIONS.VIEW_CONTRACTS
  },
  {
    text: 'Quản lý hóa đơn',
    icon: <Receipt />,
    path: '/invoices',
    permission: PERMISSIONS.VIEW_INVOICES
  },
  {
    text: 'Báo cáo sự cố',
    icon: <ReportProblem />,
    path: '/incidents',
    permission: PERMISSIONS.VIEW_INCIDENTS
  },
  {
    text: 'Phản ánh',
    icon: <Feedback />,
    path: '/feedbacks',
    permission: PERMISSIONS.VIEW_FEEDBACKS
  },
  {
    text: 'Quản lý thông báo',
    icon: <Notifications />,
    path: '/notifications',
    permission: PERMISSIONS.VIEW_NOTIFICATIONS
  },
  {
    text: 'Nội quy & Quy định',
    icon: <Rule />,
    path: '/rules',
    permission: PERMISSIONS.VIEW_RULES
  },
  {
    text: 'Quản lý chi phí',
    icon: <AccountBalance />,
    path: '/expenses',
    permission: PERMISSIONS.VIEW_EXPENSES
  },
  {
    text: 'Quản lý tài khoản',
    icon: <AccountCircle />,
    path: '/accounts',
    permission: PERMISSIONS.VIEW_ACCOUNTS
  },
  {
    text: 'Quản lý hệ thống',
    icon: <Settings />,
    path: '/system',
    permission: PERMISSIONS.VIEW_SYSTEM
  }
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || canAccess(user?.role, item.permission)
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1976d2',
          color: 'white'
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          CRM Quản lý Căn hộ
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          {user?.name} ({user?.role})
        </Typography>
      </Box>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ flexGrow: 1 }}>
        {filteredMenuItems.map((item) => (
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
                }
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
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'white' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;