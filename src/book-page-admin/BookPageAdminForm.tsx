import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useBooks from './BookPageAdminData';
import DeleteBook from './DeleteBook';
import { useTranslation } from 'react-i18next';
import CreateBook from './CreateBook';
import MySnackbar from '../errors_and_snackbars/Snackbar';
import React from 'react';

export default function BookFormAdmin() {
  const { t } = useTranslation();
  const { books, fetchBooks } = useBooks();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const updateBooks = () => {
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (books === undefined) {
    return <div>No books...</div>;
  }

  return (
    <>
      <CreateBook onCreate={updateBooks} />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          {...{ hover: 'true' }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">{t('bookPage.label.isbn')}</TableCell>
              <TableCell align="right">{t('bookPage.label.title')}</TableCell>
              <TableCell align="right">{t('bookPage.label.author')}</TableCell>
              <TableCell align="right">
                {t('bookPage.label.publisher')}
              </TableCell>
              <TableCell align="right">
                {t('bookPage.label.yearPublished')}
              </TableCell>
              <TableCell align="right">
                {t('bookPage.label.available')}
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.isbn}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.publisher}</TableCell>
                <TableCell align="right">{row.yearPublished}</TableCell>
                <TableCell align="right">{row.available}</TableCell>
                <TableCell align="right">
                  <DeleteBook
                    bookId={row.id}
                    onDelete={updateBooks}
                    setMessage={setMessage}
                    setSuccess={setSuccess}
                    setOpen={setOpen}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
