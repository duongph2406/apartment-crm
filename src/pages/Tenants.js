import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { canAccess, PERMISSIONS } from '../utils/permissions';
import { mockTenants, mockRooms } from '../utils/mockData';

const Tenants = () => {
  const { user } = useAuth();
  const [tenants, setTenants] = useState(mockTenants);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idCard: '',
    address: '',
    roomId: '',
    moveInDate: '',
    deposit: '',
    status: 'active'
  });

  const handleOpenDialog = (tenant = null) => {
    if (tenant) {
      setSelectedTenant(tenant);
      setFormData(tenant);
    } else {
      setSelectedTenant(null);
      setFormData({
        name: '',
        phone: '',
        email: '',
        idCard: '',
        address: '',
        roomId: '',
        moveInDate: '',
        deposit: '',
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTenant(null);
  };

  const handleSave = () => {
    if (selectedTenant) {
      setTenants(tenants.map(tenant => 
        tenant.id === selectedTenant.id ? { ...formData, id: selectedTenant.id } : tenant
      ));
    } else {
      const newTenant = {
        ...formData,
        id: Math.max(...tenants.map(t => t.id)) + 1,
        roomId: parseInt(formData.roomId),
        deposit: parseInt(formData.deposit)
      };
      setTenants([...tenants, newTenant]);
    }
    handleCloseDialog();
  };

  const handleDelete = (tenantId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách thuê này?')) {
      setTenants(tenants.filter(tenant => tenant.id !== tenantId));
    }
  };

  const getRoomNumber = (roomId) => {
    const room = mockRooms.find(r => r.id === roomId);
    return room ? room.roomNumber : 'N/A';
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Quản lý khách thuê</Typography>
        {canAccess(user?.role, PERMISSIONS.CREATE_TENANT) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Thêm khách thuê
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Ngày vào ở</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.phone}</TableCell>
                <TableCell>{tenant.email}</TableCell>
                <TableCell>Phòng {getRoomNumber(tenant.roomId)}</TableCell>
                <TableCell>{new Date(tenant.moveInDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(tenant.status)}
                    color={getStatusColor(tenant.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="info">
                    <Visibility />
                  </IconButton>
                  
                  {canAccess(user?.role, PERMISSIONS.EDIT_TENANT) && (
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog(tenant)}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  
                  {canAccess(user?.role, PERMISSIONS.DELETE_TENANT) && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(tenant.id)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog thêm/sửa khách thuê */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTenant ? 'Chỉnh sửa khách thuê' : 'Thêm khách thuê mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Họ tên"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField
              fullWidth
              label="CMND/CCCD"
              value={formData.idCard}
              onChange={(e) => setFormData({...formData, idCard: e.target.value})}
            />
            <TextField
              fullWidth
              label="Địa chỉ"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
            <TextField
              fullWidth
              select
              label="Phòng"
              value={formData.roomId}
              onChange={(e) => setFormData({...formData, roomId: e.target.value})}
            >
              {mockRooms.filter(room => room.status === 'available' || room.id === formData.roomId).map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  Phòng {room.roomNumber} - {room.type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Ngày vào ở"
              type="date"
              value={formData.moveInDate}
              onChange={(e) => setFormData({...formData, moveInDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Tiền cọc (VNĐ)"
              type="number"
              value={formData.deposit}
              onChange={(e) => setFormData({...formData, deposit: e.target.value})}
            />
            <TextField
              fullWidth
              select
              label="Trạng thái"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <MenuItem value="active">Đang thuê</MenuItem>
              <MenuItem value="inactive">Đã chuyển đi</MenuItem>
              <MenuItem value="pending">Chờ xử lý</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedTenant ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tenants;