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

export default function UsersForm() {
  const rows: GetUserDto[] | undefined = useUsersData();

  if (rows === undefined) {
    return <div>No users...</div>;
  } else {
    return BasicTable();
  }

  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows!!.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{changeButton(row.id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function changeButton(userId: number) {
    return <Button onClick={() => {}}>change</Button>;

    function setOnClick() {
      // call alter user funciton, with id provided.
      // then pop up window, with new paramters to be provided.
    }
  }
}
