import { Button, IconButton } from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import MySnackbar from '../../errors_and_snackbars/Snackbar';
import { useTranslation } from 'react-i18next';

export default function ReturnBook({
  loanId,
  onReturn,
}: {
  loanId: number;
  onReturn: () => void;
}) {
  const apiClient = useApi();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const returnBook = async () => {
    const result = await apiClient.returnBook(loanId);
    if (result.success) {
      setMessage(t('admin.snackbar.loanReturnedSuccessfully'));
      setOpen(true);
      setSuccess(result.success);
    } else {
      setMessage(t('admin.snackbar.loanReturnFailed'));
      setOpen(true);
      setSuccess(result.success);
    }
    onReturn();
  };

  return (
    <>
      <Button onClick={returnBook}>{t('loanPage.label.return')}</Button>
      <MySnackbar
        open={open}
        message={message}
        success={success}
        setOpen={setOpen}
      />
    </>
  );
}
