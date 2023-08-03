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




function CourseCard({ userData }) {
    const [
        deleteDialog,
        buttonDisable,
        handleDeleteDialogOpen,
        handleDeleteDialogClose,
        deleteCard
    ] = useInfoCard('courses', userData)


    const renderCardContent = () => {

        return (
            <>
                <Typography
                    variant="h6"
                    sx={{ fontSize: "1.25rem", padding: ".2rem" }}
                >
                    Course details
                </Typography>
                <hr />
                <Box className={styles.user_Data_container}>
                    <Box className={styles.Data}>
                        <Typography variant="h6" className={styles.Detailes}>
                            Duration:
                        </Typography>
                        <Typography variant="body1" className={styles.data_detailes}>
                            {userData.duration} week
                        </Typography>
                    </Box>

                    {userData.description !== '' && <Box className={styles.Data}>
                        <Typography variant="h6" className={styles.Detailes}>
                            Description:
                        </Typography>
                        <Typography variant="body1" className={styles.data_detailes}>
                            {userData.description}
                        </Typography>
                    </Box>}
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
                    <Typography variant="h6" className={styles.name}>
                        {userData.name}
                    </Typography>
                    <Box className={styles.user_Role}>
                        <span>{userData.role}</span>

                    </Box>
                </Box>

                <Box className={styles.user_mainContent}>
                    {renderCardContent()}

                    <Box className={styles.button_container}>
                        <CreateFormDrawer type={'courses'} edit data={userData} />
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
                    {`Are you sure to delete this course?`}
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

export default CourseCard;
