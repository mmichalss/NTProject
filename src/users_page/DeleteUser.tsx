import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import MySnackbar from '../errors_and_snackbars/Snackbar';

interface Props {
  userId: number;
  onDelete: () => void;
  setMessage: (message: string) => void;
  setSuccess: (success: boolean) => void;
  setOpen: (open: boolean) => void;
}

export default function DeleteUser({
  userId,
  onDelete,
  setSuccess,
  setMessage,
  setOpen,
}: Props) {
  const apiClient = useApi();
  const { t } = useTranslation();

  const deleteUser = async () => {
    const result = await apiClient.deleteUser(userId);
    if (result.success) {
      setMessage(t('admin.snackbar.userDeletedSuccessfully'));
      setOpen(true);
      setSuccess(result.success);
    } else {
      setMessage(
        t('admin.snackbar.userDeletionFailed') + ` status: ${result.status}`,
      );
      setOpen(true);
      setSuccess(result.success);
    }
    onDelete();
  };

  return (
    <>
      <IconButton onClick={deleteUser}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
