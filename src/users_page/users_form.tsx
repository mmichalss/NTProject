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
import { Button, Link } from '@mui/material';
import UpdateUser from './updateUser';
import AddNewUser from './addNewUser';
import { useTranslation } from 'react-i18next';

export default function UsersForm() {
  const { users, fetchUsers } = useUsersData(); // Destructure users and fetchUsers
  const [rowsState, setRowsState] = React.useState<GetUserDto[] | undefined>(
    users,
  );

  const { t } = useTranslation();

  React.useEffect(() => {
    fetchUsers(); // Initial fetch
  }, [fetchUsers]);

  if (users === undefined) {
    return <div>No users...</div>;
  } else {
    return BasicTable();
  }

  function updateUsers() {
    fetchUsers();
  }

  function BasicTable() {
    return (
      <>
        <AddNewUser onUpdate={updateUsers} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">{t('userPage.userId')}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{t('userPage.email')}</TableCell>
                <TableCell align="right">{t('userPage.name')}</TableCell>
                <TableCell align="right">{t('userPage.lastName')}</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users!!.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">
                    <Link href={`/home/users/loans/${row.id}`}>
                      <Button>{t('loans')}</Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">
                    <UpdateUser userId={row.id} onUpdate={updateUsers} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
