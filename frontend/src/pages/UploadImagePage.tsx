import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { AppBar, Button, Link, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UploadImageForm from '../components/UploadImageForm';

export default function UploadImagePage() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link color='white' href="/" underline="none" sx={{ flexGrow: 1 }}>
            HIZLIRESIM
          </Link>
          <Button href='/manage' startIcon={<ManageHistoryIcon />} color="inherit">YÖNET</Button>
        </Toolbar>
      </AppBar>
      <Box margin={4}>
        <UploadImageForm isEdit={false} />
      </Box>
    </>
  );
}