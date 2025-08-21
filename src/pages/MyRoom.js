import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { Home, Person, CalendarToday } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { ROOMS, CONTRACTS } from '../data/mockData';

const MyRoom = () => {
  const { user } = useAuth();
  
  // Find user's room and contract
  const userRoom = ROOMS.find(room => room.id === user?.roomId);
  const userContract = CONTRACTS.find(contract => contract.tenantId === user?.id);

  if (!userRoom) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Thông tin phòng của tôi
        </Typography>
        <Typography>Không tìm thấy thông tin phòng.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Thông tin phòng của tôi
      </Typography>

      <Grid container spacing={3}>
        {/* Room Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: '#667eea', mr: 2 }}>
                  <Home />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Phòng {userRoom.id}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Diện tích:</strong> {userRoom.area}m²
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Tầng:</strong> {userRoom.floor}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Giá thuê:</strong> {userRoom.price.toLocaleString()}đ/tháng
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Trạng thái:</strong> 
                  <Chip 
                    label="Đang thuê" 
                    color="success" 
                    size="small" 
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tenant Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: '#764ba2', mr: 2 }}>
                  <Person />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Thông tin cá nhân
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Họ và tên:</strong> {user?.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Vai trò:</strong> Khách thuê
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phòng hiện tại:</strong> {user?.roomId}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contract Information */}
        {userContract && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                    <CalendarToday />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Thông tin hợp đồng
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Ngày bắt đầu
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {userContract.startDate}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Ngày kết thúc
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {userContract.endDate}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Tiền thuê hàng tháng
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                      {userContract.monthlyRent.toLocaleString()}đ
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Tiền cọc
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {userContract.deposit.toLocaleString()}đ
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Trạng thái hợp đồng:
                  </Typography>
                  <Chip
                    label="Đang hiệu lực"
                    color="success"
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Room Amenities */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Tiện nghi phòng
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2">Điều hòa</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                      ✓ Có
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2">Nóng lạnh</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                      ✓ Có
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2">Internet</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                      ✓ Có
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2">Gửi xe</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                      ✓ Có
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyRoom;