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
import { mockIncidents, mockTenants, mockRooms } from '../utils/mockData';

const Incidents = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState(mockIncidents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [formData, setFormData] = useState({
    tenantId: '',
    roomId: '',
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: 'equipment'
  });

  // Lọc sự cố theo quyền của user
  const filteredIncidents = user?.role === 'tenant' 
    ? incidents.filter(incident => incident.tenantId === user.id)
    : incidents;

  const handleOpenDialog = (incident = null) => {
    if (incident) {
      setSelectedIncident(incident);
      setFormData(incident);
    } else {
      setSelectedIncident(null);
      setFormData({
        tenantId: user?.role === 'tenant' ? user.id : '',
        roomId: user?.role === 'tenant' ? user.roomId : '',
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        category: 'equipment'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIncident(null);
  };

  const handleSave = () => {
    if (selectedIncident) {
      setIncidents(incidents.map(incident => 
        incident.id === selectedIncident.id 
          ? { 
              ...formData, 
              id: selectedIncident.id,
              tenantId: parseInt(formData.tenantId),
              roomId: parseInt(formData.roomId)
            } 
          : incident
      ));
    } else {
      const newIncident = {
        ...formData,
        id: Math.max(...incidents.map(i => i.id)) + 1,
        tenantId: parseInt(formData.tenantId),
        roomId: parseInt(formData.roomId),
        reportDate: new Date().toISOString().split('T')[0]
      };
      setIncidents([...incidents, newIncident]);
    }
    handleCloseDialog();
  };

  const handleDelete = (incidentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa báo cáo sự cố này?')) {
      setIncidents(incidents.filter(incident => incident.id !== incidentId));
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
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'in_progress': return 'Đang xử lý';
      case 'resolved': return 'Đã giải quyết';
      case 'closed': return 'Đã đóng';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'low': return 'Thấp';
      case 'medium': return 'Trung bình';
      case 'high': return 'Cao';
      default: return priority;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Báo cáo sự cố</Typography>
        {canAccess(user?.role, PERMISSIONS.CREATE_INCIDENT) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Báo cáo sự cố
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Khách thuê</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Mức độ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày báo cáo</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{getTenantName(incident.tenantId)}</TableCell>
                <TableCell>Phòng {getRoomNumber(incident.roomId)}</TableCell>
                <TableCell>
                  <Chip
                    label={getPriorityText(incident.priority)}
                    color={getPriorityColor(incident.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(incident.status)}
                    color={getStatusColor(incident.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(incident.reportDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="info">
                    <Visibility />
                  </IconButton>
                  
                  {canAccess(user?.role, PERMISSIONS.EDIT_INCIDENT) && (
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog(incident)}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  
                  {canAccess(user?.role, PERMISSIONS.DELETE_INCIDENT) && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(incident.id)}
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

      {/* Dialog thêm/sửa sự cố */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedIncident ? 'Chỉnh sửa báo cáo sự cố' : 'Báo cáo sự cố mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Tiêu đề"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              sx={{ gridColumn: 'span 2' }}
            />
            
            {user?.role !== 'tenant' && (
              <>
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
              </>
            )}
            
            <TextField
              fullWidth
              select
              label="Danh mục"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <MenuItem value="equipment">Thiết bị</MenuItem>
              <MenuItem value="plumbing">Hệ thống nước</MenuItem>
              <MenuItem value="electrical">Hệ thống điện</MenuItem>
              <MenuItem value="hvac">Điều hòa</MenuItem>
              <MenuItem value="security">An ninh</MenuItem>
              <MenuItem value="other">Khác</MenuItem>
            </TextField>
            
            <TextField
              fullWidth
              select
              label="Mức độ ưu tiên"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <MenuItem value="low">Thấp</MenuItem>
              <MenuItem value="medium">Trung bình</MenuItem>
              <MenuItem value="high">Cao</MenuItem>
            </TextField>
            
            {canAccess(user?.role, PERMISSIONS.EDIT_INCIDENT) && (
              <TextField
                fullWidth
                select
                label="Trạng thái"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                sx={{ gridColumn: 'span 2' }}
              >
                <MenuItem value="pending">Chờ xử lý</MenuItem>
                <MenuItem value="in_progress">Đang xử lý</MenuItem>
                <MenuItem value="resolved">Đã giải quyết</MenuItem>
                <MenuItem value="closed">Đã đóng</MenuItem>
              </TextField>
            )}
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả chi tiết"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedIncident ? 'Cập nhật' : 'Báo cáo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Incidents;