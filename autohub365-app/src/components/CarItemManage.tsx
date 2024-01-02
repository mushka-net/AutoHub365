import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { ICar } from '../types';

import React from 'react';
import AddCarForm from './AddCarForm';
import CarItem from './CarItem';

import { useDeleteCarMutation } from '../lib/react-query';
import { useQueryClient } from 'react-query';

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

export default function CarItemManage({ car }: { car: ICar }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useDeleteCarMutation();

  const handleDelete = () => {
    mutateDelete(car.id, {
      onSuccess: () => {
        handleDeleteClose();
        queryClient.invalidateQueries('my-cars');
      },
    });
  };

  return (
    <>
      <CarItem car={car} />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          m: 1,
        }}
      >
        <Button variant="text" color="primary" onClick={handleEditOpen}>
          Edit
        </Button>
        <Button variant="text" color="error" onClick={handleDeleteOpen}>
          Delete
        </Button>
      </Box>
      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-edit-car"
      >
        <Box sx={style}>
          <AddCarForm isEdit={true} />
        </Box>
      </Modal>
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Are you sure you want to delete this car?</DialogTitle>
        <DialogContent>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Box sx={{ position: 'relative', width: '300px', height: '200px' }}>
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
            </Grid>
            <Grid item sx={{ mr: 4, mt: 1 }}>
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
