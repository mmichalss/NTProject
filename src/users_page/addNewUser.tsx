import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { RegisterDto } from '../api/dto/register/register.dto';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

interface Props {
  onUpdate: () => void;
  setMessage: (message: string) => void;
  setSuccess: (success: boolean) => void;
  setOpen: (open: boolean) => void;
}

export default function AddNewUser({
  onUpdate,
  setMessage,
  setSuccess,
  setOpen,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const apiClient = useApi();
  const { t } = useTranslation();

  const submit = React.useCallback(
    (values: RegisterDto, formik: any) => {
      apiClient.register(values).then((response) => {
        if (response.success) {
          setMessage(t('admin.snackbar.userCreatedSuccessfully'));
          setOpen(true);
          setSuccess(response.success);
          onUpdate();
        } else {
          setMessage(
            t('admin.snackbar.userCreationFailed') +
              ` status: ${response.status}`,
          );
          setOpen(true);
          setSuccess(response.success);
        }
      });
    },
    [apiClient, onUpdate, setMessage, setOpen, setSuccess, t],
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
                  label={t('userPage.username')}
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="password"
                  label={t('userPage.password')}
                  type="password"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="role"
                  label={t('userPage.role')}
                  variant="outlined"
                  select
                  size="medium"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="ROLE_READER">ROLE_READER</MenuItem>
                  <MenuItem value="ROLE_ADMIN">ROLE_ADMIN</MenuItem>
                </TextField>
                <TextField
                  id="email"
                  label={t('userPage.email')}
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
