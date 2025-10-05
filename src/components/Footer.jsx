import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
  <Box component="footer" sx={{ mt: 'auto', background: 'linear-gradient(90deg,#25313d,#34495e)', color: '#ecf0f1', py: 2, textAlign: 'center' }}>
      <Typography variant="body2">&copy; {year} CodeCraft Labs. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
