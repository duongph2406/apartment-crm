import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Receipt, Payment, Visibility } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { INVOICES } from '../data/mockData';

const MyInvoices = () => {
  const { user } = useAuth();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter invoices for current user
  const userInvoices = INVOICES.filter(invoice => invoice.tenantId === user?.id);

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

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedInvoice(null);
  };

  // Calculate statistics
  const totalPaid = userInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const totalPending = userInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0);
  const totalOverdue = userInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Hóa đơn của tôi
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Đã thanh toán</Typography>
                  <Typography variant="h4">{totalPaid.toLocaleString()}đ</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {userInvoices.filter(inv => inv.status === 'paid').length} hóa đơn
                  </Typography>
                </Box>
                <Payment sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Chờ thanh toán</Typography>
                  <Typography variant="h4">{totalPending.toLocaleString()}đ</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {userInvoices.filter(inv => inv.status === 'pending').length} hóa đơn
                  </Typography>
                </Box>
                <Receipt sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Quá hạn</Typography>
                  <Typography variant="h4">{totalOverdue.toLocaleString()}đ</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {userInvoices.filter(inv => inv.status === 'overdue').length} hóa đơn
                  </Typography>
                </Box>
                <Receipt sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invoices Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Danh sách hóa đơn
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tháng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phòng</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ngày thanh toán</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userInvoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>{invoice.month}</TableCell>
                    <TableCell>{invoice.roomId}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      {invoice.total.toLocaleString()}đ
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(invoice.status)}
                        color={getStatusColor(invoice.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {invoice.paidDate || '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Visibility />}
                        onClick={() => handleViewDetails(invoice)}
                        size="small"
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {userInvoices.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Chưa có hóa đơn nào
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Invoice Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Receipt sx={{ mr: 1 }} />
            Chi tiết hóa đơn tháng {selectedInvoice?.month}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {selectedInvoice && (
            <Box sx={{ pt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Phòng
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedInvoice.roomId}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Tháng
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedInvoice.month}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Chi tiết chi phí:
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tiền thuê phòng:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {selectedInvoice.rent.toLocaleString()}đ
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tiền điện:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {selectedInvoice.electricity.toLocaleString()}đ
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tiền nước:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {selectedInvoice.water.toLocaleString()}đ
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tiền internet:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {selectedInvoice.internet.toLocaleString()}đ
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Phí gửi xe:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {selectedInvoice.parking.toLocaleString()}đ
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    p: 2, 
                    bgcolor: '#f5f5f5', 
                    borderRadius: 1,
                    border: '2px solid #667eea'
                  }}
                >
                  <Typography variant="h6">Tổng cộng:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                    {selectedInvoice.total.toLocaleString()}đ
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1 }}>Trạng thái:</Typography>
                  <Chip
                    label={getStatusText(selectedInvoice.status)}
                    color={getStatusColor(selectedInvoice.status)}
                    size="small"
                  />
                </Box>

                {selectedInvoice.paidDate && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Ngày thanh toán: {selectedInvoice.paidDate}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyInvoices;