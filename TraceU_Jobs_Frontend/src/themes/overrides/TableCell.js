// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
  const commonCell = {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    '&:not(:last-of-type)': {
      position: 'relative',
      '&.MuiTableCell-stickyHeader': {
        position: 'sticky'
      },
      '&:after': {
        position: 'absolute',
        content: '""',
        backgroundColor: theme.palette.divider,
        width: 1,
        height: 'calc(100% - 30px)',
        right: 0,
        top: 16
      }
    }
  };

  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.8125rem', // 13px (Table Content standard: 13-14px | 400)
          fontWeight: 400,
          fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
          padding: '12px 16px',
          borderColor: '#F1F5F9',
          color: '#334155',
          '&.cell-right': {
            justifyContent: 'flex-end',
            textAlign: 'right',
            '& > *': {
              justifyContent: 'flex-end',
              margin: '0 0 0 auto'
            },
            '& .MuiOutlinedInput-input': {
              textAlign: 'right'
            }
          },
          '&.cell-center': {
            justifyContent: 'center',
            textAlign: 'center',
            '& > *': {
              justifyContent: 'center',
              margin: '0 auto'
            }
          }
        },
        sizeSmall: {
          padding: 8
        },
        head: {
          fontSize: '0.75rem', // 12px (Table Column Headers standard: 12px | 600)
          fontWeight: 600,
          fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
          textTransform: 'none',
          color: '#475569',
          backgroundColor: '#F8FAFC',
          height: 44,
          padding: '10px 16px',
          borderBottom: '1px solid #E2E8F0',
          ...commonCell
        },
        footer: {
          fontSize: '0.75rem',
          fontWeight: 400,
          fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
          textTransform: 'none',
          ...commonCell
        }
      }
    }
  };
}
