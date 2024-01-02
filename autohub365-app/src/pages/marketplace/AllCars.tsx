import { useQuery } from 'react-query';
import { getCars } from '../../services/cars.service';
import { ICar } from '../../types';
import { useState } from 'react';
import CarList from '../../components/CarList';
import CenteredLoadingSpinner from '../../components/CenteredLoadingSpinner';
import CenteredText from '../../components/CenteredText';
import { Alert, Container } from '@mui/material';

export default function AllCars() {
  const [isError, setIsError] = useState(false);
  const [cars, setCars] = useState<ICar[]>([] as ICar[]);

  const { isLoading, isFetching } = useQuery('all-cars', getCars, {
    onSuccess: (response) => {
      setCars(response.data);
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

  if (isLoading || isFetching) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <main>
      {cars.length === 0 && <CenteredText text="No cars found." />}
      <CarList cars={cars} />
    </main>
  );
}
