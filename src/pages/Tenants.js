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
    <Box className="fade-in-up">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
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
            Quản lý Khách thuê
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Quản lý thông tin khách thuê và hợp đồng
          </Typography>
        </Box>
        {canEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            className="btn-modern"
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 3,
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }}
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
                className="modern-card"
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => handleView(tenant)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '20px',
                        p: 1.5,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Person sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#1e293b' }}>
                        {tenant.name}
                      </Typography>
                      <Chip
                        label={getStatusText(tenant.status)}
                        color={getStatusColor(tenant.status)}
                        size="small"
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: 3,
                          height: 24
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 3 }}>
                      <Phone sx={{ mr: 2, fontSize: 18, color: '#667eea' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#475569' }}>
                        {tenant.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: 3 }}>
                      <Email sx={{ mr: 2, fontSize: 18, color: '#667eea' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#475569' }}>
                        {tenant.email}
                      </Typography>
                    </Box>
                  </Box>

                  {room && (
                    <Box 
                      sx={{ 
                        p: 2, 
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', 
                        borderRadius: 3,
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        mb: 2
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#667eea', mb: 0.5 }}>
                        Phòng {room.id}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                        {room.area}m² • {room.price.toLocaleString()}đ/tháng
                      </Typography>
                    </Box>
                  )}

                  {canEdit && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(tenant);
                        }}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          color: '#667eea',
                          '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.1)'
                          }
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
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: 'rgba(239, 68, 68, 0.1)'
                            }
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