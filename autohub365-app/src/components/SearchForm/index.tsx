'use client';
import { Button, Stack } from '@mui/material';
import AutocompleteInput from './AutocompleteInput';
import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';

const brandOptions = ['BMW', 'Audi', 'Mercedes'];

const modelOptions = ['X5', 'A6', 'E-Class'];

const yearOptions = ['2015', '2016', '2017', '2018', '2019', '2020'];

const validationSchema = yup.object({
  brand: yup.string(),
  model: yup.string(),
  year: yup.string(),
});

export interface SearchValues {
  brand: string;
  model: string;
  year: string;
}

export default function SearchForm() {
  const formik: FormikProps<SearchValues> = useFormik<SearchValues>({
    initialValues: {
      brand: '',
      model: '',
      year: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: SearchValues) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <AutocompleteInput
          label="Brand"
          id="brand"
          options={brandOptions}
          formik={formik}
        />
        <AutocompleteInput
          label="Model"
          id="model"
          options={modelOptions}
          formik={formik}
        />
        <AutocompleteInput
          label="Year"
          id="year"
          options={yearOptions}
          formik={formik}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Search
        </Button>
      </Stack>
    </form>
  );
}
