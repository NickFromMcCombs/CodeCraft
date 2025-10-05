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
    <AppBar position="static" color="primary" sx={{ backgroundColor: '#a34700' }}>
      <Toolbar sx={{ position: 'relative', minHeight: 64 }}>
        {/* Centered title */}
        <Typography variant="h6" sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', fontWeight: 500 }}>
          Welcome {welcomeName ? `${welcomeName} ` : ''}to Codecraft intranet
        </Typography>
        {/* Right aligned nav */}
        <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 3, fontSize: 14 }}>
          <Link component={RouterLink} color="inherit" underline="none" to="/" sx={{ fontWeight: 500 }}>HOME</Link>
          <Link component={RouterLink} color="inherit" underline="none" to="/employees" sx={{ fontWeight: 500 }}>EMPLOYEE MANAGEMENT</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
