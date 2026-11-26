// ==============================|| OVERRIDES - FORM HELPER TEXT ||============================== //

export default function FormHelperText() {
  return {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 4,
          marginLeft: 0,
          fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
          fontSize: '0.75rem', // 12px (Helper Text standard: 12px | 400)
          fontWeight: 400
        }
      }
    }
  };
}
