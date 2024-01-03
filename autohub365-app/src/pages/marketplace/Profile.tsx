import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { PatternFormat } from 'react-number-format';
import ImageUpload from '../../components/ImageUpload';

import { useQuery, useQueryClient } from 'react-query';
import { useUpdatePersonalInfoMutation } from '../../lib/react-query';
import { useStore } from '../../store/store';

import { ProfileValues } from '../../types';
import { getPersonalInfo } from '../../services/personal.service';
import CenteredLoadingSpinner from '../../components/CenteredLoadingSpinner';
import { useState } from 'react';

const validationSchema = yup.object({
  first_name: yup.string().trim().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  sex: yup.string().required('Sex is required'),
  phone: yup.string().required('Phone is required').length(9, 'Phone is invalid'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  city: yup.string().required('City is required'),
  image: yup.string().required('Image is invalid'),
});

export default function Profile() {
  const [isError, setIsError] = useState(false);
  const { userId } = useStore();
  const { mutate } = useUpdatePersonalInfoMutation();
  const queryClient = useQueryClient();

  const { isFetching } = useQuery('personal-info', () => getPersonalInfo(userId!), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      Object.entries(data).forEach((item) => {
        if (item[1] != ' ') {
          formik.setFieldValue(item[0], item[1]);
          queryClient.invalidateQueries('user-avatar');
        }
      });
    },
    onError: () => {
      setIsError(true);
    },
  });

  const formik: FormikProps<ProfileValues> = useFormik<ProfileValues>({
    initialValues: {
      first_name: '',
      last_name: '',
      sex: '',
      phone: '',
      email: '',
      city: '',
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: ProfileValues) => {
      mutate(
        { id: userId!, personalInfo: values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('personal-info');
          },
        }
      );
    },
  });

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

  return (
    <main>
      {isFetching ? (
        <CenteredLoadingSpinner />
      ) : (
        <Container sx={{ py: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4">Edit your personal info</Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  variant="standard"
                  label="First name"
                  id="first_name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />
                <TextField
                  variant="standard"
                  label="Last name"
                  id="last_name"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
                <TextField
                  fullWidth
                  select
                  variant="standard"
                  label="Sex"
                  id="sex"
                  name="sex"
                  defaultValue=""
                  value={formik.values.sex}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sex && Boolean(formik.errors.sex)}
                  helperText={formik.touched.sex && formik.errors.sex}
                >
                  <MenuItem value=" " disabled>
                    {' '}
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
                <PatternFormat
                  format="+380 (##) ###-##-##"
                  allowEmptyFormatting
                  mask="_"
                  customInput={TextField}
                  variant="standard"
                  label="Phone"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onValueChange={(values) => {
                    const { value } = values;
                    formik.setFieldValue('phone', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                  variant="standard"
                  label="Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  variant="standard"
                  label="City"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
                <ImageUpload
                  width="300px"
                  height="300px"
                  formik={formik}
                  isBase64={true}
                  field="image"
                  image={formik.values.image}
                />

                <Button variant="contained" color="success" type="submit">
                  Save
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      )}
    </main>
  );
}
