import {
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { NumericFormat } from 'react-number-format';
import ImageUpload from './ImageUpload';

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
  image: yup.string().required("Image can't be empty"),
});

export interface CarValues {
  brand: string;
  model: string;
  year: string;
  color: string;
  price: string;
  mileage: string;
  engine_capacity: string;
  engine_type: string;
  transmission_type: string;
  description: string;
  image: string;
}

export default function AddCarForm({ isEdit }: { isEdit?: boolean }) {
  const formik: FormikProps<CarValues> = useFormik<CarValues>({
    initialValues: {
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
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: CarValues) => {
      console.log(values);
    },
  });
  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {isEdit ? 'Edit your car' : 'Sell your car'}
      </Typography>
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
              onValueChange={(values) => {
                const { value } = values;
                formik.setFieldValue('price', value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <NumericFormat
              customInput={TextField}
              allowLeadingZeros={false}
              allowNegative={false}
              decimalScale={0}
              isAllowed={(values) => {
                console.log(values);
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
              onValueChange={(values) => {
                const { value } = values;
                formik.setFieldValue('mileage', value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
                ),
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
                    formik.touched.engine_capacity &&
                    formik.errors.engine_capacity
                  }
                  onValueChange={(values) => {
                    console.log(values);
                    const { value } = values;
                    formik.setFieldValue('engine_capacity', value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">L</InputAdornment>
                    ),
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
                    formik.touched.engine_type &&
                    Boolean(formik.errors.engine_type)
                  }
                  helperText={
                    formik.touched.engine_type && formik.errors.engine_type
                  }
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
                    formik.touched.transmission_type &&
                    formik.errors.transmission_type
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
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
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
              <ImageUpload formik={formik} />
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
    </>
  );
}