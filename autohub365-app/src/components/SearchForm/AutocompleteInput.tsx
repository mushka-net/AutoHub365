import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormikProps } from 'formik';
import { SearchValues } from './index';

interface props {
  label: string;
  id: string;
  options: string[];
  formik: FormikProps<SearchValues>;
}

export default function AutocompleteInput({
  label,
  id,
  options,
  formik,
}: props) {
  return (
    <FormControl fullWidth>
      <Autocomplete
        id={id}
        onChange={(e, value) => formik.setFieldValue(id, value)}
        options={options}
        noOptionsText="No options"
        renderInput={(params) => (
          <TextField {...params} label={label} id={id} />
        )}
      />
    </FormControl>
  );
}
