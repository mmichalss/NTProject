import useUsersData from './users_data';
import { GetUserDto } from '../api/dto/user/user.dto';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import UpdateUser from './updateUser';

export default function UsersForm() {
  const rows = useUsersData();
  const [rowsState, setRowsState] = React.useState<GetUserDto[] | undefined>(
    rows,
  );

  if (rows === undefined) {
    return <div>No users...</div>;
  } else {
    return BasicTable();
  }

  function updateUsers() {
    setRowsState(rows);
  }

  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">last_name</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows!!.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">
                  <UpdateUser userId={row.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
