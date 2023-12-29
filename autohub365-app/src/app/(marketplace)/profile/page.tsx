'use client';

import {
  Button,
  Container,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { PatternFormat } from 'react-number-format';

export interface ProfileValues {
  first_name: string;
  last_name: string;
  sex: string;
  phone: string;
  city: string;
}

const validationSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  sex: yup.string().required('Sex is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .length(9, 'Phone is invalid'),
  city: yup.string().required('City is required'),
});

export default function Profile() {
  const formik: FormikProps<ProfileValues> = useFormik<ProfileValues>({
    initialValues: {
      first_name: '',
      last_name: '',
      sex: '',
      phone: '',
      city: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: ProfileValues) => {
      console.log(values);
    },
  });
  return (
    <main>
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
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />
              <TextField
                variant="standard"
                label="Last name"
                id="last_name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
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
                onValueChange={(values) => {
                  console.log(values);
                  const { value } = values;
                  formik.setFieldValue('phone', value);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
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
              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </main>
  );
}
