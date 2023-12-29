import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Grid, Paper, Typography, Link } from '@mui/material';
import { ICar } from '@/types';

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
          <Image
            src={image}
            alt="Picture of the car"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>
      </Grid>
      <Grid item flexGrow={1} sx={{ mr: 4, mt: 1 }}>
        <Link
          component={NextLink}
          href={`/cars/${id}`}
          sx={{ textDecoration: 'none' }}
        >
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
