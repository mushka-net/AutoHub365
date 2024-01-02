import { Container, CircularProgress } from '@mui/material';

const CenteredLoadingSpinner = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={48} />
    </Container>
  );
};

export default CenteredLoadingSpinner;
