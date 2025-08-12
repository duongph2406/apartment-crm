import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { canAccess, PERMISSIONS } from '../utils/permissions';
import { mockNotifications } from '../utils/mockData';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    targetRole: 'all',
    isActive: true
  });

  const handleOpenDialog = (notification = null) => {
    if (notification) {
      setSelectedNotification(notification);
      setFormData(notification);
    } else {
      setSelectedNotification(null);
      setFormData({
        title: '',
        content: '',
        type: 'general',
        targetRole: 'all',
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNotification(null);
  };

  const handleSave = () => {
    if (selectedNotification) {
      setNotifications(notifications.map(notification => 
        notification.id === selectedNotification.id 
          ? { ...formData, id: selectedNotification.id } 
          : notification
      ));
    } else {
      const newNotification = {
        ...formData,
        id: Math.max(...notifications.map(n => n.id)) + 1,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setNotifications([...notifications, newNotification]);
    }
    handleCloseDialog();
  };

  const handleDelete = (notificationId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'maintenance': return 'warning';
      case 'payment': return 'info';
      case 'emergency': return 'error';
      case 'general': return 'primary';
      default: return 'default';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'maintenance': return 'Bảo trì';
      case 'payment': return 'Thanh toán';
      case 'emergency': return 'Khẩn cấp';
      case 'general': return 'Thông báo chung';
      default: return type;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Quản lý thông báo</Typography>
        {canAccess(user?.role, PERMISSIONS.CREATE_NOTIFICATION) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Tạo thông báo
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {notifications.map((notification) => (
          <Grid item xs={12} md={6} key={notification.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" gutterBottom>
                    {notification.title}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Chip
                      label={getTypeText(notification.type)}
                      color={getTypeColor(notification.type)}
                      size="small"
                    />
                    <Chip
                      label={notification.isActive ? 'Hoạt động' : 'Tạm dừng'}
                      color={notification.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  {notification.content}
                </Typography>
                
                <Typography variant="caption" color="textSecondary">
                  Ngày tạo: {new Date(notification.createdDate).toLocaleDateString('vi-VN')}
                </Typography>
                
                <Typography variant="caption" color="textSecondary" display="block">
                  Đối tượng: {notification.targetRole === 'all' ? 'Tất cả' : notification.targetRole}
                </Typography>

                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                  <IconButton size="small" color="info">
                    <Visibility />
                  </IconButton>
                  
                  {canAccess(user?.role, PERMISSIONS.EDIT_NOTIFICATION) && (
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog(notification)}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  
                  {canAccess(user?.role, PERMISSIONS.DELETE_NOTIFICATION) && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog thêm/sửa thông báo */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedNotification ? 'Chỉnh sửa thông báo' : 'Tạo thông báo mới'}
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
            
            <TextField
              fullWidth
              select
              label="Loại thông báo"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <MenuItem value="general">Thông báo chung</MenuItem>
              <MenuItem value="maintenance">Bảo trì</MenuItem>
              <MenuItem value="payment">Thanh toán</MenuItem>
              <MenuItem value="emergency">Khẩn cấp</MenuItem>
            </TextField>
            
            <TextField
              fullWidth
              select
              label="Đối tượng"
              value={formData.targetRole}
              onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="tenant">Khách thuê</MenuItem>
              <MenuItem value="manager">Quản lý</MenuItem>
            </TextField>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Nội dung"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              sx={{ gridColumn: 'span 2' }}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
              }
              label="Kích hoạt thông báo"
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedNotification ? 'Cập nhật' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;