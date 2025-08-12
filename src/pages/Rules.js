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
import { mockRules } from '../utils/mockData';

const Rules = () => {
  const { user } = useAuth();
  const [rules, setRules] = useState(mockRules);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    isActive: true
  });

  const handleOpenDialog = (rule = null) => {
    if (rule) {
      setSelectedRule(rule);
      setFormData(rule);
    } else {
      setSelectedRule(null);
      setFormData({
        title: '',
        content: '',
        category: 'general',
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRule(null);
  };

  const handleSave = () => {
    if (selectedRule) {
      setRules(rules.map(rule => 
        rule.id === selectedRule.id 
          ? { ...formData, id: selectedRule.id } 
          : rule
      ));
    } else {
      const newRule = {
        ...formData,
        id: Math.max(...rules.map(r => r.id)) + 1
      };
      setRules([...rules, newRule]);
    }
    handleCloseDialog();
  };

  const handleDelete = (ruleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa quy định này?')) {
      setRules(rules.filter(rule => rule.id !== ruleId));
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'noise': return 'warning';
      case 'visitors': return 'info';
      case 'parking': return 'success';
      case 'pets': return 'secondary';
      case 'safety': return 'error';
      case 'general': return 'primary';
      default: return 'default';
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'noise': return 'Tiếng ồn';
      case 'visitors': return 'Khách';
      case 'parking': return 'Gửi xe';
      case 'pets': return 'Thú cưng';
      case 'safety': return 'An toàn';
      case 'general': return 'Chung';
      default: return category;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Nội quy & Quy định</Typography>
        {canAccess(user?.role, PERMISSIONS.CREATE_RULE) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Thêm quy định
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {rules.map((rule) => (
          <Grid item xs={12} md={6} key={rule.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" gutterBottom>
                    {rule.title}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Chip
                      label={getCategoryText(rule.category)}
                      color={getCategoryColor(rule.category)}
                      size="small"
                    />
                    <Chip
                      label={rule.isActive ? 'Hiệu lực' : 'Tạm dừng'}
                      color={rule.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  {rule.content}
                </Typography>

                {canAccess(user?.role, [PERMISSIONS.EDIT_RULE, PERMISSIONS.DELETE_RULE]) && (
                  <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                    <IconButton size="small" color="info">
                      <Visibility />
                    </IconButton>
                    
                    {canAccess(user?.role, PERMISSIONS.EDIT_RULE) && (
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleOpenDialog(rule)}
                      >
                        <Edit />
                      </IconButton>
                    )}
                    
                    {canAccess(user?.role, PERMISSIONS.DELETE_RULE) && (
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDelete(rule.id)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog thêm/sửa quy định */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRule ? 'Chỉnh sửa quy định' : 'Thêm quy định mới'}
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
              label="Danh mục"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <MenuItem value="general">Chung</MenuItem>
              <MenuItem value="noise">Tiếng ồn</MenuItem>
              <MenuItem value="visitors">Khách</MenuItem>
              <MenuItem value="parking">Gửi xe</MenuItem>
              <MenuItem value="pets">Thú cưng</MenuItem>
              <MenuItem value="safety">An toàn</MenuItem>
            </TextField>
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
              }
              label="Áp dụng quy định"
            />
            
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Nội dung quy định"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedRule ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rules;