import { Avatar, Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styles from "../styles/infoCard.module.scss";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { isAuth } from '../utils/isAuth';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';
import { profileSchema } from '../utils/validations/userCreateForm';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useCreateForm from '../hooks/useCreateForm';
import { ToastContainer } from 'react-toastify';


function ProfilePage() {

  const [userData, setUserData] = useState(null)
  const [flag, setFlag] = useState('info')
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const user = useSelector(state => state.reducer.userDetails.user)
  const navigate = useNavigate()


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    let isMounted = true
    const token = isAuth()
    if (user?.role === 'Super Admin') navigate('/')

    const getUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/${user?.role}/${user?.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (isMounted) setUserData(response.data.data)
      } catch (error) {
      }
    }

    getUserDetails()
    return () => {
      isMounted = false
    }
  }, [user,navigate])


  const formik = useFormik({
    initialValues: {
      oldPass: "",
      password: "",
      confirmPass: ""
    },
    onSubmit: () => {
      changePassword()
    },
    validationSchema: profileSchema
  })
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = formik


  const [buttonDisable, changePassword] = useCreateForm(true, user?.role, values, userData?._id)


  const downloadFile = (fileName) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/uploads/${fileName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName.slice(25);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      });
  }


  const cardHead = () => {
    return (
      <Box className={styles.mainContent}>
        <Avatar
          src={`${process.env.REACT_APP_SERVER_URL}/uploads/${userData.image}`}
          variant="square"
          sx={{ width: "120px", height: "120px", borderRadius: "10px" }}
        />
        <Typography variant="h6" className={styles.name}>
          {userData.name}
        </Typography>
      
      </Box>
    )
  }


  const renderCardContent = () => {
    return (
      <>
        <Typography variant="h6" sx={{ fontSize: "1.25rem", padding: ".2rem" }}>
          {user?.role.slice(0, -1)} details
        </Typography>

        <Box className={styles.user_Data_container}>
          <hr />
          {userData.name !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Name:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.name}
              </Typography>
            </Box>
          )}
          {userData.email !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Email
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.email}
              </Typography>
            </Box>
          )}
          {(userData.phoneNumber || userData.phone) !== null && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Phone Number:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.phoneNumber}
              </Typography>
            </Box>
          )}

          {userData.status !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Status:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.status}
              </Typography>
            </Box>
          )}
          {userData.address !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Address:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.address}
              </Typography>
            </Box>
          )}

          {userData.guardian?.name !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Guardian Name:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.guardian.name}
              </Typography>
            </Box>
          )}
          {(userData?.guardian?.phone !== "" || userData.guardian?.phone !== null) && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Guardian Phone Number:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.guardian.phone}
              </Typography>
            </Box>
          )}
          {userData.guardian?.relationship !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Guardian RelationShip:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.guardian.relationship}
              </Typography>
            </Box>
          )}

          {userData.joiningDate !== null && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Joining Date:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.joiningDate}
              </Typography>
            </Box>
          )}


          {user.role === 'staffs' ? <>



            {userData.employmentType !== '' && (
              <Box className={styles.Data}>
                <Typography variant="h6" className={styles.Detailes}>
                  EmploymentType:
                </Typography>
                <Typography variant="body1" className={styles.data_detailes}>
                  {userData.employmentType}
                </Typography>
              </Box>
            )}


            {userData.resignationDate !== null && userData.status === 'resigned' && (
              <Box className={styles.Data}>
                <Typography variant="h6" className={styles.Detailes}>
                  Resignation Date:
                </Typography>
                <Typography variant="body1" className={styles.data_detailes}>
                  {userData.resignationDate}
                </Typography>
              </Box>
            )}


          </> :
            <>

              {userData?.course !== '' && (
                <Box className={styles.Data}>
                  <Typography variant="h6" className={styles.Detailes}>
                    Course:
                  </Typography>
                  <Typography variant="body1" className={styles.data_detailes}>
                    {userData?.course}
                  </Typography>
                </Box>
              )}

              {userData?.batch !== '' && (
                <Box className={styles.Data}>
                  <Typography variant="h6" className={styles.Detailes}>
                    Batch:
                  </Typography>
                  <Typography variant="body1" className={styles.data_detailes}>
                    {userData?.batch}
                  </Typography>
                </Box>
              )}

              {userData?.mentor !== '' && (
                <Box className={styles.Data}>
                  <Typography variant="h6" className={styles.Detailes}>
                    Mentor:
                  </Typography>
                  <Typography variant="body1" className={styles.data_detailes}>
                    {userData?.mentor}
                  </Typography>
                </Box>
              )}


              {userData?.remark !== "" && (
                <Box className={styles.Data}>
                  <Typography variant="h6" className={styles.Detailes}>
                    Remark:
                  </Typography>
                  <Typography variant="body1" className={styles.data_detailes}>
                    {userData?.remark}
                  </Typography>
                </Box>
              )}

              {userData?.week !== null && (
                <Box className={styles.Data}>
                  <Typography variant="h6" className={styles.Detailes}>
                    Current Week:
                  </Typography>
                  <Typography variant="body1" className={styles.data_detailes}>
                    Week {userData?.week}
                  </Typography>
                </Box>
              )}

              {userData?.qualification !== '' && (
                <Box className={styles.Data}>
                  <Typography variant="h6" className={styles.Detailes}>
                    Qualification:
                  </Typography>
                  <Typography variant="body1" className={styles.data_detailes}>
                    {userData?.qualification}
                  </Typography>
                </Box>
              )}


            </>}


        </Box>
      </>
    )
  }

  return (
    <>

      {userData &&
        <Paper
          className={styles.mainContainer}
          sx={{
            borderRadius: "20px",
            color: "rgba(76, 78, 100, 0.87)",
            ...((userData?.document.length < 0 && flag === 'document') && { height: '25em' }),
            ...((userData?.document.length > 0 && flag === 'document') && { width: '30em' }),
            ...(flag === 'password' && { width: '25em', height: '25em' })
          }}
          elevation={7}
        >


          {flag === 'info' ? <>

            <Box className={styles.user_mainContent}>

              {cardHead()}

              {renderCardContent()}

              <Button onClick={() => setFlag('document')}>Show Documents</Button>
              <Button sx={{ marginLeft: '5%' }} onClick={() => setFlag('password')}>Change Password</Button>

            </Box></> : flag === 'document' ?
            <>
              {cardHead()}
              <IconButton sx={{ alignSelf: 'flex-start' }} onClick={() => setFlag('info')}><ArrowBackIcon /></IconButton>

              {userData?.document?.length > 0 ?
                <Table sx={{ padding: '5%' }} >
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Document Name</TableCell>
                      <TableCell align='center'>View link</TableCell>
                      <TableCell align='center'>Download link</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {userData.document?.map(document => (
                      <TableRow display={'flex'} flexDirection={'column'}>

                        <TableCell align='center'>
                          <Typography fontWeight={'bold'}>{document.filename.slice(25)}</Typography>
                        </TableCell>

                        <TableCell align='center'>
                          <Link target="blank" to={`${process.env.REACT_APP_SERVER_URL}/uploads/${document.filename}`} key={document.filename}>
                            <Button variant="outlined" sx={{ textDecoration: 'none' }}>
                              Show file
                            </Button>
                          </Link>
                        </TableCell>

                        <TableCell align='center'>
                          <Button variant="outlined" onClick={() => downloadFile(document.filename)} >
                            Download file
                          </Button>
                        </TableCell>

                      </TableRow>
                    )
                    )}
                  </TableBody>

                </Table> :
                <Typography fontWeight={'bold'} variant="h5" textAlign={'center'}>No documents added</Typography>}


            </> : flag === 'password' ?
              <Box display={'flex'} flexDirection={'column'} height={'100%'}>

                <IconButton sx={{ alignSelf: 'flex-start' }} onClick={() => setFlag('info')}><ArrowBackIcon /></IconButton>

                <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-evenly'}
                    height={'100%'}
                    padding={'5%'}
                  >

                    <FormControl variant="outlined">
                      <InputLabel error={touched.oldPass && Boolean(errors.oldPass)} htmlFor="outlined-adornment-password">Current Password</InputLabel>
                      <OutlinedInput
                        name='oldPass'
                        id='oldPass'
                        value={values.oldPass}
                        error={touched.oldPass && Boolean(errors.oldPass)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        type={showOldPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowOldPassword}
                              onMouseDown={handleMouseDownOldPassword}
                            >
                              {showOldPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label='Current Password'
                      />
                      <FormHelperText sx={{ color: '#d32f2f' }}>{touched.oldPass && errors.oldPass}</FormHelperText>
                    </FormControl>


                    <FormControl variant="outlined">
                      <InputLabel error={touched.password && Boolean(errors.password)} htmlFor="outlined-adornment-password">New Password</InputLabel>
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
                        label='New Password'
                      />
                      <FormHelperText sx={{ color: '#d32f2f' }}>{touched.password && errors.password}</FormHelperText>
                    </FormControl>

                    <TextField
                      type='password'
                      name='confirmPass'
                      value={values.confirmPass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPass && Boolean(errors.confirmPass)}
                      helperText={touched.confirmPass && errors.confirmPass}
                      label={'Confirm Password'}
                    />

                    <Box display={'flex'} justifyContent={'space-between'}>
                      {/* <Button onClick={() => setFlag('forgotPassword')} variant='text'>Forgot Password?</Button> */}
                      <Button disabled={buttonDisable} type='submit' variant='contained'>Submit</Button>
                    </Box>
                  </Box>

                </form>

              </Box> :
              <>

              </>
          }

        </Paper >
      }
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        theme="dark"
      />
    </>

  )
}

export default ProfilePage