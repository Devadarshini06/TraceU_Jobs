import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';

// project imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ reverse, isIcon, sx }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'default',
        userSelect: 'none',
        textDecoration: 'none',
        ...sx
      }}
    >
      {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
    </Box>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any };
