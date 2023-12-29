'use client';

import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Link,
  Modal,
  Typography,
} from '@mui/material';
import Car from '@/components/Car';
import AddCarForm from '@/components/AddCarForm';

const cars = [
  {
    id: '3',
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
    id: '4',
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function MyCars() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main>
      <Container sx={{ my: 2 }}>
        <Stack spacing={2} alignItems="center">
          {cars.map((car) => (
            <Paper
              key={car.id}
              sx={{ width: { sm: '100%', md: '650px' } }}
              elevation={4}
            >
              <Car {...car} />
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  m: 1,
                }}
              >
                <Button variant="text" color="primary" onClick={handleOpen}>
                  Edit
                </Button>
                <Button variant="text" color="error">
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-edit-car"
      >
        <Box sx={style}>
          <AddCarForm isEdit={true} />
        </Box>
      </Modal>
    </main>
  );
}
