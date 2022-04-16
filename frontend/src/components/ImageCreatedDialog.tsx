import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { ImageModel } from '../@types/image-model';

interface ImageCreatedDialogProps {
  image: ImageModel | undefined,
  isOpen: boolean,
  handleClose: () => void,
}
export default function ImageCreatedDialog({ image, isOpen, handleClose }: ImageCreatedDialogProps) {

  if (!image) {
    return (<></>);
  }
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Başarılı</DialogTitle>
      <DialogContent>
        <DialogContentText>
          '{image.title}' resmi başarıyla upload edildi. Aşağıdaki bağlantıları kullanarak resme ulaşabilir ve düzenleyebilirsin.
        </DialogContentText>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <ContentCopyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            value={image.imgUrl}
            label="Resim URL"
            variant="standard"
            contentEditable={false}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <ContentCopyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            value={image.imgUrl}
            label="Düzenleme URL"
            variant="standard"
            contentEditable={false}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Tamam</Button>
      </DialogActions>
    </Dialog>
  );
}