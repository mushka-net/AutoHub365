import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FormikProps } from 'formik';

export default function ImageUpload({
  formik,
  field,
  isBase64,
  image,
}: {
  formik: FormikProps<any>;
  field: string;
  isBase64: boolean;
  initialImage?: string;
  image?: string;
}) {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    if (typeof image == typeof 'string' && !isBase64 && image) {
      setBase64(image);
    }
    if (image && isBase64) {
      setBase64(image);
    }
  }, [image]);

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
      if (isBase64) {
        formik.setFieldValue(`${field}`, base64);
        setBase64(base64 as string);
      } else {
        formik.setFieldValue(`${field}`, file);
        setBase64(base64 as string);
      }
    } else {
      alert('File must be less than 5MB');
    }
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
        {base64 && (
          <Box
            component="img"
            sx={{
              objectFit: 'contain',
              padding: 1,
              width: '500px',
              height: '300px',
              borderRadius: 2,
            }}
            src={base64}
            alt="Picture of the car"
          />
        )}
      </Box>
      <Box sx={{ width: '500px' }}>
        <input
          style={{ width: '100%' }}
          type="file"
          name="image"
          accept="image/*"
          multiple={false}
          onChange={(e) => onFileChange(e)}
        />
      </Box>
    </>
  );
}
