import {
  Alert,
  Button,
  Container,
  Grid,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik, FormikProps, FormikBag } from 'formik';
import * as yup from 'yup';
import { NumericFormat } from 'react-number-format';
import ImageUpload from './ImageUpload';
import { useAddCarMutation, useEditCarMutation } from '../lib/react-query';
import { useQuery, useQueryClient } from 'react-query';
import { CarValues, ICar } from '../types';
import { useNavigate } from 'react-router-dom';
import { getPersonalInfo } from '../services/personal.service';
import { useStore } from '../store/store';
import { useState } from 'react';
import CenteredLoadingSpinner from './CenteredLoadingSpinner';
import { Link as RouterLink } from 'react-router-dom';

const validationSchema = yup.object({
  brand: yup.string().required("Brand can't be empty"),
  model: yup.string().required("Model can't be empty"),
  year: yup.number().required("Year can't be empty"),
  color: yup.string().required("Color can't be empty"),
  price: yup.number().required("Price can't be empty"),
  mileage: yup.number().required("Mileage can't be empty"),
  engine_capacity: yup.number().required("Engine capacity can't be empty"),
  engine_type: yup.string().required("Engine type can't be empty"),
  transmission_type: yup.string().required("Transmission type can't be empty"),
  description: yup.string().required("Description can't be empty"),
  image_data: yup.mixed().required("Image can't be empty"),
});

