import {
  Box,
  Card, Grid,
  Stack, TextField
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { ImageModel } from '../@types/image-model';
import ImageCard from './ImageCard';

type ShowImageFormProps = {
  image: ImageModel;
};

export default function ShowImageImageForm({ image }: ShowImageFormProps) {

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <ImageCard image={image} />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  contentEditable={false}
                  value={image.title}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}
