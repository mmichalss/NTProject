import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { RegisterDto } from '../api/dto/register/register.dto';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

export default function AddNewUser({ onUpdate }: { onUpdate: () => void }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const apiClient = useApi();
  const { t } = useTranslation();

  const submit = React.useCallback(
    (values: RegisterDto, formik: any) => {
      apiClient.register(values).then((response) => {
        if (response.success) {
          onUpdate();
        } else {
        }
      });
    },
    [apiClient, onUpdate],
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
    <Formik onSubmit={submit} initialValues={new RegisterDto()}>
      {(formik: any) => (
        <div>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            {t('userPage.addNew')}
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
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="role"
                  label="Role"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <Button type="submit" variant="contained">
                  {t('userPage.addNew')}
                </Button>
              </form>
            </Typography>
          </Popover>
        </div>
      )}
    </Formik>
  );
}