export default function AddCarForm({
  isEdit,
  car,
  handleCloseModal,
}: {
  isEdit?: boolean;
  car?: ICar;
  handleCloseModal?: () => void;
}) {
  const navigate = useNavigate();
  const { mutate: mutateAdd } = useAddCarMutation();
  const { mutate: mutateEdit } = useEditCarMutation();
  const { userId } = useStore();
  const queryClient = useQueryClient();
  const [isPersonalInfoEmpty, setIsPersonalInfoEmpty] = useState(false);

  const { isLoading, isError } = useQuery(
    'personal-info',
    () => getPersonalInfo(userId!),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        Object.entries(data).forEach((item) => {
          if (item[1] === ' ') {
            setIsPersonalInfoEmpty(true);
          }
        });
      },
    }
  );

  const handleAddCar = (values: CarValues) => {
    mutateAdd(values, {
      onSuccess: () => {
        queryClient.invalidateQueries('all-cars');
        navigate('/my-cars');
      },
    });
  };

  const handleEditCar = (values: CarValues) => {
    mutateEdit(
      { data: values, id: car!.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('my-cars');
          handleCloseModal!();
        },
      }
    );
  };

  const initialValues =
    isEdit && car
      ? {
          brand: car.brand,
          model: car.model,
          year: Number(car.year),
          color: car.color,
          price: Number(car.price),
          mileage: Number(car.mileage),
          engine_capacity: Number(car.engine_capacity),
          engine_type: car.engine_type,
          transmission_type: car.transmission_type,
          description: car.description,
          image_data: car.image,
        }
      : ({
          brand: '',
          model: '',
          year: '',
          color: '',
          price: '',
          mileage: '',
          engine_capacity: '',
          engine_type: '',
          transmission_type: '',
          description: '',
          image_data: '',
        } as CarValues);

  const formik: FormikProps<CarValues> = useFormik<CarValues>({
    initialValues: initialValues as CarValues,
    validationSchema: validationSchema,
    onSubmit: (values: CarValues) => {
      if (isEdit) {
        if (car!.image === values.image_data) {
          const { image_data, ...rest } = values;
          handleEditCar(rest);
        } else {
          handleEditCar(values);
        }
      }
      if (!isEdit) {
        handleAddCar(values);
      }
    },
  });

  if (isError) return <Alert severity="error">Failed to receive data</Alert>;

  if (isLoading) return <CenteredLoadingSpinner />;

  return (
    <>
      <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {isEdit ? 'Edit your car' : 'Sell your car'}
      </Typography>
      {isPersonalInfoEmpty ? (
        <Alert severity="error">
          Please fill in your personal information before adding a car. You can do it{' '}
          <Link component={RouterLink} to="/profile">
            here
          </Link>
        </Alert>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Brand"
                id="brand"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Model"
                id="model"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
              />
              <NumericFormat
                customInput={TextField}
                allowLeadingZeros={false}
                allowNegative={false}
                decimalScale={0}
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return Number(formattedValue) <= new Date().getFullYear() + 10;
                }}
                fullWidth
                label="Year"
                id="year"
                name="year"
                onBlur={formik.handleBlur}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
                value={formik.values.year}
                onValueChange={(values) => {
                  const { value } = values;
                  formik.setFieldValue('year', value);
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Color"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
              <NumericFormat
                customInput={TextField}
                allowLeadingZeros={false}
                allowNegative={false}
                decimalScale={0}
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return Number(formattedValue) <= 9999999;
                }}
                fullWidth
                label="Price"
                id="price"
                name="price"
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                value={formik.values.price}
                onValueChange={(values) => {
                  const { value } = values;
                  formik.setFieldValue('price', value);
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <NumericFormat
                customInput={TextField}
                allowLeadingZeros={false}
                allowNegative={false}
                decimalScale={0}
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return Number(formattedValue) <= 99999999;
                }}
                fullWidth
                label="Mileage"
                id="mileage"
                name="mileage"
                onBlur={formik.handleBlur}
                error={formik.touched.mileage && Boolean(formik.errors.mileage)}
                helperText={formik.touched.mileage && formik.errors.mileage}
                value={formik.values.mileage}
                onValueChange={(values) => {
                  const { value } = values;
                  formik.setFieldValue('mileage', value);
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">km</InputAdornment>,
                }}
              />
            </Stack>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  <NumericFormat
                    customInput={TextField}
                    allowLeadingZeros={false}
                    allowNegative={false}
                    decimalScale={2}
                    isAllowed={(values) => {
                      const { value } = values;
                      return Number(value) <= 99.99;
                    }}
                    fullWidth
                    label="Engine capacity"
                    id="engine_capacity"
                    name="engine_capacity"
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.engine_capacity &&
                      Boolean(formik.errors.engine_capacity)
                    }
                    helperText={
                      formik.touched.engine_capacity && formik.errors.engine_capacity
                    }
                    value={formik.values.engine_capacity}
                    onValueChange={(values) => {
                      const { value } = values;
                      formik.setFieldValue('engine_capacity', value);
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">L</InputAdornment>,
                    }}
                  />
                  <TextField
                    fullWidth
                    select
                    variant="outlined"
                    label="Engine type"
                    id="engine_type"
                    name="engine_type"
                    defaultValue=""
                    value={formik.values.engine_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.engine_type && Boolean(formik.errors.engine_type)
                    }
                    helperText={formik.touched.engine_type && formik.errors.engine_type}
                  >
                    <MenuItem value="Gasoline">Gasoline</MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    variant="outlined"
                    label="Transmission type"
                    id="transmission_type"
                    name="transmission_type"
                    defaultValue=""
                    value={formik.values.transmission_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.transmission_type &&
                      Boolean(formik.errors.transmission_type)
                    }
                    helperText={
                      formik.touched.transmission_type && formik.errors.transmission_type
                    }
                  >
                    <MenuItem value="Manual">Manual</MenuItem>
                    <MenuItem value="Automatic">Automatic</MenuItem>
                  </TextField>
                  <TextField
                    sx={{ mr: 2 }}
                    fullWidth
                    variant="outlined"
                    label="Description"
                    multiline
                    rows={4}
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description && Boolean(formik.errors.description)
                    }
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ImageUpload
                  formik={formik}
                  isBase64={false}
                  field="image_data"
                  image={isEdit ? car!.image : ''}
                />
              </Grid>
            </Grid>
          </Stack>
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            sx={{ py: 1, px: 4, fontSize: '1.2rem' }}
          >
            {isEdit ? 'Save' : 'Add'}
          </Button>
        </form>
      )}
    </>
  );
}
