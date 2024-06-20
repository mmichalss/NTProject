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
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateBookDto } from '../api/dto/book/book.dto';
import { useApi } from '../api/ApiProvider';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import MySnackbar from '../errors_and_snackbars/Snackbar';

interface CreateBookItemProps {
  setShowForm: (showForm: boolean) => void;
  onCreate: () => void;
  setMessage: (message: string) => void;
  setSuccess: (success: boolean) => void;
  setOpen: (open: boolean) => void;
}

const CreateBookItem: React.FC<CreateBookItemProps> = ({
  setShowForm,
  onCreate,
  setMessage,
  setSuccess,
  setOpen,
}) => {
  const { t } = useTranslation();
  const apiClient = useApi();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = React.useCallback(
    async (values: CreateBookDto, formik: FormikHelpers<CreateBookDto>) => {
      try {
        const response = await apiClient.createBook(values);

        if (response.success) {
          setMessage(t('admin.snackbar.bookCreatedSuccessfully'));
          setOpen(true);
          setSuccess(response.success);
          setShowForm(false);
          onCreate();
          formik.resetForm();
        } else {
          setMessage(t('admin.snackbar.bookCreationFailed'));
          setOpen(true);
          setSuccess(response.success);
        }
      } catch (error) {
        // Handle error
      }
    },
    [apiClient, setMessage, t, setOpen, setSuccess, setShowForm, onCreate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        isbn: yup.number().required(t('admin.errors.isbnCantBeEmpty')),
        title: yup.string().required(t('admin.errors.titleCantBeEmpty')),
        author: yup.string().required(t('admin.errors.authorCantBeEmpty')),
        publisher: yup
          .string()
          .required(t('admin.errors.publisherCantBeEmpty')),
        yearPublished: yup
          .number()
          .required(t('admin.errors.yearPublishedCantBeEmpty')),
        availableCopies: yup
          .number()
          .required(t('admin.errors.availableCopiesCantBeEmpty')),
      }),
    [t],
  );

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={new CreateBookDto()}
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
                id="isbn"
                label={t('bookPage.label.isbn')}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.isbn && !!formik.errors.isbn}
                helperText={formik.touched.isbn && formik.errors.isbn}
              />
              <TextField
                id="title"
                label={t('bookPage.label.title')}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && !!formik.errors.title}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                id="author"
                label={t('bookPage.label.author')}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.author && !!formik.errors.author}
                helperText={formik.touched.author && formik.errors.author}
              />
            </Box>
            <Box>
              <TextField
                id="publisher"
                label={t('bookPage.label.publisher')}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.publisher && !!formik.errors.publisher}
                helperText={formik.touched.publisher && formik.errors.publisher}
              />
              <TextField
                id="yearPublished"
                label={t('bookPage.label.yearPublished')}
                variant="outlined"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.yearPublished && !!formik.errors.yearPublished
                }
                helperText={
                  formik.touched.yearPublished && formik.errors.yearPublished
                }
              />
              <TextField
                id="availableCopies"
                label={t('bookPage.label.numberOfAvailableCopies')}
                variant="outlined"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.availableCopies &&
                  !!formik.errors.availableCopies
                }
                helperText={
                  formik.touched.availableCopies &&
                  formik.errors.availableCopies
                }
              />
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
          </Box>
        )}
      </Formik>
    </>
  );
};

export default function CreateBook({ onCreate }: { onCreate: () => void }) {
  const [showForm, setShowForm] = React.useState(false);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

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
        <CreateBookItem
          setShowForm={setShowForm}
          onCreate={onCreate}
          setMessage={setMessage}
          setSuccess={setSuccess}
          setOpen={setOpen}
        />
      )}

      <MySnackbar
        open={open}
        message={message}
        success={success}
        setOpen={setOpen}
      />
    </>
  );
}
