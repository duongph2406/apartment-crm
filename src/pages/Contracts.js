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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Description } from '@mui/icons-material';
import { CONTRACTS, TENANTS, ROOMS } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Contracts = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState(CONTRACTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [formData, setFormData] = useState({
    tenantId: '',
    roomId: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    status: 'active'
  });

  const canEdit = user?.role === 'admin' || user?.role === 'manager';
  const canDelete = user?.role === 'admin';

  const getTenantName = (tenantId) => {
    const tenant = TENANTS.find(t => t.id === tenantId);
    return tenant ? tenant.name : 'N/A';
  };

  const getRoomInfo = (roomId) => {
    const room = ROOMS.find(r => r.id === roomId);
    return room ? `${room.id} (${room.area}m²)` : 'N/A';
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

  const handleAdd = () => {
    setFormData({
      tenantId: '',
      roomId: '',
      startDate: '',
      endDate: '',
      monthlyRent: '',
      deposit: '',
      status: 'active'
    });
    setSelectedContract(null);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleEdit = (contract) => {
    setSelectedContract(contract);
    setFormData(contract);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleView = (contract) => {
    setSelectedContract(contract);
    setFormData(contract);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedContract) {
      const updatedContracts = contracts.map(contract =>
        contract.id === selectedContract.id ? { ...formData, id: selectedContract.id } : contract
      );
      setContracts(updatedContracts);
    } else {
      const newContract = {
        ...formData,
        id: Math.max(...contracts.map(c => c.id)) + 1,
        tenantId: parseInt(formData.tenantId),
        monthlyRent: parseInt(formData.monthlyRent),
        deposit: parseInt(formData.deposit)
      };
      setContracts([...contracts, newContract]);
    }
    handleClose();
  };

  const handleDelete = (contractId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?')) {
      setContracts(contracts.filter(contract => contract.id !== contractId));
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedContract(null);
    setEditMode(false);
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
            Quản lý Hợp đồng
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Quản lý hợp đồng thuê và thời hạn
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
            Tạo hợp đồng mới
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} className="modern-card" sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              '& .MuiTableCell-head': {
                fontWeight: 700,
                color: '#1e293b',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }
            }}>
              <TableCell>Mã HĐ</TableCell>
              <TableCell>Khách thuê</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Tiền thuê</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((contract, index) => (
              <TableRow 
                key={contract.id} 
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    transform: 'scale(1.01)',
                    transition: 'all 0.2s ease'
                  },
                  '& .MuiTableCell-root': {
                    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                    py: 2,
                    fontSize: '0.95rem'
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: 3,
                    px: 1.5,
                    py: 0.5,
                    display: 'inline-block',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}>
                    #{contract.id}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {getTenantName(contract.tenantId)}
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#475569' }}>
                  {getRoomInfo(contract.roomId)}
                </TableCell>
                <TableCell sx={{ color: '#64748b' }}>{contract.startDate}</TableCell>
                <TableCell sx={{ color: '#64748b' }}>{contract.endDate}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#059669' }}>
                  {contract.monthlyRent.toLocaleString()}đ
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(contract.status)}
                    color={getStatusColor(contract.status)}
                    size="small"
                    sx={{ 
                      fontWeight: 600,
                      borderRadius: 3,
                      height: 28
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton 
                      onClick={() => handleView(contract)} 
                      size="small"
                      sx={{
                        color: '#667eea',
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.1)',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                    {canEdit && (
                      <IconButton 
                        onClick={() => handleEdit(contract)} 
                        size="small"
                        sx={{
                          color: '#f59e0b',
                          '&:hover': {
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                    )}
                    {canDelete && (
                      <IconButton 
                        onClick={() => handleDelete(contract.id)} 
                        size="small" 
                        sx={{
                          color: '#ef4444',
                          '&:hover': {
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Description sx={{ mr: 1 }} />
            {editMode 
              ? (selectedContract ? 'Chỉnh sửa hợp đồng' : 'Tạo hợp đồng mới')
              : 'Chi tiết hợp đồng'
            }
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              select
              label="Khách thuê"
              value={formData.tenantId}
              onChange={(e) => setFormData({...formData, tenantId: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
              required
            >
              {TENANTS.map((tenant) => (
                <MenuItem key={tenant.id} value={tenant.id}>
                  {tenant.name} - {tenant.phone}
                </MenuItem>
              ))}
            </TextField>
            
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
              {ROOMS.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  Phòng {room.id} - {room.area}m² - {room.price.toLocaleString()}đ
                </MenuItem>
              ))}
            </TextField>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Ngày bắt đầu"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                disabled={!editMode}
                InputLabelProps={{ shrink: true }}
                required
              />
              
              <TextField
                fullWidth
                label="Ngày kết thúc"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                disabled={!editMode}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Tiền thuê hàng tháng (VNĐ)"
                type="number"
                value={formData.monthlyRent}
                onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                disabled={!editMode}
                required
              />
              
              <TextField
                fullWidth
                label="Tiền cọc (VNĐ)"
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({...formData, deposit: e.target.value})}
                disabled={!editMode}
                required
              />
            </Box>
            
            <TextField
              fullWidth
              select
              label="Trạng thái"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              disabled={!editMode}
              sx={{ mb: 2 }}
            >
              <MenuItem value="active">Đang hiệu lực</MenuItem>
              <MenuItem value="expired">Hết hạn</MenuItem>
              <MenuItem value="terminated">Đã chấm dứt</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>
            {editMode ? 'Hủy' : 'Đóng'}
          </Button>
          {editMode && (
            <Button onClick={handleSave} variant="contained">
              {selectedContract ? 'Cập nhật' : 'Tạo hợp đồng'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contracts;