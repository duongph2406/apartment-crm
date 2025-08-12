import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { canAccess, PERMISSIONS } from '../utils/permissions';
import { mockRooms } from '../utils/mockData';

const Rooms = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState(mockRooms);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    type: '',
    area: '',
    price: '',
    status: 'available',
    description: ''
  });

  const handleOpenDialog = (room = null) => {
    if (room) {
      setSelectedRoom(room);
      setFormData(room);
    } else {
      setSelectedRoom(null);
      setFormData({
        roomNumber: '',
        floor: '',
        type: '',
        area: '',
        price: '',
        status: 'available',
        description: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoom(null);
  };

  const handleSave = () => {
    if (selectedRoom) {
      // Cập nhật phòng
      setRooms(rooms.map(room => 
        room.id === selectedRoom.id ? { ...formData, id: selectedRoom.id } : room
      ));
    } else {
      // Thêm phòng mới
      const newRoom = {
        ...formData,
        id: Math.max(...rooms.map(r => r.id)) + 1,
        area: parseInt(formData.area),
        price: parseInt(formData.price),
        floor: parseInt(formData.floor)
      };
      setRooms([...rooms, newRoom]);
    }
    handleCloseDialog();
  };

  const handleDelete = (roomId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'success';
      case 'available': return 'primary';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'occupied': return 'Đã thuê';
      case 'available': return 'Trống';
      case 'maintenance': return 'Bảo trì';
      default: return status;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Quản lý phòng</Typography>
        {canAccess(user?.role, PERMISSIONS.CREATE_ROOM) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Thêm phòng
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6">
                    Phòng {room.roomNumber}
                  </Typography>
                  <Chip
                    label={getStatusText(room.status)}
                    color={getStatusColor(room.status)}
                    size="small"
                  />
                </Box>
                
                <Typography color="textSecondary" gutterBottom>
                  Tầng {room.floor} • {room.type} • {room.area}m²
                </Typography>
                
                <Typography variant="h6" color="primary" gutterBottom>
                  {room.price.toLocaleString('vi-VN')} VNĐ/tháng
                </Typography>
                
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {room.description}
                </Typography>

                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <IconButton size="small" color="info">
                    <Visibility />
                  </IconButton>
                  
                  {canAccess(user?.role, PERMISSIONS.EDIT_ROOM) && (
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog(room)}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  
                  {canAccess(user?.role, PERMISSIONS.DELETE_ROOM) && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(room.id)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog thêm/sửa phòng */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRoom ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Số phòng"
                value={formData.roomNumber}
                onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tầng"
                type="number"
                value={formData.floor}
                onChange={(e) => setFormData({...formData, floor: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Loại phòng"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <MenuItem value="1PN">1 Phòng ngủ</MenuItem>
                <MenuItem value="2PN">2 Phòng ngủ</MenuItem>
                <MenuItem value="3PN">3 Phòng ngủ</MenuItem>
                <MenuItem value="Studio">Studio</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Diện tích (m²)"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Giá thuê (VNĐ)"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Trạng thái"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <MenuItem value="available">Trống</MenuItem>
                <MenuItem value="occupied">Đã thuê</MenuItem>
                <MenuItem value="maintenance">Bảo trì</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedRoom ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rooms;