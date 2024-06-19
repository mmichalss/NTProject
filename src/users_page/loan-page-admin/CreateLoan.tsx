import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { CreateLoanDto } from '../../api/dto/loan/loan.dto';
import { useApi } from '../../api/ApiProvider';

interface CreateLoanItemProps {
  setShowForm: (showForm: boolean) => void;
  onCreate: () => void;
}

const CreateLoanItem: React.FC<CreateLoanItemProps> = ({
  setShowForm,
  onCreate,
}) => {
  const { t } = useTranslation();
  const apiClient = useApi();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = React.useCallback(
    async (values: CreateLoanDto, formik: FormikHelpers<CreateLoanDto>) => {
      try {
        const response = await apiClient.createLoan(values);

        if (response.success) {
          setShowForm(false);
          onCreate();
          formik.resetForm();
        }
      } catch (error) {
        // Handle error
      }
    },
    [apiClient, setShowForm, onCreate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        userId: yup.number().required(t('admin.errors.userIdCantBeEmpty')),
        bookId: yup.number().required(t('admin.errors.bookIdCantBeEmpty')),
        dueDate: yup.date().required(t('admin.errors.dueDateCantBeEmpty')),
      }),
    [t],
  );

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={new CreateLoanDto()}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange
    >
      {(formik) => (
        <Box
          marginLeft={isMobile ? 0 : 3}
          component="form"
          noValidate
          autoComplete="on"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '& > div': {
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
            },
            '& > div:first-of-type': {
              marginRight: isMobile ? 0 : 2,
            },
          }}
        >
          <Box>
            <TextField
              id="userId"
              label={t('userId')}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userId && !!formik.errors.userId}
              helperText={formik.touched.userId && formik.errors.userId}
            />
            <TextField
              id="bookId"
              label={t('bookPage.label.bookId')}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bookId && !!formik.errors.bookId}
              helperText={formik.touched.bookId && formik.errors.bookId}
            />
            <TextField
              id="dueDate"
              label={t('loanPage.label.dueDate')}
              variant="outlined"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dueDate && !!formik.errors.dueDate}
              helperText={formik.touched.dueDate && formik.errors.dueDate}
            />
          </Box>
          <Box
            marginLeft={isMobile ? 0 : 2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                height: '100%',
                padding: '16px 32px',
                fontSize: '1.25rem',
              }}
              disabled={!(formik.isValid && formik.dirty)}
            >
              {t('bookPage.label.create')}
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default function CreateLoan({ onCreate }: { onCreate: () => void }) {
  const [showForm, setShowForm] = React.useState(false);
  const { t } = useTranslation();

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          marginTop: '5%',
        }}
      >
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Button
            variant={showForm ? 'outlined' : 'contained'}
            onClick={handleButtonClick}
          >
            {showForm ? t('bookPage.label.cancel') : t('bookPage.label.create')}
          </Button>
        </Box>
      </Box>
      {showForm && (
        <CreateLoanItem setShowForm={setShowForm} onCreate={onCreate} />
      )}
    </>
  );
}
