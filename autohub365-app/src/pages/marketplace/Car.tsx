import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
} from '@mui/material';
import { ICar, ProfileValues } from '../../types';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCar } from '../../services/cars.service';
import { useState } from 'react';
import { getPersonalInfo } from '../../services/personal.service';
import { useStore } from '../../store/store';
import CenteredLoadingSpinner from '../../components/CenteredLoadingSpinner';
import { useCreateOrderMutation } from '../../lib/react-query';
import { useNavigate } from 'react-router-dom';

export default function Car() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [car, setCar] = useState<ICar>({} as ICar);
  const [ownerInfo, setOwnerInfo] = useState({} as ProfileValues);
  const { userId } = useStore();

  const { id } = useParams<{ id: string }>();

  const { isFetching } = useQuery('car', () => getCar(id!), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      setCar(response.data);
    },
  });

  useQuery('get-owner-personal-info', () => getPersonalInfo(car.user_id), {
    onSuccess: (data) => {
      setOwnerInfo(data);
    },
    enabled: !!car.user_id,
  });

  const { mutate } = useCreateOrderMutation();

  const handleBuy = () => {
    mutate(car.id, {
      onSuccess: () => {
        navigate('/orders');
      },
    });
  };

  return (
    <main>
      {isFetching ? (
        <CenteredLoadingSpinner />
      ) : (
        <>
          <Container sx={{ py: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h3">
                {car.brand} {car.model} {car.year}
              </Typography>
              {car.is_sold ? (
                <Alert
                  severity="error"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>This car is sold</Typography>
                </Alert>
              ) : (
                <>
                  {userId === car.user_id && (
                    <Alert
                      severity="info"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography>You owner of this car</Typography>
                    </Alert>
                  )}
                  {userId !== car.user_id && (
                    <Button variant="contained" color="success" onClick={handleOpen}>
                      Buy now
                    </Button>
                  )}
                </>
              )}
            </Stack>
            <Typography variant="h4" sx={{ color: '#3c9806' }}>
              {car.price}$
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: undefined,
                mx: 'auto',
                my: 3,
              }}
            >
              <img
                src={car.image}
                alt="Picture of the car"
                style={{
                  objectFit: 'cover',
                  borderRadius: 10,
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
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to buy this car?</DialogTitle>
            <DialogContent>
              <Typography variant="h5">
                {car.brand} {car.model} {car.year}
              </Typography>
              <Typography variant="h6" sx={{ color: '#3c9806' }}>
                {car.price}$
              </Typography>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography>{car.mileage} km</Typography>
                  <Typography>
                    {car.engine_type}, {car.engine_capacity} L
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{car.color}</Typography>
                  <Typography>{car.transmission_type}</Typography>
                </Grid>
              </Grid>
              <Typography>
                Owner: {ownerInfo.first_name} {ownerInfo.last_name}
              </Typography>
              <Typography>Phone: {ownerInfo.phone}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color="success" onClick={handleBuy}>
                Buy
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </main>
  );
}
