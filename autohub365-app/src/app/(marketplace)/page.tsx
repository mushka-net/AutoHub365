import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';

import SearchForm from '@/components/SearchForm';

export default function Home() {
  return (
    <main>
      <Container sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3">Welcome to AutoHub365!</Typography>
          <Typography variant="h5" sx={{ mt: 1, mb: 4 }}>
            The place where you can find the car of your dreams
          </Typography>
        </Box>
        <SearchForm />
      </Container>
    </main>
  );
}
