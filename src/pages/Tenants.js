import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Fab,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar
} from '@mui/material';
import { Add, Edit, Delete, Person, Phone, Email } from '@mui/icons-material';
import { TENANTS, ROOMS } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Tenants = () => {
  const { user } = useAuth();
  const [tenants, setTenants] = useState(TENANTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idCard: '',
    roomId: '',
    moveInDate: '',
    status: 'active'
  });

  const canEdit = user?.role === 'admin' || user?.role === 'manager';
  const canDelete = user?.role === 'admin';

  const availableRooms = ROOMS.filter(room => 
    room.status === 'available' || 
    (selectedTenant && room.id === selectedTenant.roomId)
  );

  const handleAdd = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      idCard: '',
      roomId: '',
      moveInDate: '',
      status: 'active'
    });
    setSelectedTenant(null);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleEdit = (tenant) => {
    setSelectedTenant(tenant);
    setFormData(tenant);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleView = (tenant) => {
    setSelectedTenant(tenant);
    setFormData(tenant);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedTenant) {
      // Edit existing tenant
      const updatedTenants = tenants.map(tenant =>
        tenant.id === selectedTenant.id ? { ...formData, id: selectedTenant.id } : tenant
      );
      setTenants(updatedTenants);
    } else {
      // Add new tenant
      const newTenant = {
        ...formData,
        id: Math.max(...tenants.map(t => t.id)) + 1
      };
      setTenants([...tenants, newTenant]);
    }
    handleClose();
  };

  const handleDelete = (tenantId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách thuê này?')) {
      setTenants(tenants.filter(tenant => tenant.id !== tenantId));
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedTenant(null);
    setEditMode(false);
  };

  const getRoomInfo = (roomId) => {
    return ROOMS.find(room => room.id === roomId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Đang thuê';
      case 'inactive': return 'Đã chuyển đi';
      case 'pending': return 'Chờ xử lý';
      default: return status;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Quản lý Khách thuê
        </Typography>
        {canEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            Thêm khách thuê
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {tenants.map((tenant) => {
          const room = getRoomInfo(tenant.roomId);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={tenant.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => handleView(tenant)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#667eea' }}>
                      <Person />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {tenant.name}
                      </Typography>
                      <Chip
                        label={getStatusText(tenant.status)}
                        color={getStatusColor(tenant.status)}
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {tenant.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {tenant.email}
                      </Typography>
                    </Box>
                  </Box>

                  {room && (
                    <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Phòng: {room.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Diện tích: {room.area}m² - {room.price.toLocaleString()}đ
                      </Typography>
                    </Box>
                  )}

                  {canEdit && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(tenant);
                        }}
                      >
                        Sửa
                      </Button>
                      {canDelete && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Delete />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(tenant.id);
                          }}
                        >
                          Xóa
                        </Button>
                      )}
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
          {editMode 
            ? (selectedTenant ? 'Chỉnh sửa khách thuê' : 'Thêm khách thuê mới')
            : 'Thông tin khách thuê'
          }
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Họ và tên"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
              required
            />
            
            <TextField
              fullWidth
              label="Số điện thoại"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
              required
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
              required
            />
            
            <TextField
              fullWidth
              label="CMND/CCCD"
              value={formData.idCard}
              onChange={(e) => setFormData({...formData, idCard: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
              required
            />
            
            <TextField
              fullWidth
              select
              label="Phòng"
              value={formData.roomId}
              onChange={(e) => setFormData({...formData, roomId: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
              required
            >
              {availableRooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  Phòng {room.id} - {room.area}m² - {room.price.toLocaleString()}đ
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              fullWidth
              label="Ngày vào ở"
              type="date"
              value={formData.moveInDate}
              onChange={(e) => setFormData({...formData, moveInDate: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              required
            />
            
            <TextField
              fullWidth
              select
              label="Trạng thái"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
            >
              <MenuItem value="active">Đang thuê</MenuItem>
              <MenuItem value="inactive">Đã chuyển đi</MenuItem>
              <MenuItem value="pending">Chờ xử lý</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>
            {editMode ? 'Hủy' : 'Đóng'}
          </Button>
          {editMode && (
            <Button onClick={handleSave} variant="contained">
              {selectedTenant ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tenants;