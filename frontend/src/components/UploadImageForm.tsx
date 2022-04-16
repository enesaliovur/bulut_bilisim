import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card, FormHelperText, Grid,
  Stack, TextField,
  Typography
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { UploadImageRequestDTO } from '../@types/upload-image-dto';
import UploadAvatar from './UploadImage';


type UserNewFormProps = {
  isEdit: boolean;
  imageRequestDTO?: UploadImageRequestDTO;
};

export default function UploadImageForm({ isEdit, imageRequestDTO }: UserNewFormProps) {

  const notify = () => toast("Wow so easy !");

  const UploadImageSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    avatarUrl: Yup.mixed().required('Image is required')
  });

  useEffect(() => {
    notify();
  }, [])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: imageRequestDTO?.title || '',
      password: imageRequestDTO?.password || '',
      adminPassword: imageRequestDTO?.adminPassword || '',
      imageUrl: imageRequestDTO?.base64Image || '',
    },
    validationSchema: UploadImageSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log('okundu!');
      // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      try {
        // await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        // setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('imageUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.imageUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.imageUrl && errors.imageUrl)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Geçerli uzantılar: *.jpeg, *.jpg, *.png, *.gif
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.imageUrl && errors.imageUrl}
                </FormHelperText>
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
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Image Password"
                    type="password"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <TextField
                    fullWidth
                    label="Admin Password"
                    type="password"
                    {...getFieldProps('adminPassword')}
                    error={Boolean(touched.adminPassword && errors.adminPassword)}
                    helperText={touched.adminPassword && errors.adminPassword}
                  />

                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <ToastContainer />
      </Form>
    </FormikProvider>
  );
}
