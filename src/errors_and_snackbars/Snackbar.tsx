import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
  open: boolean;
  success: boolean;
  message: string;
  setOpen: (open: boolean) => void;
}

export default function MySnackbar({ open, success, message, setOpen }: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        severity={success ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
