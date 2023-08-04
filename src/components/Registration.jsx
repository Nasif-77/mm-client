import styles from "../styles/registration.module.scss";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";


import { loginAuthentication } from "../utils/validations/userCreateForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function Registration({ login, submitLogin, response }) {

  const [showPassword, setShowPassword] = useState(false);


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {

        email: "",
        password: ""
      },
      validationSchema: loginAuthentication,
      onSubmit: (values) => {
        // submitLogin(values)
        submitLogin(values);
      },
    });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  return (
    <div>
      <Box
        borderRadius={'5%'}
        padding={'5%'}
        sx={{ maxWidth: "450px", backgroundColor: 'white' }}>
        <Box className={styles.content_Container}>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <Typography variant="h5" sx={{ fontSize: "1.6rem" }}>
              Welcome To Mentor Mangement
            </Typography>
            <Typography variant="body2" className={styles.ptag}>
              Please {login ? "sign in" : "create an account"} to get started
            </Typography>
          </Box>
        </Box>
        <form action="" onSubmit={handleSubmit} >
          {!login && (
            <Box className={styles.form_Content}>
              <TextField
                fullWidth
                label="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Box>
          )}
          <Box className={styles.form_Content}>
            <TextField
              fullWidth
              label="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>

          <Box className={styles.form_Content}>

            <FormControl variant="outlined">
              <InputLabel error={touched.password && Boolean(errors.password)} htmlFor="outlined-adornment-password"> Password</InputLabel>
              <OutlinedInput
                name='password'
                id='password'
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{touched.password && errors.password}</FormHelperText>
            </FormControl>
          </Box>

          <Typography textAlign={'center'} color={'red'}>
            {response}
          </Typography>

          <Button
            className={styles.custom_button}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            type="submit"
          >
            {login ? "Login" : "Register"}
          </Button>
          <Box className={styles.createnew_account}>
          </Box>

        </form>
      </Box>
    </div>
  );
}

export default Registration;
