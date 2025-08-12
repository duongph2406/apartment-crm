import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import {
  Home,
  People,
  Receipt,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { mockRooms, mockTenants, mockInvoices, mockIncidents } from '../utils/mockData';

const Dashboard = () => {
  const { user } = useAuth();

  // Tính toán thống kê
  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter(room => room.status === 'occupied').length;
  const availableRooms = mockRooms.filter(room => room.status === 'available').length;
  const totalTenants = mockTenants.length;
  const pendingInvoices = mockInvoices.filter(invoice => invoice.status === 'pending').length;
  const paidInvoices = mockInvoices.filter(invoice => invoice.status === 'paid').length;
  const pendingIncidents = mockIncidents.filter(incident => incident.status === 'pending').length;

  const totalRevenue = mockInvoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.total, 0);

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="h2" color={`${color}.main`}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const recentActivities = [
    { text: 'Hóa đơn tháng 1/2025 đã được tạo', time: '2 giờ trước', type: 'info' },
    { text: 'Sự cố máy lạnh phòng 101 đã được báo cáo', time: '5 giờ trước', type: 'warning' },
    { text: 'Hợp đồng phòng 102 sắp hết hạn', time: '1 ngày trước', type: 'error' },
    { text: 'Thanh toán hóa đơn tháng 12/2024 thành công', time: '2 ngày trước', type: 'success' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Chào mừng, {user?.name}!
      </Typography>

      {/* Thống kê tổng quan */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng số phòng"
            value={totalRooms}
            icon={<Home sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Phòng đã thuê"
            value={occupiedRooms}
            icon={<CheckCircle sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Phòng trống"
            value={availableRooms}
            icon={<Schedule sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Khách thuê"
            value={totalTenants}
            icon={<People sx={{ fontSize: 40 }} />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hóa đơn chưa thanh toán"
            value={pendingInvoices}
            icon={<Receipt sx={{ fontSize: 40 }} />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hóa đơn đã thanh toán"
            value={paidInvoices}
            icon={<CheckCircle sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Sự cố chưa xử lý"
            value={pendingIncidents}
            icon={<Warning sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Doanh thu tháng"
            value={`${(totalRevenue / 1000000).toFixed(1)}M`}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Hoạt động gần đây */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Hoạt động gần đây
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    {activity.type === 'warning' && <Warning color="warning" />}
                    {activity.type === 'error' && <Warning color="error" />}
                    {activity.type === 'success' && <CheckCircle color="success" />}
                    {activity.type === 'info' && <Receipt color="info" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.text}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tình trạng phòng
            </Typography>
            <Box sx={{ mt: 2 }}>
              {mockRooms.map((room) => (
                <Box key={room.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Phòng {room.roomNumber}</Typography>
                  <Chip
                    label={
                      room.status === 'occupied' ? 'Đã thuê' :
                      room.status === 'available' ? 'Trống' : 'Bảo trì'
                    }
                    color={
                      room.status === 'occupied' ? 'success' :
                      room.status === 'available' ? 'primary' : 'warning'
                    }
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;