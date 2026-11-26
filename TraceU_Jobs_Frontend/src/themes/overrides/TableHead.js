// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableHead(theme) {
  return {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#F8FAFC',
          height: 44,
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0'
        }
      }
    }
  };
}
