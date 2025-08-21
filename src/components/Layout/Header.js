import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Chip,
  Badge,
  InputBase,
  alpha
} from '@mui/material';
import { 
  Notifications, 
  Search as SearchIcon,
  Settings
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';



const Header = ({ onMenuClick, sidebarCollapsed }) => {
  const { user } = useAuth();

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'manager': return 'warning';
      case 'tenant': return 'success';
      default: return 'default';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'manager': return 'Quản lý';
      case 'tenant': return 'Khách thuê';
      default: return role;
    }
  };

  const getCurrentPageTitle = () => {
    const path = window.location.pathname;
    const titles = {
      '/dashboard': 'Trang chủ',
      '/rooms': 'Quản lý phòng',
      '/tenants': 'Quản lý khách thuê',
      '/contracts': 'Quản lý hợp đồng',
      '/invoices': 'Quản lý hóa đơn',
      '/my-room': 'Phòng của tôi',
      '/my-invoices': 'Hóa đơn của tôi',
      '/incidents': 'Báo cáo sự cố',
      '/feedbacks': 'Phản ánh',
      '/notifications': 'Thông báo',
      '/rules': 'Nội quy & Quy định'
    };
    return titles[path] || 'CRM Quản lý Căn hộ';
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        color: '#333',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important' }}>
        {/* Page Title */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              color: '#333',
              fontSize: '1.25rem'
            }}
          >
            {getCurrentPageTitle()}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            {new Date().toLocaleDateString('vi-VN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 4,
            backgroundColor: alpha('#4318FF', 0.1),
            '&:hover': {
              backgroundColor: alpha('#4318FF', 0.15),
            },
            marginRight: 2,
            width: 'auto',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          <Box
            sx={{
              padding: (theme) => theme.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon sx={{ color: '#4318FF' }} />
          </Box>
          <InputBase
            placeholder="Tìm kiếm..."
            sx={{
              color: 'inherit',
              '& .MuiInputBase-input': {
                padding: (theme) => theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${32}px)`,
                width: '20ch',
                transition: 'width 0.3s ease',
                '&:focus': {
                  width: '30ch',
                },
              },
            }}
          />
        </Box>
        
        {/* Right Side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            sx={{ 
              color: '#4318FF',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: alpha('#4318FF', 0.1),
                borderRadius: '12px'
              }
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton 
            sx={{ 
              color: '#4318FF',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: alpha('#4318FF', 0.1),
                borderRadius: '12px'
              }
            }}
          >
            <Settings />
          </IconButton>
          
          {/* User Info */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              ml: 1,
              p: 1.5,
              borderRadius: 4,
              '&:hover': {
                backgroundColor: alpha('#4318FF', 0.05)
              },
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                {user?.name}
              </Typography>
              <Chip
                label={getRoleLabel(user?.role)}
                color={getRoleColor(user?.role)}
                size="small"
                sx={{ 
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: '12px'
                }}
              />
            </Box>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                background: 'linear-gradient(135deg, #4318FF 0%, #9F7AEA 100%)',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;