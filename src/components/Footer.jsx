import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box component="footer" sx={{ mt: 'auto', backgroundColor: '#a34700', color: '#fff', py: 2, textAlign: 'center' }}>
      <Typography variant="body2">&copy; {year} CodeCraft Labs. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
