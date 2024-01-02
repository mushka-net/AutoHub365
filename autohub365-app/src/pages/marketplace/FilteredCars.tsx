import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCarsFiltered } from '../../services/cars.service';
import { ICar } from '../../types';
import CarList from '../../components/CarList';
import { Alert, Container, Typography } from '@mui/material';
import CenteredLoadingSpinner from '../../components/CenteredLoadingSpinner';

export default function FilteredCars() {
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const parameters = location.state.values;
  const [cars, setCars] = useState<ICar[]>([] as ICar[]);

  const { isLoading, isFetching } = useQuery('cars', () => getCarsFiltered(parameters), {
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
    <Container>
      {!parameters.brand && !parameters.model && !parameters.year ? (
        <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
          No filters
        </Typography>
      ) : (
        <>
          <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
            Filtered by:
          </Typography>
          {parameters.brand && <Typography>Brand: {parameters.brand}</Typography>}
          {parameters.model && <Typography>Model: {parameters.model}</Typography>}
          {parameters.year && <Typography>Year: {parameters.year}</Typography>}
        </>
      )}

      <CarList cars={cars} />
    </Container>
  );
}
