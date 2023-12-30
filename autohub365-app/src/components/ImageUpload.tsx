import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { FormikProps } from 'formik';
import { CarValues } from './AddCarForm';

export default function ImageUpload({ formik }: { formik: FormikProps<CarValues> }) {
  const [base64, setBase64] = useState<string | null>(null);

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file?.size / 1024 / 1024 < 5) {
      const base64 = await convertToBase64(file);
      formik.setFieldValue('image', base64);
      setBase64(base64 as string);
    } else {
      alert('File must be less than 5MB');
    }
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = '';
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '500px',
          height: '300px',
          border: 1,
          borderRadius: 2,
          borderColor: 'grey.400',
          mb: 1,
        }}
      >
        {base64 && <img src={base64} alt="Picture of the car" />}
      </Box>
      <Box sx={{ width: '500px' }}>
        <input
          style={{ width: '100%' }}
          type="file"
          name="car-image"
          accept="image/*"
          multiple={false}
          required
          onChange={(e) => onFileChange(e)}
        />
      </Box>
    </>
  );
}
