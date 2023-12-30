import { Box, Grid, Paper, Typography, Link } from '@mui/material';
import { ICar } from './types';
import { Link as RouterLink } from 'react-router-dom';

export default function Car(car: ICar) {
  const {
    id,
    brand,
    model,
    year,
    color,
    price,
    mileage,
    engine_capacity,
    engine_type,
    transmission_type,
    description,
    image,
  } = car;
  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item>
        <Box sx={{ position: 'relative', width: '300px', height: '200px' }}>
          <img
            src={image}
            alt="Picture of the car"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Grid>
      <Grid item flexGrow={1} sx={{ mr: 4, mt: 1 }}>
        <Link component={RouterLink} to={`/cars/${id}`} sx={{ textDecoration: 'none' }}>
          <Typography variant="h5">
            {brand} {model} {year}
          </Typography>
        </Link>

        <Typography variant="h6" sx={{ color: '#3c9806' }}>
          {price}$
        </Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Typography>{mileage} km</Typography>
            <Typography>
              {engine_type}, {engine_capacity} L
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{color}</Typography>
            <Typography>{transmission_type}</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '18rem',
          }}
        >
          <Typography noWrap>{description}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
