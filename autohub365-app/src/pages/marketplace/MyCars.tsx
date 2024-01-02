'use client';

import React from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { getCarsByUserId } from '../../services/cars.service';
import { useStore } from '../../store/store';
import { ICar } from '../../types';
import CenteredLoadingSpinner from '../../components/CenteredLoadingSpinner';
import CarItemManage from '../../components/CarItemManage';
import CenteredText from '../../components/CenteredText';

export default function MyCars() {
  const [isError, setIsError] = React.useState(false);
  const [myCars, setMyCars] = React.useState<ICar[]>([] as ICar[]);

  const { userId } = useStore();

  const { isLoading } = useQuery('my-cars', () => getCarsByUserId(userId!), {
    onSuccess: (response) => {
      setMyCars(response.data);
    },
    onError: () => {
      setIsError(true);
    },
  });

  if (isError) {
    return (
      <Container
        sx={{
          py: 2,
        }}
      >
        <Alert severity="error">Failed to receive data</Alert>
      </Container>
    );
  }

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <main>
      <Container sx={{ my: 2 }}>
        {myCars.length === 0 && <CenteredText text="You have no cars" />}
        <Stack spacing={2} alignItems="center">
          {myCars.map((car) => (
            <Paper key={car.id} sx={{ width: { sm: '100%', md: '650px' } }} elevation={4}>
              <CarItemManage car={car} />
            </Paper>
          ))}
        </Stack>
      </Container>
    </main>
  );
}
