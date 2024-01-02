import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import AutocompleteInput from './AutocompleteInput';
import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { ICar } from '../types';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  brand: yup.string().nullable(),
  model: yup.string().nullable(),
  year: yup.string().nullable(),
});

export interface SearchValues {
  brand: string | null;
  model: string | null;
  year: string | null;
}

export default function SearchForm({ cars }: { cars: ICar[] }) {
  const navigate = useNavigate();
  const [brandOptions, setBrandOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  const handleSubmit = (values: SearchValues) => {
    navigate(`/filtered-cars`, {
      state: { values },
    });
  };

  const formik: FormikProps<SearchValues> = useFormik<SearchValues>({
    initialValues: {
      brand: null,
      model: null,
      year: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values: SearchValues) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (
      formik.values.brand === null ||
      formik.values.model === null ||
      formik.values.year === null
    ) {
      const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand)));
      const uniqueModels = Array.from(new Set(cars.map((car) => car.model)));
      const uniqueYears = Array.from(new Set(cars.map((car) => car.year.toString())));
      setBrandOptions(uniqueBrands);
      setModelOptions(uniqueModels);
      setYearOptions(uniqueYears);
    }
    if (formik.values.brand !== null) {
      const filteredModels = Array.from(
        new Set(
          cars.filter((car) => car.brand === formik.values.brand).map((car) => car.model)
        )
      );
      const filteredYears = Array.from(
        new Set(
          cars
            .filter((car) => car.brand === formik.values.brand)
            .map((car) => car.year.toString())
        )
      );
      setModelOptions(filteredModels);
      setYearOptions(filteredYears);
    }

    if (formik.values.model !== null) {
      const filteredYears = Array.from(
        new Set(
          cars
            .filter((car) => car.model === formik.values.model)
            .map((car) => car.year.toString())
        )
      );
      const filteredBrands = Array.from(
        new Set(
          cars.filter((car) => car.model === formik.values.model).map((car) => car.brand)
        )
      );
      setYearOptions(filteredYears);
      setBrandOptions(filteredBrands);
    }

    if (formik.values.year !== null) {
      const filteredBrands = Array.from(
        new Set(
          cars
            .filter((car) => car.year.toString() === formik.values.year)
            .map((car) => car.brand)
        )
      );
      const filteredModels = Array.from(
        new Set(
          cars
            .filter((car) => car.year.toString() === formik.values.year)
            .map((car) => car.model)
        )
      );
      setBrandOptions(filteredBrands);
      setModelOptions(filteredModels);
    }
  }, [cars, formik.values.brand, formik.values.model, formik.values.year]);

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
        <AutocompleteInput label="Year" id="year" options={yearOptions} formik={formik} />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Search
        </Button>
      </Stack>
    </form>
  );
}
