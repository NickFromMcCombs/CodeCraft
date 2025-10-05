import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { welcomeName } = useContext(AppContext);
  return (
  <AppBar position="static" color="primary">
      <Toolbar sx={{ position: 'relative', minHeight: 64 }}>
        {/* Centered title */}
    <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            letterSpacing: '.5px',
      color: '#ffffff !important',
      textShadow: '0 1px 2px rgba(0,0,0,0.6)'
          }}
        >
          Welcome {welcomeName ? `${welcomeName} ` : ''}to Codecraft intranet
        </Typography>
        {/* Right aligned nav */}
        <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 3, fontSize: 14 }}>
          <Link component={RouterLink} underline="none" to="/" sx={{ fontWeight: 500, color: '#ffffff !important' }}>HOME</Link>
          <Link component={RouterLink} underline="none" to="/employees" sx={{ fontWeight: 500, color: '#ffffff !important' }}>EMPLOYEE MANAGEMENT</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
