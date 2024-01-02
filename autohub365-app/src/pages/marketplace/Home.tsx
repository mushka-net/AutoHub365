import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useQuery } from 'react-query';

import SearchForm from '../../components/SearchForm';
import { getCars } from '../../services/cars.service';
import { ICar } from '../../types';

export default function Home() {
  const [cars, setCars] = useState<ICar[]>([] as ICar[]);

  useQuery('cars', () => getCars(), {
    onSuccess: (response) => {
      setCars(response.data);
    },
  });

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
        <SearchForm cars={cars} />
      </Container>
    </main>
  );
}
