'use client';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
  const formik = useFormik<LoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <main>
      <Paper
        sx={{
          p: 3,
          width: { sm: '80vw', md: '40vw', lg: '30vw' },
        }}
      >
        <Typography variant="h4" align="center" marginBottom={2}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: '100%' }}
        >
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
          Don't have an account?{' '}
          <Link component={NextLink} href="/register">
            Register
          </Link>
        </Typography>
      </Paper>
    </main>
  );
}
