import { IconButton } from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import MySnackbar from '../../errors_and_snackbars/Snackbar';
import { useTranslation } from 'react-i18next';

export default function DeleteLoan({
  loanId,
  onDelete,
}: {
  loanId: number;
  onDelete: () => void;
}) {
  const apiClient = useApi();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const deleteLoan = async () => {
    const result = await apiClient.deleteLoan(loanId);
    if (result.success) {
      setMessage(t('loanPage.label.loanDeletedSuccessfully'));
      setOpen(true);
      setSuccess(result.success);
    } else {
      setMessage(t('loanPage.label.loanDeletionFailed'));
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
      <MySnackbar
        open={open}
        message={message}
        success={success}
        setOpen={setOpen}
      />
    </>
  );
}
