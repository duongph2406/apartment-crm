import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock, Phone, Email } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="login-container"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      {/* Left Side - Background Image with Content */}
      <Box
        className="login-left"
        sx={{
          flex: 1,
          minHeight: { xs: '40vh', md: '100vh' },
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { xs: 3, md: 4 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1
          }
        }}
      >
        {/* Main Content Area */}
        <Box sx={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ maxWidth: '500px', color: 'white' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Hệ thống CRM
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600, 
                mb: 4,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Quản lý Căn hộ
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 400, 
                lineHeight: 1.6,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                opacity: 0.9
              }}
            >
              Giải pháp quản lý toàn diện cho các tòa nhà và căn hộ. 
              Tối ưu hóa quy trình quản lý khách thuê, hợp đồng và dịch vụ.
            </Typography>
          </Box>
        </Box>

        {/* Contact Information */}
        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            p: 3,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white', 
              fontWeight: 600, 
              mb: 2,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Thông tin liên hệ
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person sx={{ color: 'white', mr: 1, fontSize: 20 }} />
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                  Phạm Hải Dương
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                <Phone sx={{ color: 'white', mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  0362406812
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person sx={{ color: 'white', mr: 1, fontSize: 20 }} />
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                  Nguyễn Thị Hà
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                <Phone sx={{ color: 'white', mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  0982717981
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        className="login-right"
        sx={{
          width: { xs: '100%', md: '450px' },
          minHeight: { xs: '60vh', md: '100vh' },
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, md: 4 },
          position: 'relative'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#1e293b',
                mb: 1
              }}
            >
              Welcome back!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please enter your credentials to sign in!
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#475569' }}>
              User Name
            </Typography>
            <TextField
              fullWidth
              placeholder="admin"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#e2e8f0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#667eea'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#94a3b8', fontSize: 20 }} />
                  </InputAdornment>
                )
              }}
            />

            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#475569' }}>
              Password
            </Typography>
            <TextField
              fullWidth
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#e2e8f0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#667eea'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#94a3b8', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#94a3b8' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ 
                      color: '#94a3b8',
                      '&.Mui-checked': {
                        color: '#667eea'
                      }
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Remember Me
                  </Typography>
                }
              />
              <Link 
                href="#" 
                sx={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 2,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #4318FF 0%, #9F7AEA 100%)',
                boxShadow: '0 4px 14px rgba(67, 24, 255, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3311CC 0%, #8B5CF6 100%)',
                  boxShadow: '0 6px 20px rgba(67, 24, 255, 0.5)',
                },
                '&:disabled': {
                  background: 'rgba(67, 24, 255, 0.5)',
                }
              }}
            >
              {loading ? 'Signing In...' : 'Sign In →'}
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account yet?{' '}
              <Link 
                href="#" 
                sx={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>

          {/* Demo Accounts */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(102, 126, 234, 0.05)', borderRadius: 3, border: '1px solid rgba(102, 126, 234, 0.1)' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
              🚀 Demo Accounts:
            </Typography>
            <Box sx={{ mt: 2, space: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Admin:</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'rgba(102, 126, 234, 0.1)', px: 1.5, py: 0.5, borderRadius: 2 }}>
                  admin / admin123
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Manager:</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'rgba(102, 126, 234, 0.1)', px: 1.5, py: 0.5, borderRadius: 2 }}>
                  manager / manager123
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Tenant:</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'rgba(102, 126, 234, 0.1)', px: 1.5, py: 0.5, borderRadius: 2 }}>
                  tenant1 / tenant123
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;