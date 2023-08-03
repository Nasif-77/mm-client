import React, { useState } from "react";
import { Avatar, Box, Button, DialogContent, DialogContentText, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import styles from "../../styles/infoCard.module.scss"
import CreateFormDrawer from '../../pages/CreateFormDrawer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useInfoCard from "../../hooks/useInfoCard";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../../utils/isAuth";




function StudentCard({ userData }) {

  const [
    deleteDialog,
    buttonDisable,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    deleteCard
  ] = useInfoCard('students', userData)

  const [flag, setFlag] = useState('info')
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    fileName: '',
    disabled: false
  })
  const token = isAuth()


  if (userData.joiningDate) userData.joiningDate = dayjs(userData.joiningDate).format('DD MMM YYYY')

  const deleteFile = async () => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/admin/students/${userData._id}`, {
        documentName: deleteModal.fileName
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 201) {
        setDeleteModal({ ...deleteModal, disabled: true })
        setTimeout(() => {
          window.location.reload()
        }, 2000);
        toast.success("Succesfully deleted")
      }

    } catch (error) {
      toast.error("error!!!!!!")
    }
  }

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

  const { name, course, batch, email, address, guardian, phone, joiningDate, grade, week, mentor, qualification, status, remark } = userData;

  const renderCardContent = () => {

    return (
      <>
        <Typography
          variant="h6"
          sx={{ fontSize: "1.25rem", padding: ".2rem" }}
        >
          Student details
        </Typography>
        <hr />

        <Box className={styles.user_Data_container}>

          {name !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Name:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {name}
              </Typography>
            </Box>
          )}

          {phone !== null && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Phone Number:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {phone}
            </Typography>
          </Box>}

          {course !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Course:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {course}
              </Typography>
            </Box>
          )}

          {batch !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Batch:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {batch}
              </Typography>
            </Box>
          )}

          {email !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Email:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {email}
              </Typography>
            </Box>
          )}

          {address !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Address:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {address}
              </Typography>
            </Box>
          )}

          {joiningDate !== null && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                joiningDate:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {joiningDate}
              </Typography>
            </Box>
          )}

          {mentor !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Mentor:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {mentor}
              </Typography>
            </Box>
          )}

          {grade !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Grade:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {grade}
              </Typography>
            </Box>
          )}

          {remark !== "" && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Remark:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {remark}
              </Typography>
            </Box>
          )}

          {week !== null && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Current Week:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                Week {week}
              </Typography>
            </Box>
          )}

          {qualification !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Qualification:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {qualification}
              </Typography>
            </Box>
          )}


          {status !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Status:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {status}
              </Typography>
            </Box>
          )}

          {guardian.name !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Guardian Name:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {guardian.name}
              </Typography>
            </Box>
          )}

          {guardian.relationship !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Guardian Relationship:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {guardian.relationship}
              </Typography>
            </Box>
          )}

          {guardian.phone !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Guardian Phone:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {guardian.phone}
              </Typography>
            </Box>
          )}

        </Box>
      </>
    );


  }

  return (
    <>
      <Paper
        className={styles.mainContainer}
        sx={{
          borderRadius: "20px",
          color: "rgba(76, 78, 100, 0.87)",
          ...(flag === 'document' && { width: '40em' })
        }}
        elevation={7}
      >
        <Box className={styles.mainContent}>
          <Avatar
            src={`${process.env.REACT_APP_SERVER_URL}/uploads/${userData.image}`}
            variant="square"
            sx={{ width: "120px", height: "120px", borderRadius: "10px" }}
          />
          <Typography variant="h6" className={styles.name}>
            {userData.name}
          </Typography>
          <Box className={styles.user_Role}>
            <span>{userData.role}</span>

          </Box>
        </Box>

        {flag === 'info' ? <>

          <Box className={styles.user_mainContent}>
            {renderCardContent()}

            <Button onClick={() => setFlag('document')}>Show Documents</Button>
          </Box></> :
          <>

            {userData?.document?.length > 0 ? <Table sx={{ padding: '5%' }} >
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Document Name</TableCell>
                  <TableCell align='center'>View link</TableCell>
                  <TableCell align='center'>Download link</TableCell>
                  <TableCell align='center'>Delete File</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {userData.document?.map(document => (
                  <TableRow display={'flex'} flexDirection={'column'}>

                    <TableCell align='center'>
                      <Typography fontWeight={'bold'}>{document.filename.slice(25)}</Typography>
                    </TableCell>

                    <TableCell align='center'>
                      <Link download target="blank" to={`${process.env.REACT_APP_SERVER_URL}/uploads/${document.filename}`} key={document.filename}>
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

                    <TableCell align='center'>
                      <Button color="error" onClick={() => setDeleteModal({ open: true, fileName: document.filename })} >
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
                )
                )}
              </TableBody>

            </Table> : <Typography fontWeight={'bold'} variant="h6" textAlign={'center'}>Please add some documents</Typography>}

            <Button sx={{ marginLeft: '5%' }} onClick={() => setFlag('info')}>Show Info</Button>

          </>}
        <Box className={styles.button_container}>
          <CreateFormDrawer type={'students'} edit data={userData} />
          <Button variant="outlined" color="error" onClick={handleDeleteDialogOpen}>
            Delete
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to delete this student?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Name : <strong>{userData.name}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={deleteCard} disabled={buttonDisable} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, fileName: '' })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to delete this Document?`}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal({ open: false, fileName: '' })}>Cancel</Button>
          <Button onClick={() => deleteFile()} disabled={deleteModal.disabled} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
}

export default StudentCard;
