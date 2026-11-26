import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteError, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';

// assets
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import ReloadOutlined from '@ant-design/icons/ReloadOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';

// project imports
import Logo from 'components/logo';

// ==============================|| ERROR FALLBACK VIEW ||============================== //

export function ErrorView({ error, is404 = false, resetError }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const errorMessage = error?.statusText || error?.message || (is404 ? 'Page not found' : 'An unexpected error occurred.');
  const errorStack = error?.stack || (typeof error === 'string' ? error : JSON.stringify(error, null, 2));
  const isNotFoundError = is404 || error?.status === 404 || String(errorMessage).includes('No route matches URL');

  const handleCopy = () => {
    const textToCopy = `TraceU Error Report:\nPath: ${location.pathname}\nError: ${errorMessage}\n\nStack:\n${errorStack}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleGoHome = () => {
    let portal = 'admin';
    try {
      portal = localStorage.getItem('traceu_current_portal') || 'admin';
    } catch (e) {
      // fallback
    }
    if (location.pathname.startsWith('/candidate')) {
      navigate('/candidate/dashboard');
    } else if (location.pathname.startsWith('/hr') || location.pathname.startsWith('/employer')) {
      navigate('/hr/dashboard');
    } else if (location.pathname.startsWith('/admin')) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f8fafc',
        py: 6,
        px: 2
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            textAlign: 'center',
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07)'
          }}
        >
          {/* Logo Header */}
          <Box sx={{ display: 'inline-flex', mb: 3 }}>
            <Logo />
          </Box>

          {/* Status Badge */}
          <Box sx={{ mb: 2 }}>
            <Chip
              icon={<WarningOutlined style={{ fontSize: 16 }} />}
              label={isNotFoundError ? '404 - Not Found' : 'Application Runtime Notice'}
              color={isNotFoundError ? 'default' : 'warning'}
              sx={{ fontWeight: 600, px: 1, py: 0.5, borderRadius: 2 }}
            />
          </Box>

          {/* Title */}
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 1.5, letterSpacing: '-0.5px' }}>
            {isNotFoundError ? 'Page not found' : 'Something went wrong'}
          </Typography>

          {/* Subtitle */}
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 540, mx: 'auto', mb: 4, lineHeight: 1.6 }}>
            {isNotFoundError
              ? `The page "${location.pathname}" could not be found or may have moved. Please check the URL or return to your portal dashboard.`
              : 'An unexpected application error occurred while rendering this page. Our team has been notified. You can safely reload the page or return to your dashboard.'}
          </Typography>

          {/* Action Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeOutlined />}
              onClick={handleGoHome}
              sx={{
                px: 3.5,
                py: 1.25,
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(83,14,240,0.3)'
              }}
            >
              Dashboard
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ReloadOutlined />}
              onClick={() => {
                if (resetError) resetError();
                window.location.reload();
              }}
              sx={{
                px: 3,
                py: 1.25,
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Reload Page
            </Button>

            <Button
              variant="text"
              size="large"
              startIcon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
              sx={{
                px: 2.5,
                py: 1.25,
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600,
                color: '#64748b'
              }}
            >
              Go Back
            </Button>
          </Stack>

          {/* Error Details Accordion */}
          {error && (
            <Box sx={{ mt: 2, pt: 3, borderTop: '1px solid #f1f5f9' }}>
              <Button
                size="small"
                variant="text"
                onClick={() => setShowDetails(!showDetails)}
                sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.8125rem' }}
              >
                {showDetails ? 'Hide technical details' : 'Show technical details'}
              </Button>

              <Collapse in={showDetails}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2.5,
                    bgcolor: '#0f172a',
                    borderRadius: 2,
                    textAlign: 'left',
                    color: '#e2e8f0',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    overflowX: 'auto',
                    maxHeight: 280
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700, fontFamily: 'monospace' }}>
                      {errorMessage}
                    </Typography>
                    <Button
                      size="small"
                      startIcon={copied ? <CheckOutlined /> : <CopyOutlined />}
                      onClick={handleCopy}
                      sx={{
                        color: copied ? '#4ade80' : '#94a3b8',
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                        p: 0.5
                      }}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </Stack>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#94a3b8' }}>
                    {errorStack}
                  </pre>
                </Box>
              </Collapse>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

ErrorView.propTypes = {
  error: PropTypes.any,
  is404: PropTypes.bool,
  resetError: PropTypes.func
};

// ==============================|| ROUTE ERROR BOUNDARY (FOR REACT ROUTER) ||============================== //

export function RouteErrorBoundary({ is404 = false }) {
  const routeError = useRouteError();
  return <ErrorView error={routeError} is404={is404} />;
}

RouteErrorBoundary.propTypes = {
  is404: PropTypes.bool
};

// ==============================|| REACT CLASS ERROR BOUNDARY ||============================== //

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TraceU Error Boundary caught error:', error, errorInfo);
  }

  resetError() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorView error={this.state.error} resetError={this.resetError} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node
};
