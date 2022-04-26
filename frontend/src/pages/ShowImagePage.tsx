import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AppBar, Button, Link, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageModel } from '../@types/image-model';
import { API_CLIENT } from '../api/api-client';
import { Endpoints } from '../api/endpoints';
import { ErrorCard } from '../components/ErrorCard';
import ShowImageImageForm from '../components/ShowImageForm';
import Spinner from '../components/Spinner/Spinner';
import useQuery from '../hooks/useQuery';

export default function ShowImagePage() {
  const query = useQuery();

  const history = useHistory();

  const imageId = query.get('id');
  const password = query.get('password');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [image, setImage] = useState<ImageModel | undefined>();

  React.useEffect(() => {
    if (imageId) {
      setLoading(true);
      setError(undefined);
      API_CLIENT.post(Endpoints.GET_IMAGE, {
        id: imageId,
        password
      })
        .then(res => {
          setImage(res.data);
        })
        .catch((err: AxiosError) => {
          const _error = `Hata! ${err.response?.data?.message ?? 'Beklenmeyen bir hata meydana geldi.'}`;
          setError(_error);
          toast.error(_error, {
            position: 'bottom-left'
          });
        })
        .finally(() => setLoading(false))
    }
  }, [imageId, password]);

  if (!imageId) {
    return (
      <Redirect to="/upload" />
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link color='white' href="/" underline="none" sx={{ flexGrow: 1 }}>
            HIZLIRESIM
          </Link>
          <Button href='/upload' startIcon={<CloudUploadIcon />} color="inherit">YÜKLE</Button>
        </Toolbar>
      </AppBar>
      {!error && loading && !image && <Box height="80vh" width="100%" margin={4} display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>}
      {error && <ErrorCard message={error} />}
      {image && <Box margin={4}>
        <ShowImageImageForm image={image} />
      </Box>}
      <ToastContainer />
    </>
  );
}