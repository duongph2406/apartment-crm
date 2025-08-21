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
  IconButton,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Receipt, Payment } from '@mui/icons-material';
import { INVOICES, TENANTS, ROOMS } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Invoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState(INVOICES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
    status: 'pending'
  });

  const canEdit = user?.role === 'admin' || user?.role === 'manager';
  const canDelete = user?.role === 'admin';

  const getTenantName = (tenantId) => {
    const tenant = TENANTS.find(t => t.id === tenantId);
    return tenant ? tenant.name : 'N/A';
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

  const calculateTotal = (invoice) => {
    return (invoice.rent || 0) + (invoice.electricity || 0) + (invoice.water || 0) + 
           (invoice.internet || 0) + (invoice.parking || 0);
  };

  const handleAdd = () => {
    setFormData({
      tenantId: '',
      roomId: '',
      month: '',
      rent: '',
      electricity: '',
      water: '',
      internet: '',
      parking: '',
      status: 'pending'
    });
    setSelectedInvoice(null);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setFormData(invoice);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setFormData(invoice);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleMarkAsPaid = (invoiceId) => {
    const updatedInvoices = invoices.map(invoice =>
      invoice.id === invoiceId 
        ? { ...invoice, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
        : invoice
    );
    setInvoices(updatedInvoices);
  };

  const handleSave = () => {
    const calculatedTotal = calculateTotal(formData);
    
    if (selectedInvoice) {
      const updatedInvoices = invoices.map(invoice =>
        invoice.id === selectedInvoice.id 
          ? { ...formData, id: selectedInvoice.id, total: calculatedTotal }
          : invoice
      );
      setInvoices(updatedInvoices);
    } else {
      const newInvoice = {
        ...formData,
        id: Math.max(...invoices.map(i => i.id)) + 1,
        tenantId: parseInt(formData.tenantId),
        rent: parseInt(formData.rent) || 0,
        electricity: parseInt(formData.electricity) || 0,
        water: parseInt(formData.water) || 0,
        internet: parseInt(formData.internet) || 0,
        parking: parseInt(formData.parking) || 0,
        total: calculatedTotal
      };
      setInvoices([...invoices, newInvoice]);
    }
    handleClose();
  };

  const handleDelete = (invoiceId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedInvoice(null);
    setEditMode(false);
  };

  // Statistics
  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Quản lý Hóa đơn
        </Typography>
        {canEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            Tạo hóa đơn mới
          </Button>
        )}
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Đã thu</Typography>
              <Typography variant="h4">{totalRevenue.toLocaleString()}đ</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Chờ thanh toán</Typography>
              <Typography variant="h4">{pendingAmount.toLocaleString()}đ</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Quá hạn</Typography>
              <Typography variant="h4">{overdueAmount.toLocaleString()}đ</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Mã HĐ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Khách thuê</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phòng</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tháng</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} hover>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{getTenantName(invoice.tenantId)}</TableCell>
                <TableCell>{invoice.roomId}</TableCell>
                <TableCell>{invoice.month}</TableCell>
                <TableCell>{invoice.total.toLocaleString()}đ</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(invoice.status)}
                    color={getStatusColor(invoice.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(invoice)} size="small">
                    <Visibility />
                  </IconButton>
                  {canEdit && (
                    <>
                      <IconButton onClick={() => handleEdit(invoice)} size="small">
                        <Edit />
                      </IconButton>
                      {invoice.status !== 'paid' && (
                        <IconButton 
                          onClick={() => handleMarkAsPaid(invoice.id)} 
                          size="small" 
                          color="success"
                          title="Đánh dấu đã thanh toán"
                        >
                          <Payment />
                        </IconButton>
                      )}
                    </>
                  )}
                  {canDelete && (
                    <IconButton onClick={() => handleDelete(invoice.id)} size="small" color="error">
                      <Delete />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Receipt sx={{ mr: 1 }} />
            {editMode 
              ? (selectedInvoice ? 'Chỉnh sửa hóa đơn' : 'Tạo hóa đơn mới')
              : 'Chi tiết hóa đơn'
            }
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                select
                label="Khách thuê"
                value={formData.tenantId}
                onChange={(e) => setFormData({...formData, tenantId: e.target.value})}
                disabled={!editMode}
                required
              >
                {TENANTS.map((tenant) => (
                  <MenuItem key={tenant.id} value={tenant.id}>
                    {tenant.name} - Phòng {tenant.roomId}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                fullWidth
                label="Tháng"
                type="month"
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                disabled={!editMode}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Chi tiết chi phí:</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tiền thuê phòng (VNĐ)"
                  type="number"
                  value={formData.rent}
                  onChange={(e) => setFormData({...formData, rent: e.target.value})}
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tiền điện (VNĐ)"
                  type="number"
                  value={formData.electricity}
                  onChange={(e) => setFormData({...formData, electricity: e.target.value})}
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tiền nước (VNĐ)"
                  type="number"
                  value={formData.water}
                  onChange={(e) => setFormData({...formData, water: e.target.value})}
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tiền internet (VNĐ)"
                  type="number"
                  value={formData.internet}
                  onChange={(e) => setFormData({...formData, internet: e.target.value})}
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phí gửi xe (VNĐ)"
                  type="number"
                  value={formData.parking}
                  onChange={(e) => setFormData({...formData, parking: e.target.value})}
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Trạng thái"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="pending">Chờ thanh toán</MenuItem>
                  <MenuItem value="paid">Đã thanh toán</MenuItem>
                  <MenuItem value="overdue">Quá hạn</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="h6">
                Tổng cộng: {calculateTotal(formData).toLocaleString()}đ
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>
            {editMode ? 'Hủy' : 'Đóng'}
          </Button>
          {editMode && (
            <Button onClick={handleSave} variant="contained">
              {selectedInvoice ? 'Cập nhật' : 'Tạo hóa đơn'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;