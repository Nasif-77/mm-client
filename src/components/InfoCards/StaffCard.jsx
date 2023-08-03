import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "../../styles/infoCard.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CreateFormDrawer from "../../pages/CreateFormDrawer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useInfoCard from "../../hooks/useInfoCard";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../../utils/isAuth";

function StaffCard({ userData }) {
  const [
    deleteDialog,
    buttonDisable,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    deleteCard,
  ] = useInfoCard("staffs", userData);

  const [flag, setFlag] = useState('info')
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    fileName: '',
    disabled: false
  })
  const token = isAuth()


  if (userData.joiningDate) userData.joiningDate = dayjs(userData.joiningDate).format('DD MMM YYYY')
  if (userData.resignationDate) userData.resignationDate = dayjs(userData.resignationDate).format('DD MMM YYYY')

  const deleteFile = async () => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/admin/staffs/${userData._id}`, {
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

  const renderCardContent = () => {
    return (
      <>
        <Typography variant="h6" sx={{ fontSize: "1.25rem", padding: ".2rem" }}>
          Mentor details
        </Typography>
        <hr />
        <Box className={styles.user_Data_container}>
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
          {userData.phoneNumber !== null && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Phone Number:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.phoneNumber}
              </Typography>
            </Box>
          )}
          {userData.role !== '' && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Role:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.role}
              </Typography>
            </Box>
          )}

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

          {/* {userData.employeeId && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Employ ID:
              </Typography>
              <Typography variant="body1" className={styles.data_detailes}>
                {userData.employeeId}
              </Typography>
            </Box>
          )} */}

          {userData.permissions?.length > 0 && (
            <Box className={styles.Data}>
              <Typography variant="h6" className={styles.Detailes}>
                Permissions:
              </Typography>
              <List className={styles.data_detailes}>
                {userData.permissions?.map((permission) => {
                  return (
                    <ListItem key={permission}>
                      <ListItemIcon>
                        <ArrowForwardIosIcon />
                      </ListItemIcon>
                      <ListItemText primary={permission} />
                    </ListItem>
                  );
                })}
              </List>
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
          {userData.guardian?.phone !== null && (
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
        </Box>
      </>
    );
  };

  return (
    <>
      <Paper
        className={styles.mainContainer}
        sx={{
          borderRadius: "20px",
          color: "rgba(76, 78, 100, 0.87)",
          ...((userData?.document.length < 0 && flag === 'document') && { height: '25em' }),
          ...((userData?.document.length > 0 && flag === 'document') && { width: '40em' }),
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
          <CreateFormDrawer type={"staffs"} edit data={userData} />
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteDialogOpen}
          >
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
          {`Are you sure to delete this staff?`}
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

export default StaffCard;
