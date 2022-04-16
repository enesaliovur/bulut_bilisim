import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { AppBar, Button, Link, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UploadImageForm from '../components/UploadImageForm';
import useQuery from '../hooks/useQuery';

export default function ShowImagePage() {
  const query = useQuery();

  const imageKey = query.get('key');
  const password = query.get('password');

  // React.useEffect(() => {
  //   API_CLIENT.post('/g')
  //     .then(res => {

  //     })
  //     .catch(err => {

  //     })
  // }, [query])

  // if (!imageKey) {
  //   return (
  //     <Redirect to="/upload" />
  //   );
  // }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link color='white' href="/" underline="none" sx={{ flexGrow: 1 }}>
            HIZLIRESIM
          </Link>
          <Button href='/upload' startIcon={<CloudUploadIcon />} color="inherit">YÖNET</Button>
          <Button href='/manage' startIcon={<ManageHistoryIcon />} color="inherit">YÖNET</Button>
        </Toolbar>
      </AppBar>
      <Box margin={4}>
        <UploadImageForm isEdit={false} />
      </Box>
    </>
  );
}