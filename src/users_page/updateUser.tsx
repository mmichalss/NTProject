import { Button, Popover, TextField, Typography } from '@mui/material';
import React from 'react';
import { UpdateUserDto } from '../api/dto/user/user.dto';
import { useApi } from '../api/ApiProvider';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

interface UpdateUserProps {
  userId: number;
  onUpdate: () => void; // Callback to update the user list
}

export default function UpdateUser({ userId, onUpdate }: UpdateUserProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const apiClient = useApi();
  const { t } = useTranslation();

  const submit = React.useCallback(
    (values: UpdateUserDto, formik: any) => {
      apiClient.updateUser(userId, values).then((response) => {
        if (response.success) {
          onUpdate();
        } else {
        }
      });
    },
    [apiClient, userId, onUpdate],
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
                  label="Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
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
