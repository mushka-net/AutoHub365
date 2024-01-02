import {
  Box,
  Button,
  Link,
  Popover,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { IOrder } from '../types';
import { useQuery } from 'react-query';
import { getCar } from '../services/cars.service';
import { getPersonalInfo } from '../services/personal.service';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

export default function SoldCarTableRow({ order }: { order: IOrder }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { data: car } = useQuery(`order-sold-car-${order.id}`, () => getCar(order.car), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    enabled: !!order.car,
  });

  const { data: buyer } = useQuery(
    `order-seller-${order.id}`,
    () => getPersonalInfo(order.buyer),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!order.buyer,
    }
  );

  return (
    <>
      {car != undefined && buyer != undefined && (
        <TableRow>
          <TableCell>
            <Link component={RouterLink} to={`/cars/${car?.data.id}`}>
              {car.data.brand} {car.data.model} {car.data.year}
            </Link>
          </TableCell>
          <TableCell>{car.data.price}$</TableCell>
          <TableCell>
            +380 {buyer.phone}{' '}
            <Button
              aria-describedby={order.id}
              onClick={handleClick}
              sx={{
                padding: 0,
              }}
            >
              (More info)
            </Button>
            <Popover
              id={order.id}
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Box sx={{ mx: 2, my: 1 }}>
                <Typography>
                  Name: {buyer.first_name} {buyer.last_name}
                </Typography>
                <Typography>Location: {buyer.city}</Typography>
                <Typography>Email: {buyer.email}</Typography>
              </Box>
            </Popover>
          </TableCell>
          <TableCell>{new Date(order.date).toLocaleString('en-GB')}</TableCell>
        </TableRow>
      )}
    </>
  );
}
