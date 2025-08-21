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
          Hóa đơn của tôi
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Theo dõi hóa đơn và lịch sử thanh toán
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card className="modern-card" sx={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500, mb: 1 }}>
                    Đã thanh toán
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {totalPaid.toLocaleString()}đ
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.875rem' }}>
                    {userInvoices.filter(inv => inv.status === 'paid').length} hóa đơn
                  </Typography>
                </Box>
                <Box sx={{ 
                  background: 'rgba(255,255,255,0.15)', 
                  borderRadius: '16px', 
                  p: 2,
                  backdropFilter: 'blur(10px)'
                }}>
                  <Payment sx={{ fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className="modern-card" sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500, mb: 1 }}>
                    Chờ thanh toán
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {totalPending.toLocaleString()}đ
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.875rem' }}>
                    {userInvoices.filter(inv => inv.status === 'pending').length} hóa đơn
                  </Typography>
                </Box>
                <Box sx={{ 
                  background: 'rgba(255,255,255,0.15)', 
                  borderRadius: '16px', 
                  p: 2,
                  backdropFilter: 'blur(10px)'
                }}>
                  <Receipt sx={{ fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className="modern-card" sx={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500, mb: 1 }}>
                    Quá hạn
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {totalOverdue.toLocaleString()}đ
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.875rem' }}>
                    {userInvoices.filter(inv => inv.status === 'overdue').length} hóa đơn
                  </Typography>
                </Box>
                <Box sx={{ 
                  background: 'rgba(255,255,255,0.15)', 
                  borderRadius: '16px', 
                  p: 2,
                  backdropFilter: 'blur(10px)'
                }}>
                  <Receipt sx={{ fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invoices Table */}
      <Card className="modern-card">
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Receipt sx={{ mr: 2, color: '#667eea', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
              Danh sách hóa đơn
            </Typography>
          </Box>
          
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