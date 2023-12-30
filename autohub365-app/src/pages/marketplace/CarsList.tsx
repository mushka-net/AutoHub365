import Car from '../../components/Car';
import { Container, Paper, Stack } from '@mui/material';

const cars = [
  {
    id: '1',
    brand: 'BMW',
    model: 'X5',
    year: 2015,
    color: 'black',
    price: 20000,
    mileage: 100000,
    engine_capacity: 3.0,
    engine_type: 'petrol',
    transmission_type: 'automatic',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    image: 'https://i.imgur.com/zz79aJm.jpeg',
  },
  {
    id: '2',
    brand: 'Audi',
    model: 'A6',
    year: 2018,
    color: 'white',
    price: 30000,
    mileage: 50000,
    engine_capacity: 2.0,
    engine_type: 'diesel',
    transmission_type: 'automatic',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    image: 'https://i.imgur.com/bnQxW6X.jpeg',
  },
];

export default function CarsList() {
  return (
    <main>
      <Container sx={{ my: 2 }}>
        <Stack spacing={2} alignItems="center">
          {cars.map((car) => (
            <Paper sx={{ width: { sm: '100%', md: '650px' } }} elevation={4}>
              <Car key={car.id} {...car} />
            </Paper>
          ))}
        </Stack>
      </Container>
    </main>
  );
}
