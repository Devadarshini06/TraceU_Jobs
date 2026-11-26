// ==============================|| OVERRIDES - ICON BUTTON ||============================== //

export default function IconButton(theme) {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.2s ease-in-out',
          '&.MuiIconButton-loading': {
            pointerEvents: 'none !important',
            '& svg': {
              width: 'inherit !important',
              height: 'inherit !important'
            }
          }
        },
        sizeLarge: {
          width: 44,
          height: 44,
          fontSize: '1.25rem'
        },
        sizeMedium: {
          width: 36,
          height: 36,
          fontSize: '1.125rem'
        },
        sizeSmall: {
          width: 28,
          height: 28,
          fontSize: '0.875rem'
        }
      }
    }
  };
}
