import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ImageModel } from '../@types/image-model';
import { getManageImageLink, getShareImageLink } from '../utils';

interface ImageCreatedDialogProps {
  image: ImageModel | undefined,
  isOpen: boolean,
  handleClose: () => void,
}
export default function ImageCreatedDialog({ image, isOpen, handleClose }: ImageCreatedDialogProps) {

  if (!image) {
    return (<></>);
  }

  const copyLink = (url: string) => {
    const msg = 'Başarıyla kopyalandı!';
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success(msg, {
          delay: 100,
          position: 'bottom-left'
        });
      });
  }

  const openNewPage = (url: string) => {
    const newWin = window.open(url, '_blank');
    newWin?.focus();
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Başarılı</DialogTitle>
      <DialogContent>
        <DialogContentText>
          '{image.title}' resmi başarıyla upload edildi. Aşağıdaki bağlantıları kullanarak resme ulaşabilir ve düzenleyebilirsin.
        </DialogContentText>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={() => openNewPage(getShareImageLink(image))}>
            <OpenInNewIcon />
          </IconButton>
          <IconButton sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={() => copyLink(getShareImageLink(image))}>
            <ContentCopyIcon />
          </IconButton>
          <TextField
            id="input-with-sx"
            value={getShareImageLink(image)}
            label="Resim URL"
            variant="standard"
            contentEditable={false}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={() => openNewPage(getManageImageLink(image))}>
            <OpenInNewIcon />
          </IconButton>
          <IconButton sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={() => openNewPage(getManageImageLink(image))}>
            <ContentCopyIcon />
          </IconButton>
          <TextField
            id="input-with-sx"
            value={getManageImageLink(image)}
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
      <ToastContainer />
    </Dialog>
  );
}