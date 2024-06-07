import { Button } from '@mui/material';
import UsersForm from './users_form';
import AddNewUser from './addNewUser';

export default function UsersPage() {
  return (
    <>
      <h1>Users Page</h1>
      <AddNewUser />
      <UsersForm />
    </>
  );
}
