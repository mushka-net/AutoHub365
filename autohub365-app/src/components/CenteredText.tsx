import { Box, Typography } from '@mui/material';
import React from 'react';

export default function CenteredText({ text }: { text: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mt: 3,
          mb: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
