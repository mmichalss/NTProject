import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useBooks from './Book-page-admin-data';
import { GetBookMappedDto } from '../api/dto/book/book.dto';
import DeleteBook from './DeleteBook';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import CreateBook from './CreateBook';

export default function BookFormAdmin() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { books, fetchBooks } = useBooks();

  const updateBooks = () => {
    enqueueSnackbar('Book alternated', { variant: 'success' });
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
                  <DeleteBook bookId={row.id} onDelete={updateBooks} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
