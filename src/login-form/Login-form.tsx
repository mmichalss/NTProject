import { Button, TextField } from '@mui/material';
import './Login-form.css';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  username: string;
  password: string;
};

function LoginForm() {
  const initialValues = { username: '', password: '' };

  const navigate = useNavigate();

  const submit = useCallback(
    (values: FormValues, formik: any) => {
      console.log(values);
      navigate('/home');
      formik.resetForm();
    },
    [navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup.string().required("username can't be empty"),
        password: yup
          .string()
          .required("password can't be empty")
          .min(5, 'password must be at least 5 characters'),
      }),
    [],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange
    >
      {(formik: any) => (
        <form
          id="loginForm"
          className="Login-form"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="username"
            label="username"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username} //!! = Boolean
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="outlined"
            startIcon={<LoginIcon />}
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            login
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
