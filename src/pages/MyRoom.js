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
    <Box className="fade-in-up">
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
          Thông tin phòng của tôi
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Chi tiết thông tin phòng và tiện nghi
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Room Information */}
        <Grid item xs={12} md={6}>
          <Card className="modern-card" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px',
                    p: 2,
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  <Home sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Phòng {userRoom.id}
                </Typography>
              </Box>

              <Box sx={{ space: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 4, mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#475569' }}>
                    Diện tích:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {userRoom.area}m²
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 4, mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#475569' }}>
                    Tầng:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    Tầng {userRoom.floor}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 4, mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#475569' }}>
                    Giá thuê:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#059669' }}>
                    {userRoom.price.toLocaleString()}đ/tháng
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#475569' }}>
                    Trạng thái:
                  </Typography>
                  <Chip 
                    label="Đang thuê" 
                    color="success" 
                    sx={{ 
                      fontWeight: 600,
                      borderRadius: 3,
                      height: 32
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tenant Information */}
        <Grid item xs={12} md={6}>
          <Card className="modern-card" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    borderRadius: '20px',
                    p: 2,
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(118, 75, 162, 0.3)'
                  }}
                >
                  <Person sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
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
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 3 }}>
                    <Typography variant="body2">Điều hòa</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                      ✓ Có
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 3 }}>
                    <Typography variant="body2">Nóng lạnh</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                      ✓ Có
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 3 }}>
                    <Typography variant="body2">Internet</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                      ✓ Có
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 3 }}>
                    <Typography variant="body2">Gửi xe</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#10b981' }}>
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