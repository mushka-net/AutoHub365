import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';
import { useLoginMutation } from '../../lib/react-query';
import { useState } from 'react';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(4, 'Username should be of minimum 4 characters length')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

interface LoginValues {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const { setUserToken, setUserId } = useStore();

  const { mutate } = useLoginMutation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik<LoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (response) => {
          setUserToken(response.data.token);
          setUserId(response.data.user_id.toString());
          navigate('/home');
        },
        onError: (error) => {
          handleOpen();
        },
      });
    },
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper
        sx={{
          p: 3,
          width: { sm: '80vw', md: '40vw', lg: '30vw' },
        }}
      >
        <Typography variant="h4" align="center" marginBottom={2}>
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <TextField
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button variant="contained" type="submit">
              Log in
            </Button>
          </Stack>
        </Box>
        <Typography variant="body1" marginTop={2}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Failed to login
        </Alert>
      </Snackbar>
    </Box>
  );
}
