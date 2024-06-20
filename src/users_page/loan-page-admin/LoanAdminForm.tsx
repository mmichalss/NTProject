import { useTranslation } from 'react-i18next';
import useLoans from './LoanAdminData';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import DeleteLoan from './DeleteLoan';
import CreateLoan from './CreateLoan';
import { useNavigate } from 'react-router-dom';
import ReturnBook from './ReturnBook';
import React from 'react';
import MySnackbar from '../../errors_and_snackbars/Snackbar';

export default function LoanAdminForm({ userId }: { userId: number }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { data, fetchLoans } = useLoans(userId);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const updateLoans = () => {
    enqueueSnackbar('Loan alternated', { variant: 'success' });
    fetchLoans(page, rowsPerPage);
  };

  useEffect(() => {
    fetchLoans(page, rowsPerPage);
  }, [fetchLoans, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (data === undefined) {
    return <div>No Loans...</div>;
  }

  return (
    <>
      <Button onClick={() => navigate('/home/users')}>{t('back')}</Button>
      <CreateLoan onCreate={updateLoans} />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          {...{ hover: 'true' }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('loanPage.label.loanId')}</TableCell>
              <TableCell align="right">{t('bookPage.label.bookId')}</TableCell>
              <TableCell align="right">{t('bookPage.label.isbn')}</TableCell>
              <TableCell align="right">{t('bookPage.label.title')}</TableCell>
              <TableCell align="right">{t('bookPage.label.author')}</TableCell>
              <TableCell align="right">{t('userId')}</TableCell>
              <TableCell align="right">
                {t('loanPage.label.loanDate')}
              </TableCell>
              <TableCell align="right">{t('loanPage.label.dueDate')}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.loans.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="right">{row.book.id}</TableCell>
                <TableCell align="right">{row.book.isbn}</TableCell>
                <TableCell align="right">{row.book.title}</TableCell>
                <TableCell align="right">{row.book.author}</TableCell>
                <TableCell align="right">{row.user.id}</TableCell>
                <TableCell align="right">
                  {new Date(row.loanDate).toISOString().split('T')[0]}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.dueDate).toISOString().split('T')[0]}
                </TableCell>
                <TableCell align="right">
                  <ReturnBook loanId={row.id} onReturn={updateLoans} />
                </TableCell>
                <TableCell align="right">
                  <DeleteLoan
                    loanId={row.id}
                    onDelete={updateLoans}
                    setMessage={setMessage}
                    setSuccess={setSuccess}
                    setOpen={setOpen}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.totalItems}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <MySnackbar
        open={open}
        message={message}
        success={success}
        setOpen={setOpen}
      />
    </>
  );
}
