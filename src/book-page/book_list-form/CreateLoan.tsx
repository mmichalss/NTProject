import { useCallback, useMemo, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import { CreateLoanDto } from '../../api/dto/loan/loan.dto';
import { Button } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MySnackbar from '../../errors_and_snackbars/Snackbar';

export default function CreateLoan({
  selected,
  userId,
  onUpdate,
}: {
  selected: readonly number[];
  userId: number | undefined;
  onUpdate: () => void;
}) {
  const apiClient = useApi();
  const userRole = apiClient.getUserRole();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const loanData = useMemo(() => {
    return selected.map((bookId) => {
      const loan = new CreateLoanDto();
      if (userId === undefined) {
        console.log('User id not passed');
      }
      loan.userId = userId;
      loan.bookId = bookId;
      const today = new Date();
      const thirtyDaysFromNow = new Date(
        today.getTime() + 30 * 24 * 60 * 60 * 1000,
      );
      const formattedDate = new Date(
        thirtyDaysFromNow.getTime() -
          thirtyDaysFromNow.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split('T')[0];
      loan.dueDate = formattedDate;
      console.log(loan.dueDate);
      return loan;
    });
  }, [userId, selected]);

  const { t } = useTranslation();
  const handleSubmit = useCallback(
    (loans: CreateLoanDto[]) => {
      if (userId === undefined) {
        navigate('/login');
        return;
      }
      loans.forEach(async (loan) => {
        try {
          const result = await apiClient.createLoan(loan);
          if (result.success) {
            setMessage(t('admin.snackbar.loanCreatedSuccessfully'));
            setOpen(true);
            setSuccess(result.success);
          } else {
            setMessage(t('admin.snackbar.loanCreationFailed'));
            setOpen(true);
            setSuccess(result.success);
          }
        } catch (error) {
          setMessage('Error creating loan');
          setOpen(true);
        }
        onUpdate();
      });
    },
    [apiClient, navigate, userId, onUpdate, t],
  );

  return (
    <>
      <Formik onSubmit={handleSubmit} initialValues={loanData}>
        {(formik: any) => (
          <form
            id="create-loan"
            className="Create-loan"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Button variant="outlined" type="submit" disabled={!userId}>
              {t('bookPage.label.borrowSelectedBooks')}
            </Button>
          </form>
        )}
      </Formik>
      <MySnackbar
        open={open}
        message={message}
        success={success}
        setOpen={setOpen}
      />
    </>
  );
}
