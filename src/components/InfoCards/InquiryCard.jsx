import React from "react";
import { Box, Button, DialogContent, DialogContentText, Paper, Typography } from "@mui/material";
import styles from "../../styles/infoCard.module.scss"
import CreateFormDrawer from '../../pages/CreateFormDrawer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useInfoCard from "../../hooks/useInfoCard";
import dayjs from "dayjs";



function InquiryCard({ userData }) {

  const [
    deleteDialog,
    buttonDisable,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    deleteCard
  ] = useInfoCard('inquiries', userData)

  if (userData.createdOn) userData.createdOn = dayjs(userData.createdOn).format('DD MMM YYYY')
  if (userData.nextFollowUp) userData.nextFollowUp = dayjs(userData.nextFollowUp).format('DD MMM YYYY')

  const renderCardContent = () => {

    return (
      <>
        <Typography
          variant="h6"
          sx={{ fontSize: "1.25rem", padding: ".2rem" }}
        >
          Inquiry details
        </Typography>
        <hr />
        <Box className={styles.user_Data_container}>

          <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Name:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.name}
            </Typography>
          </Box>

          {userData.phone !== null && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Phone Number:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.phone}
            </Typography>
          </Box>}


          {userData.address !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Address:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.address}
            </Typography>
          </Box>
          }

          {userData.reference !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Reference:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.reference}
            </Typography>
          </Box>
          }

          {userData.course !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Interested Course:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.course}
            </Typography>
          </Box>
          }

          {userData.email !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Email:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.email}
            </Typography>
          </Box>
          }

          {userData.staff !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Assigned Staff:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.staff}
            </Typography>
          </Box>
          }

          {userData.createdOn !== null && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Created On:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.createdOn}
            </Typography>
          </Box>
          }

          {userData.qualification !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Qualification:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.qualification}
            </Typography>
          </Box>
          }

          {userData.branch !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Branch:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.branch}
            </Typography>
          </Box>
          }

          {userData.status !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Status:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.status}
            </Typography>
          </Box>
          }

          {userData.remark !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Remark:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.remark}
            </Typography>
          </Box>
          }

          {userData.possibility !== '' && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Possibility:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.possibility}
            </Typography>
          </Box>
          }

          {userData.nextFollowUp !== null && <Box className={styles.Data}>
            <Typography variant="h6" className={styles.Detailes}>
              Next follow up:
            </Typography>
            <Typography variant="body1" className={styles.data_detailes}>
              {userData.nextFollowUp}
            </Typography>
          </Box>
          }
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
        }}
        elevation={7}
      >
        <Box className={styles.mainContent}>
          <Typography variant="h5" className={styles.name}>
            {userData.name}
          </Typography>
          <Box className={styles.user_Role}>
            <span>{userData.role}</span>

          </Box>
        </Box>

        <Box className={styles.user_mainContent}>
          {renderCardContent()}

          <Box className={styles.button_container}>
            <CreateFormDrawer type={'inquiries'} edit data={userData} />
            <Button variant="outlined" color="error" onClick={handleDeleteDialogOpen}>
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>
      <ToastContainer />

      <Dialog
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to delete this inquiry?`}
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
    </>
  );
}

export default InquiryCard;
