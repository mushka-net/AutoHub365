import {
  Alert,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useStore } from '../../store/store';
import { useState } from 'react';
import { IOrder } from '../../types';
import BoughtCarTableRow from '../../components/BoughtCarTableRow';
import SoldCarTableRow from '../../components/SoldCarTableRow';
import { getOrdersByBuyer, getOrdersBySeller } from '../../services/orders.service';
import CenteredLoadingSpinner from '../../components/CenteredLoadingSpinner';

export default function Orders() {
  const { userId } = useStore();
  const [isError, setIsError] = useState(false);
  const [boughtOrders, setBoughtOrders] = useState<IOrder[]>([] as IOrder[]);
  const [soldOrders, setSoldOrders] = useState<IOrder[]>([] as IOrder[]);

  const { isLoading: isLoadingBought, isFetching: isFetchingBoght } = useQuery(
    'bought-orders',
    () => getOrdersByBuyer(userId!),
    {
      onSuccess: (response) => {
        setBoughtOrders(response.data);
        console.log(response.data);
      },
      onError: () => {
        setIsError(true);
      },
    }
  );

  const { isLoading: isLoadingSold, isFetching: isFetchingSold } = useQuery(
    'sold-orders',
    () => getOrdersBySeller(userId!),
    {
      onSuccess: (response) => {
        setSoldOrders(response.data);
      },
      onError: () => {
        setIsError(true);
      },
    }
  );

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

  if (isLoadingBought || isFetchingBoght || isLoadingSold || isFetchingSold) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <main>
      <Grid
        container
        spacing={2}
        sx={{
          my: 2,
          px: 6,
        }}
      >
        <Grid item sm={12} md={6}>
          <Typography variant="h4">BOUGHT</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Car</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Seller phone</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {boughtOrders.map((order) => (
                  <BoughtCarTableRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h4">SOLD</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Car</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Buyer phone</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {soldOrders.map((order) => (
                  <SoldCarTableRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </main>
  );
}
