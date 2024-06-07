import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddNewUser() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  type FormValues = {
    username: string;
    password: string;
    role: string;
    email: string;
  };

  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = React.useCallback(
    (values: FormValues, formik: any) => {
      apiClient.register(values).then((response) => {
        if (response.success) {
        } else {
        }
      });
    },
    [apiClient, navigate],
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Add new User
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          <TextField label="Username" variant="outlined" />
          <TextField label="Password" type="password" variant="outlined" />
          <TextField label="Role" variant="outlined" />
          <TextField label="Email" variant="outlined" />
          <Button type="submit" variant="contained">
            ADD
          </Button>
        </Typography>
      </Popover>
    </div>
  );
}
