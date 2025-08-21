import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar
} from '@mui/material';
import {
  Home,
  People,
  Receipt,
  TrendingUp,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { ROOMS, TENANTS, INVOICES, INCIDENTS } from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = {
    totalRooms: ROOMS.length,
    occupiedRooms: ROOMS.filter(room => room.status === 'occupied').length,
    totalTenants: TENANTS.length,
    pendingInvoices: INVOICES.filter(invoice => invoice.status === 'pending').length,
    overdueInvoices: INVOICES.filter(invoice => invoice.status === 'overdue').length,
    pendingIncidents: INCIDENTS.filter(incident => incident.status === 'pending').length
  };

  const StatCard = ({ title, value, icon, color = 'primary', trend }) => (
    <Card 
      className="modern-card"
      sx={{ 
        height: '100%', 
        background: `linear-gradient(135deg, ${getGradientColors(color)})`, 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem', fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>
              {value}
            </Typography>
            {trend && (
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1, fontSize: '0.8rem' }}>
                {trend}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '20px',
              p: 2,
              backdropFilter: 'blur(10px)'
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 32 } })}
          </Box>
        </Box>
      </CardContent>
      
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: '40px',
          background: 'rgba(255,255,255,0.1)',
          opacity: 0.5
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: '50px',
          background: 'rgba(255,255,255,0.05)',
          opacity: 0.7
        }}
      />
    </Card>
  );

  const getGradientColors = (color) => {
    switch (color) {
      case 'success': return '#10b981 0%, #059669 100%';
      case 'warning': return '#f59e0b 0%, #d97706 100%';
      case 'error': return '#ef4444 0%, #dc2626 100%';
      case 'info': return '#3b82f6 0%, #1d4ed8 100%';
      default: return '#667eea 0%, #764ba2 100%';
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = 'Chào mừng';
    
    if (hour < 12) greeting = 'Chào buổi sáng';
    else if (hour < 18) greeting = 'Chào buổi chiều';
    else greeting = 'Chào buổi tối';

    return `${greeting}, ${user?.name}!`;
  };

  if (user?.role === 'tenant') {
    const userRoom = ROOMS.find(room => room.id === user.roomId);
    const userInvoices = INVOICES.filter(invoice => invoice.tenantId === user.id);
    const userIncidents = INCIDENTS.filter(incident => incident.tenantId === user.id);

    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          {getWelcomeMessage()}
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Phòng của tôi"
              value={user.roomId}
              icon={<Home />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Diện tích"
              value={`${userRoom?.area}m²`}
              icon={<Home />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Hóa đơn chưa thanh toán"
              value={userInvoices.filter(inv => inv.status !== 'paid').length}
              icon={<Receipt />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Sự cố đang xử lý"
              value={userIncidents.filter(inc => inc.status === 'pending').length}
              icon={<Warning />}
              color="error"
            />
          </Grid>
        </Grid>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin phòng của bạn
          </Typography>
          <Typography variant="body1">
            Phòng: {user.roomId} - Diện tích: {userRoom?.area}m² - Giá thuê: {userRoom?.price?.toLocaleString()}đ/tháng
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="fade-in-up">
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#1e293b',
            mb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {getWelcomeMessage()}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Tổng quan hệ thống quản lý căn hộ
        </Typography>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng số phòng"
            value={stats.totalRooms}
            icon={<Home />}
            color="primary"
            trend="11 phòng được quản lý"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Phòng đã thuê"
            value={stats.occupiedRooms}
            icon={<CheckCircle />}
            color="success"
            trend={`${((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)}% tỷ lệ lấp đầy`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng khách thuê"
            value={stats.totalTenants}
            icon={<People />}
            color="info"
            trend="Khách thuê đang hoạt động"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hóa đơn chưa thanh toán"
            value={stats.pendingInvoices}
            icon={<Receipt />}
            color="warning"
            trend="Cần theo dõi"
          />
        </Grid>
      </Grid>

      {/* Charts and Info */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className="modern-card" sx={{ height: '400px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ mr: 2, color: '#667eea' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Tình trạng phòng
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#f8fafc', borderRadius: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#10b981', mb: 1 }}>
                      {stats.occupiedRooms}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Phòng đã thuê
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#f8fafc', borderRadius: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3b82f6', mb: 1 }}>
                      {stats.totalRooms - stats.occupiedRooms}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Phòng trống
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(102, 126, 234, 0.1)', borderRadius: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#667eea' }}>
                  Tỷ lệ lấp đầy: {((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)}%
                </Typography>
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: 8, 
                    bgcolor: 'rgba(102, 126, 234, 0.2)', 
                    borderRadius: 6,
                    mt: 1,
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      width: `${(stats.occupiedRooms / stats.totalRooms) * 100}%`, 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: 6,
                      transition: 'width 1s ease'
                    }} 
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="modern-card" sx={{ height: '400px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Warning sx={{ mr: 2, color: '#f59e0b' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Cảnh báo hệ thống
                </Typography>
              </Box>
              
              <Box sx={{ space: 2 }}>
                {stats.overdueInvoices > 0 && (
                  <Box 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      bgcolor: 'rgba(239, 68, 68, 0.1)', 
                      borderRadius: 3,
                      border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#dc2626', mb: 1 }}>
                      ⚠️ Hóa đơn quá hạn
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stats.overdueInvoices} hóa đơn cần xử lý ngay
                    </Typography>
                  </Box>
                )}
                
                {stats.pendingIncidents > 0 && (
                  <Box 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      bgcolor: 'rgba(245, 158, 11, 0.1)', 
                      borderRadius: 3,
                      border: '1px solid rgba(245, 158, 11, 0.2)'
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#d97706', mb: 1 }}>
                      🔧 Sự cố chưa xử lý
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stats.pendingIncidents} sự cố đang chờ xử lý
                    </Typography>
                  </Box>
                )}
                
                {stats.overdueInvoices === 0 && stats.pendingIncidents === 0 && (
                  <Box 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      bgcolor: 'rgba(16, 185, 129, 0.1)', 
                      borderRadius: 3,
                      border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#059669' }}>
                      Hệ thống hoạt động tốt
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Không có cảnh báo nào
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;