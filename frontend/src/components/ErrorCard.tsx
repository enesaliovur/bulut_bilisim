import { Typography } from '@mui/material';
import { Box } from "@mui/system";
import React from 'react';

interface ErrorCardProps {
  message: string,
}
export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <Box height="80vh" width="100%" margin={4} display="flex" alignItems="center" justifyContent="center">
      <Typography variant='h5'>{message}</Typography>
    </Box>
  );
}