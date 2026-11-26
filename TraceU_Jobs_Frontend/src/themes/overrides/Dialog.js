// ==============================|| OVERRIDES - DIALOG & MODALS ||============================== //

export default function Dialog(theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #F1F5F9',
          backgroundImage: 'none'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
          fontSize: '1.125rem', // 18px (H2 Section Heading)
          fontWeight: 600,
          padding: '20px 24px',
          color: '#1E293B'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '20px 24px'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          borderTop: '1px solid #F1F5F9',
          gap: 12
        }
      }
    }
  };
}

