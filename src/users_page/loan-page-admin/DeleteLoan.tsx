import { IconButton } from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import MySnackbar from '../../errors_and_snackbars/Snackbar';
import { useTranslation } from 'react-i18next';

interface Props {
  loanId: number;
  onDelete: () => void;
  setMessage: (message: string) => void;
  setSuccess: (success: boolean) => void;
  setOpen: (open: boolean) => void;
}

export default function DeleteLoan({
  loanId,
  onDelete,
  setMessage,
  setSuccess,
  setOpen,
}: Props) {
  const apiClient = useApi();
  const { t } = useTranslation();
  const deleteLoan = async () => {
    const result = await apiClient.deleteLoan(loanId);
    if (result.success) {
      setMessage(t('admin.snackbar.loanDeletedSuccessfully'));
      setOpen(true);
      setSuccess(result.success);
    } else {
      setMessage(t('admin.snackbar.loanDeletionFailed'));
      setOpen(true);
      setSuccess(result.success);
    }
    onDelete();
  };

  return (
    <>
      <IconButton onClick={deleteLoan}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
