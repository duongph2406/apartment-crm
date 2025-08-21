import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import { Home, Edit, Visibility } from '@mui/icons-material';
import { ROOMS, TENANTS } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Rooms = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState(ROOMS);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'occupied': return 'error';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Trống';
      case 'occupied': return 'Đã thuê';
      case 'maintenance': return 'Bảo trì';
      default: return status;
    }
  };

  const getTenantInfo = (roomId) => {
    return TENANTS.find(tenant => tenant.roomId === roomId);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    const updatedRooms = rooms.map(room => 
      room.id === selectedRoom.id ? selectedRoom : room
    );
    setRooms(updatedRooms);
    setEditMode(false);
    setDialogOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedRoom(null);
    setEditMode(false);
  };

  const canEdit = user?.role === 'admin';

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
          Quản lý Phòng
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Quản lý thông tin và trạng thái các phòng trong tòa nhà
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {rooms.map((room) => {
          const tenant = getTenantInfo(room.id);
          
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
              <Card 
                className="modern-card"
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => handleRoomClick(room)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Home sx={{ mr: 1, color: '#667eea' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Phòng {room.id}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Diện tích: {room.area}m²
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Giá: {room.price.toLocaleString()}đ/tháng
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tầng: {room.floor}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={getStatusText(room.status)}
                      color={getStatusColor(room.status)}
                      size="small"
                    />
                  </Box>

                  {tenant && (
                    <Box sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Khách thuê: {tenant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        SĐT: {tenant.phone}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Thông tin Phòng {selectedRoom?.id}
            </Typography>
            {canEdit && !editMode && (
              <Button startIcon={<Edit />} onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            )}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {selectedRoom && (
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="Diện tích (m²)"
                value={selectedRoom.area}
                onChange={(e) => setSelectedRoom({...selectedRoom, area: parseInt(e.target.value)})}
                disabled={!editMode}
                sx={{ mb: 2 }}
                type="number"
              />
              
              <TextField
                fullWidth
                label="Giá thuê (VNĐ)"
                value={selectedRoom.price}
                onChange={(e) => setSelectedRoom({...selectedRoom, price: parseInt(e.target.value)})}
                disabled={!editMode}
                sx={{ mb: 2 }}
                type="number"
              />
              
              <TextField
                fullWidth
                label="Tầng"
                value={selectedRoom.floor}
                onChange={(e) => setSelectedRoom({...selectedRoom, floor: parseInt(e.target.value)})}
                disabled={!editMode}
                sx={{ mb: 2 }}
                type="number"
              />
              
              <TextField
                fullWidth
                select
                label="Trạng thái"
                value={selectedRoom.status}
                onChange={(e) => setSelectedRoom({...selectedRoom, status: e.target.value})}
                disabled={!editMode}
                sx={{ mb: 2 }}
              >
                <MenuItem value="available">Trống</MenuItem>
                <MenuItem value="occupied">Đã thuê</MenuItem>
                <MenuItem value="maintenance">Bảo trì</MenuItem>
              </TextField>

              {getTenantInfo(selectedRoom.id) && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Thông tin khách thuê:
                  </Typography>
                  {(() => {
                    const tenant = getTenantInfo(selectedRoom.id);
                    return (
                      <>
                        <Typography variant="body2">Tên: {tenant.name}</Typography>
                        <Typography variant="body2">SĐT: {tenant.phone}</Typography>
                        <Typography variant="body2">Email: {tenant.email}</Typography>
                        <Typography variant="body2">Ngày vào: {tenant.moveInDate}</Typography>
                      </>
                    );
                  })()}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>
            {editMode ? 'Hủy' : 'Đóng'}
          </Button>
          {editMode && (
            <Button onClick={handleSave} variant="contained">
              Lưu
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rooms;