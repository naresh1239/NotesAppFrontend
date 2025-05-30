import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PreviewScreen = ({ value }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Preview
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            height: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
            overflowY: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Live Preview</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: '#f9f9f9',
              borderRadius: 1,
              overflow: 'auto',
              height: '100%',
            }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default PreviewScreen;
