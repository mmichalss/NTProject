import React, { useCallback, useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { UpdateUserDto } from '../api/dto/user/user.dto';
import { useApi } from '../api/ApiProvider';
import useGetMe from '../users_page/getMe';

export default function UserProfileForm() {
  const apiClient = useApi();
  const { t } = useTranslation();
  const { me, fetchMe } = useGetMe();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const submit = useCallback(
    async (values: UpdateUserDto, formik: any) => {
      if (me) {
        const response = await apiClient.updateUser(me.id, values);
        if (response.success) {
          // Handle success
          fetchMe();
        } else {
          // Handle failure
        }
      }
    },
    [apiClient, me],
  );

  if (me === undefined) {
    return <div>No user...</div>;
  }

  return (
    <Formik onSubmit={submit} initialValues={new UpdateUserDto()}>
      {(formik: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                id="name"
                label={me.name}
                variant="outlined"
                onChange={formik.handleChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                id="lastName"
                label={me.lastName}
                variant="outlined"
                onChange={formik.handleChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                id="email"
                label={me.email}
                variant="outlined"
                onChange={formik.handleChange}
                style={{ marginBottom: '10px' }}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: '10px' }}
              >
                {t('change')}
              </Button>
            </form>
          </Typography>
        </div>
      )}
    </Formik>
  );
}
