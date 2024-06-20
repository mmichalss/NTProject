import { Button, Popover, TextField, Typography } from '@mui/material';
import React from 'react';
import { UpdateUserDto } from '../api/dto/user/user.dto';
import { useApi } from '../api/ApiProvider';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

interface Props {
  userId: number;
  onUpdate: () => void;
  setMessage: (message: string) => void;
  setSuccess: (success: boolean) => void;
  setOpen: (open: boolean) => void;
}

export default function UpdateUser({
  userId,
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
    (values: UpdateUserDto, formik: any) => {
      apiClient.updateUser(userId, values).then((response) => {
        if (response.success) {
          setMessage(t('admin.snackbar.userUpdatedSuccessfully'));
          setOpen(true);
          setSuccess(response.success);
          onUpdate();
        } else {
        }
        setMessage(
          t('admin.snackbar.userUpdateFailed') + ` status: ${response.status}`,
        );
        setOpen(true);
        setSuccess(response.success);
      });
    },
    [apiClient, userId, setMessage, t, setOpen, setSuccess, onUpdate],
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
    <Formik onSubmit={submit} initialValues={new UpdateUserDto()}>
      {(formik: any) => (
        <div>
          <Button aria-describedby={id} onClick={handleClick}>
            {t('update')}
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
                  id="name"
                  label={t('userPage.name')}
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="lastName"
                  label={t('userPage.lastName')}
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="email"
                  label={t('userPage.email')}
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <Button type="submit" variant="contained">
                  {t('update')}
                </Button>
              </form>
            </Typography>
          </Popover>
        </div>
      )}
    </Formik>
  );
}
