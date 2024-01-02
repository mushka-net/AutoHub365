import { Container, Paper, Stack } from '@mui/material';
import CarItem from './CarItem';
import { ICar } from '../types';

export default function CarList({ cars }: { cars: ICar[] }) {
  return (
    <Container sx={{ my: 2 }}>
      <Stack spacing={2} alignItems="center">
        {cars.map((car) => {
          return (
            <Paper key={car.id} sx={{ width: { sm: '100%', md: '650px' } }} elevation={4}>
              <CarItem car={car} />
            </Paper>
          );
        })}
      </Stack>
    </Container>
  );
}
