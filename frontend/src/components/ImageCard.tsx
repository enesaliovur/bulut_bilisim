import { Box } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { DropzoneOptions } from 'react-dropzone';
import { ImageModel } from '../@types/image-model';

const RootStyle = styled('div')(({ theme }: { theme: any }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`
}));

interface ImageCardProps extends DropzoneOptions {
  image: ImageModel,
  sx?: SxProps<Theme>;
}

export default function ImageCard({ image, sx }: ImageCardProps) {

  return (
    <>
      <RootStyle sx={sx}>
        <Box
          component="img"
          alt={image.title}
          src={image.imgUrl}
          sx={{ zIndex: 8, objectFit: 'cover' }}
        />
      </RootStyle>
    </>
  );
}
