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
import { mockContracts, mockTenants, mockRooms } from '../utils/mockData';

const Contracts = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState(mockContracts);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [formData, setFormData] = useState({
    tenantId: '',
    roomId: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    status: 'active',
    terms: ''
  });

  // Lọc hợp đồng theo quyền của user
  const filteredContracts = user?.role === 'tenant' 
    ? contracts.filter(contract => contract.tenantId === user.id)
    : contracts;

  const handleOpenDialog = (contract = null) => {
    if (contract) {
      setSelectedContract(contract);
      setFormData(contract);
    } else {
      setSelectedContract(null);
      setFormData({
        tenantId: '',
        roomId: '',
        startDate: '',
        endDate: '',
        monthlyRent: '',
        deposit: '',
        status: 'active',
        terms: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContract(null);
  };

  const handleSave = () => {
    if (selectedContract) {
      setContracts(contracts.map(contract => 
        contract.id === selectedContract.id 
          ? { 
              ...formData, 
              id: selectedContract.id,
              tenantId: parseInt(formData.tenantId),
              roomId: parseInt(formData.roomId),
              monthlyRent: parseInt(formData.monthlyRent),
              deposit: parseInt(formData.deposit)
            } 
          : contract
      ));
    } else {
      const newContract = {
        ...formData,
        id: Math.max(...contracts.map(c => c.id)) + 1,
        tenantId: parseInt(formData.tenantId),
        roomId: parseInt(formData.roomId),
        monthlyRent: parseInt(formData.monthlyRent),
        deposit: parseInt(formData.deposit)
      };
      setContracts([...contracts, newContract]);
    }
    handleCloseDialog();
  };

  const handleDelete = (contractId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?')) {
      setContracts(contracts.filter(contract => contract.id !== contractId));
    }
  };

  const getTenantName = (tenantId) => {
    const tenant = mockTenants.find(t => t.id === tenantId);
    return tenant ? tenant.name : 'N/A';
  };

  const getRoomNumber = (roomId) => {
    const room = mockRooms.find(r => r.id === roomId);
    return room ? room.roomNumber : 'N/A';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'error';
      case 'terminated': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Đang hiệu lực';
      case 'expired': return 'Hết hạn';
      case 'terminated': return 'Đã chấm dứt';
      default: return status;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Quản lý hợp đồng</Typography>
        {canAccess(user?.role, PERMISSIONS.CREATE_CONTRACT) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Tạo hợp đồng
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Khách thuê</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Tiền thuê/tháng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>{getTenantName(contract.tenantId)}</TableCell>
                <TableCell>Phòng {getRoomNumber(contract.roomId)}</TableCell>
                <TableCell>{new Date(contract.startDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>{new Date(contract.endDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>{contract.monthlyRent.toLocaleString('vi-VN')} VNĐ</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(contract.status)}
                    color={getStatusColor(contract.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="info">
                    <Visibility />
                  </IconButton>
                  
                  {canAccess(user?.role, PERMISSIONS.EDIT_CONTRACT) && (
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog(contract)}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  
                  {canAccess(user?.role, PERMISSIONS.DELETE_CONTRACT) && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(contract.id)}
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

      {/* Dialog thêm/sửa hợp đồng */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedContract ? 'Chỉnh sửa hợp đồng' : 'Tạo hợp đồng mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              select
              label="Khách thuê"
              value={formData.tenantId}
              onChange={(e) => setFormData({...formData, tenantId: e.target.value})}
            >
              {mockTenants.map((tenant) => (
                <MenuItem key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Phòng"
              value={formData.roomId}
              onChange={(e) => setFormData({...formData, roomId: e.target.value})}
            >
              {mockRooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  Phòng {room.roomNumber}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Ngày kết thúc"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Tiền thuê/tháng (VNĐ)"
              type="number"
              value={formData.monthlyRent}
              onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
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
              sx={{ gridColumn: 'span 2' }}
            >
              <MenuItem value="active">Đang hiệu lực</MenuItem>
              <MenuItem value="expired">Hết hạn</MenuItem>
              <MenuItem value="terminated">Đã chấm dứt</MenuItem>
            </TextField>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Điều khoản hợp đồng"
              value={formData.terms}
              onChange={(e) => setFormData({...formData, terms: e.target.value})}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedContract ? 'Cập nhật' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contracts;