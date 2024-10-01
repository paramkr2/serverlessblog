import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

// Sample image for demonstration
const sampleImageUrl = 'https://via.placeholder.com/500';

const HomePage = () => {
  return (
    <>
      {/* Section 1 */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 'bold',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Blog in Nature
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <motion.img
              src={sampleImageUrl}
              alt="Nature"
              style={{ width: '100%', borderRadius: '10px' }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Section 2 */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Typography variant="h2">Second Section Content</Typography>
      </Box>
    </>
  );
};

export default HomePage;
