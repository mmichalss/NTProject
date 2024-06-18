import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

function createData(title: string, author: string, available: string) {
  return { title, author, available };
}

// TODO: rows = map GetBookDto to title, author, available. Hard code three recomendation.
const rows = [
  createData('Pride and Prejudice', 'Jane Austen', 'true'),
  createData('Persuasion', 'Jane Austen', 'false'),
  createData('Emma', 'Jane Austen', 'true'),
];

const columnNames = ['Title', 'Author', 'Available'];

function ColumnNames() {
  return (
    <>
      {columnNames.map((columnName) => (
        <TableCell key={columnName} align="left">
          {columnName}
        </TableCell>
      ))}
    </>
  );
}

function RecomendationTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <ColumnNames />
          </TableRow>
        </TableHead>
        <TableBody sx={{ '& > * + *': { mt: 0.5 } }}>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.author}</TableCell>
              <TableCell align="left">{row.available}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Tables() {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>our recomendations</h2>
      <RecomendationTable />
      <h2>most read books</h2>
      <RecomendationTable />
    </Box>
  );
}
