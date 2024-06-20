import { useApi } from '../api/ApiProvider';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import MySnackbar from '../errors_and_snackbars/Snackbar';
import { useTranslation } from 'react-i18next';

interface Props {
  bookId: number;
  onDelete: () => void;
  setMessage: (message: string) => void;
  setSuccess: (success: boolean) => void;
  setOpen: (open: boolean) => void;
}

export default function DeleteBook({
  bookId,
  onDelete,
  setMessage,
  setSuccess,
  setOpen,
}: Props) {
  const apiClient = useApi();
  const { t } = useTranslation();

  const deleteBook = async () => {
    const response = await apiClient.deleteBook(bookId);
    if (response.success) {
      setMessage(t('admin.snackbar.bookDeletedSuccessfully'));
      setOpen(true);
      setSuccess(response.success);
      onDelete();
    } else {
      setMessage(t('admin.snackbar.bookDeletionFailed'));
      setOpen(true);
      setSuccess(response.success);
    }
  };

  return (
    <>
      <IconButton onClick={deleteBook}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
