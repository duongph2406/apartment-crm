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

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card sx={{ height: '100%', background: `linear-gradient(135deg, ${getGradientColors(color)})`, color: 'white' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {title}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const getGradientColors = (color) => {
    switch (color) {
      case 'success': return '#4caf50 0%, #45a049 100%';
      case 'warning': return '#ff9800 0%, #f57c00 100%';
      case 'error': return '#f44336 0%, #d32f2f 100%';
      case 'info': return '#2196f3 0%, #1976d2 100%';
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
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        {getWelcomeMessage()}
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng số phòng"
            value={stats.totalRooms}
            icon={<Home />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Phòng đã thuê"
            value={stats.occupiedRooms}
            icon={<CheckCircle />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng khách thuê"
            value={stats.totalTenants}
            icon={<People />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hóa đơn chưa thanh toán"
            value={stats.pendingInvoices}
            icon={<Receipt />}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
              Tình trạng phòng
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Phòng trống: {stats.totalRooms - stats.occupiedRooms} phòng
              </Typography>
              <Typography variant="body1">
                Phòng đã thuê: {stats.occupiedRooms} phòng
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Tỷ lệ lấp đầy: {((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)}%
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
              Cảnh báo
            </Typography>
            <Box sx={{ mt: 2 }}>
              {stats.overdueInvoices > 0 && (
                <Typography variant="body1" color="error" gutterBottom>
                  ⚠️ {stats.overdueInvoices} hóa đơn quá hạn
                </Typography>
              )}
              {stats.pendingIncidents > 0 && (
                <Typography variant="body1" color="warning.main" gutterBottom>
                  🔧 {stats.pendingIncidents} sự cố chưa xử lý
                </Typography>
              )}
              {stats.overdueInvoices === 0 && stats.pendingIncidents === 0 && (
                <Typography variant="body1" color="success.main">
                  ✅ Không có cảnh báo nào
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;