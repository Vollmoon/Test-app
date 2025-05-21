import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 2,
        px: 3,
        textAlign: 'center',
        bgcolor:'skyblue', 
      }}
    >
      <Typography variant="h6" gutterBottom>
        Connect with us
      </Typography>
      <IconButton
        aria-label="LinkedIn"
        href="https://www.linkedin.com/company/vollmoon-technologies/posts/?feedView=all"
        target="_blank"
        rel="noopener"
        sx={{ color: '#0077B5' }}
      >
        <LinkedInIcon />
      </IconButton>

      <Typography variant="body2" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Vollmoon. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
