import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card, FormHelperText, Grid,
  Stack, TextField,
  Typography
} from '@mui/material';
import { AxiosError } from 'axios';
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { ImageModel } from '../@types/image-model';
import { API_CLIENT } from '../api/api-client';
import { Endpoints } from '../api/endpoints';
import { getBase64, getBase64FromUrl } from '../utils';
import ImageCreatedDialog from './ImageCreatedDialog';
import UploadAvatar from './UploadImage';

type UserNewFormProps = {
  isEdit: boolean;
  image?: ImageModel;
};

export default function UploadImageForm({ image, isEdit }: UserNewFormProps) {

  const history = useHistory();
  const [file, setFile] = useState<Blob | undefined>(undefined);
  const [createdDialogInfo, setCreatedDialogInfo] = useState<{ isOpen: boolean, image?: ImageModel }>({ isOpen: false, image: undefined });

  const UploadImageSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    imgUrl: Yup.mixed().required('Image is required')
  });

  const sendCreateImageRequest = async (values: ImageModel, { resetForm, setSubmitting }: FormikHelpers<ImageModel>) => {
    const base64Img = await getBase64(file!);
    API_CLIENT.post(Endpoints.CREATE_IMAGE, {
      base64Img: base64Img,
      fileType: file!.type,
      title: values.title,
      password: values.password,
      adminPassword: values.adminPassword,
    }).then(res => {
      resetForm();
      setCreatedDialogInfo({ isOpen: true, image: res.data });
    })
      .catch((err: AxiosError) => {
        const _error = `Hata! ${err.response?.data?.message ?? 'Beklenmeyen bir hata meydana geldi.'}`;
        toast.error(_error, {
          position: 'bottom-left'
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const sendUpdateImageRequest = async (values: ImageModel, { resetForm, setSubmitting }: FormikHelpers<ImageModel>) => {
    const base64Img = await getBase64FromUrl(values.imgUrl!);
    API_CLIENT.put(Endpoints.UPDATE_IMAGE, {
      base64Img: base64Img,
      fileType: 'image/*',
      title: values.title,
      password: values.password,
      adminPassword: values.adminPassword,
    }).then(res => {
      resetForm();
      setCreatedDialogInfo({ isOpen: true, image: res.data });
    })
      .catch((err: AxiosError) => {
        const _error = `Hata! ${err.response?.data?.message ?? 'Beklenmeyen bir hata meydana geldi.'}`;
        toast.error(_error, {
          position: 'bottom-left'
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const formik = useFormik<ImageModel>({
    enableReinitialize: true,
    initialValues: {
      id: image?.id || '',
      title: image?.title || '',
      password: image?.password || '',
      adminPassword: image?.adminPassword || '',
      imgUrl: image?.imgUrl || '',
    },
    validationSchema: UploadImageSchema,
    onSubmit: (values, helper) => {
      helper.setSubmitting(true);
      console.log('submit edildi');
      if (isEdit) {
        sendUpdateImageRequest(values, helper);
      } else {
        sendCreateImageRequest(values, helper);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, setSubmitting, getFieldProps } = formik;

  const handleOnClickDelete = async () => {
    setSubmitting(true);
    API_CLIENT.post(Endpoints.DELETE_IMAGE, {
      id: values.id,
      password: values.password,
      adminPassword: values.adminPassword,
    }).then(_ => {
      history.replace('/upload');
      const _msg = `Resim başarıyla silindi!`;
      toast.success(_msg, {
        position: 'bottom-left'
      });
    })
      .catch((err: AxiosError) => {
        const _error = `Hata! ${err.response?.data?.message ?? 'Beklenmeyen bir hata meydana geldi.'}`;
        toast.error(_error, {
          position: 'bottom-left'
        });
      })
      .finally(() => {
        formik.setSubmitting(false);
      });
  }

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      if (file) {
        setFile(file);
        setFieldValue('imgUrl', {
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
                  file={values.imgUrl ?? ''}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.imgUrl && errors.imgUrl)}
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
                  {touched.imgUrl && errors.imgUrl}
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
                  {isEdit && <LoadingButton sx={{ mr: 1 }} color='error' variant="contained" loading={isSubmitting} onClick={() => handleOnClickDelete()}>
                    Sil
                  </LoadingButton>}
                  <LoadingButton color='success' type="submit" variant="contained" loading={isSubmitting}>
                    Gönder
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <ImageCreatedDialog
          handleClose={(() => setCreatedDialogInfo({ ...createdDialogInfo, isOpen: false }))}
          image={createdDialogInfo.image}
          isOpen={createdDialogInfo.isOpen}
        />
        <ToastContainer />
      </Form>
    </FormikProvider>
  );
}
