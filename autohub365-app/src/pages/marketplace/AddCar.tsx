import AddCarForm from '../../components/AddCarForm';
import { Container } from '@mui/material';

export default function AddCar() {
  return (
    <main>
      <Container sx={{ py: 2 }}>
        <AddCarForm isEdit={false} />
      </Container>
    </main>
  );
}
