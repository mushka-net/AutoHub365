import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { ICar } from '../../components/types';
import { useParams } from 'react-router-dom';

export default function Car() {
  const car = {
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
  };
  return (
    <main>
      <Container sx={{ py: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">
            {car.brand} {car.model} {car.year}
          </Typography>
          <Button variant="contained" color="success">
            Buy now
          </Button>
        </Stack>
        <Typography variant="h4" sx={{ color: '#3c9806' }}>
          {car.price}$
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '900px',
            height: '500px',
            mx: 'auto',
            borderRadius: '15px',
            overflow: 'hidden',
          }}
        >
          <img
            src={car.image}
            alt="Picture of the car"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Box sx={{ mr: 4 }}>
            <Typography>Mileage</Typography>
            <Typography>Engine</Typography>
            <Typography>Transmission</Typography>
            <Typography>Color</Typography>
          </Box>
          <Box>
            <Typography>{car.mileage} km</Typography>
            <Typography>
              {car.engine_type}, {car.engine_capacity} L
            </Typography>
            <Typography>{car.transmission_type}</Typography>
            <Typography>{car.color}</Typography>
          </Box>
        </Box>
        <Typography>{car.description}</Typography>
      </Container>
    </main>
  );
}
