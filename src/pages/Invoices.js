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
  Chip,
  Grid
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Payment
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { canAccess, PERMISSIONS } from '../utils/permissions';
import { mockInvoices, mockTenants, mockRooms } from '../utils/mockData';

const Invoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState(mockInvoices);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formData, setFormData] = useState({
    tenantId: '',
    roomId: '',
    month: '',
    rent: '',
    electricity: '',
    water: '',
    internet: '',
    parking: '',
    other: '',
    dueDate: '',
    status: 'pending'
  });

  // Lọc hóa đơn theo quyền của user
  const filteredInvoices = user?.role === 'tenant' 
    ? invoices.filter(invoice => invoice.tenantId === user.id)
    : invoices;

  const handleOpenDialog = (invoice = null) => {
    if (invoice) {
      setSelectedInvoice(invoice);
      setFormData({
        ...invoice,
        total: undefined // Không cần total trong form vì sẽ tính tự động
      });
    } else {
      setSelectedInvoice(null);
      setFormData({
        tenantId: '',
        roomId: '',
        month: '',
        rent: '',
        electricity: '',
        water: '',
        internet: '',
        parking: '',
        other: '',
        dueDate: '',
        status: 'pending'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInvoice(null);
  };

  const calculateTotal = () => {
    const rent = parseInt(formData.rent) || 0;
    const electricity = parseInt(formData.electricity) || 0;
    const water = parseInt(formData.water) || 0;
    const internet = parseInt(formData.internet) || 0;
    const parking = parseInt(formData.parking) || 0;
    const other = parseInt(formData.other) || 0;
    
    return rent + electricity + water + internet + parking + other;
  };

  const handleSave = () => {
    const total = calculateTotal();
    
    if (selectedInvoice) {
      setInvoices(invoices.map(invoice => 
        invoice.id === selectedInvoice.id 
          ? { 
              ...formData, 
              id: selectedInvoice.id,
              total,
              tenantId: parseInt(formData.tenantId),
              roomId: parseInt(formData.roomId),
              rent: parseInt(formData.rent),
              electricity: parseInt(formData.electricity),
              water: parseInt(formData.water),
              internet: parseInt(formData.internet),
              parking: parseInt(formData.parking),
              other: parseInt(formData.other)
            } 
          : invoice
      ));
    } else {
      const newInvoice = {
        ...formData,
        id: Math.max(...invoices.map(i => i.id)) + 1,
        total,
        tenantId: parseInt(formData.tenantId),
        roomId: parseInt(formData.roomId),
        rent: parseInt(formData.rent),
        electricity: parseInt(formData.electricity),
        water: parseInt(formData.water),
        internet: parseInt(formData.internet),
        parking: parseInt(formData.parking),
        other: parseInt(formData.other)
      };
      setInvoices([...invoices, newInvoice]);
    }
    handleCloseDialog();
  };

  const handleDelete = (invoiceId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
    }
  };

  const handlePayment = (invoiceId) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId 
        ? { ...invoice, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
        : invoice
    ));
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
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Đã thanh toán';
      case 'pending': return 'Chờ thanh toán';
      case 'overdue': return 'Quá hạn';
      default: return status;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Quản lý hóa đơn</Typography>
        {canAccess(user?.role, PERMISSIONS.CREATE_INVOICE) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Tạo hóa đơn
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tháng</TableCell>
              <TableCell>Khách thuê</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Hạn thanh toán</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.month}</TableCell>
                <TableCell>{getTenantName(invoice.tenantId)}</TableCell>
                <TableCell>Phòng {getRoomNumber(invoice.roomId)}</TableCell>
                <TableCell>{invoice.total.toLocaleString('vi-VN')} VNĐ</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(invoice.status)}
                    color={getStatusColor(invoice.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="info">
                    <Visibility />
                  </IconButton>
                  
                  {canAccess(user?.role, PERMISSIONS.EDIT_INVOICE) && (
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog(invoice)}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  
                  {invoice.status === 'pending' && canAccess(user?.role, PERMISSIONS.EDIT_INVOICE) && (
                    <IconButton 
                      size="small" 
                      color="success"
                      onClick={() => handlePayment(invoice.id)}
                      title="Đánh dấu đã thanh toán"
                    >
                      <Payment />
                    </IconButton>
                  )}
                  
                  {canAccess(user?.role, PERMISSIONS.DELETE_INVOICE) && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(invoice.id)}
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

      {/* Dialog thêm/sửa hóa đơn */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedInvoice ? 'Chỉnh sửa hóa đơn' : 'Tạo hóa đơn mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tháng"
                type="month"
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hạn thanh toán"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tiền thuê phòng"
                type="number"
                value={formData.rent}
                onChange={(e) => setFormData({...formData, rent: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tiền điện"
                type="number"
                value={formData.electricity}
                onChange={(e) => setFormData({...formData, electricity: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tiền nước"
                type="number"
                value={formData.water}
                onChange={(e) => setFormData({...formData, water: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tiền internet"
                type="number"
                value={formData.internet}
                onChange={(e) => setFormData({...formData, internet: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tiền gửi xe"
                type="number"
                value={formData.parking}
                onChange={(e) => setFormData({...formData, parking: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Chi phí khác"
                type="number"
                value={formData.other}
                onChange={(e) => setFormData({...formData, other: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="h6">
                  Tổng cộng: {calculateTotal().toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedInvoice ? 'Cập nhật' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;