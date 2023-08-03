import React from "react";
import { Box, Button, DialogContent, DialogContentText, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import styles from "../../styles/infoCard.module.scss"
import CreateFormDrawer from '../../pages/CreateFormDrawer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useInfoCard from "../../hooks/useInfoCard";
import { Link } from "react-router-dom";
import dayjs from "dayjs";


function BatchCard({ userData }) {

    const [
        deleteDialog,
        buttonDisable,
        handleDeleteDialogOpen,
        handleDeleteDialogClose,
        deleteCard
    ] = useInfoCard('batches', userData)

    if (userData.batchStarted) userData.batchStarted = dayjs(userData.batchStarted).format('DD MMM YYYY')

    const renderCardContent = () => {

        return (
            <>
                <Typography
                    variant="h5"
                    fontWeight={'700'}
                    paddingTop={"1%"}
                >
                    Batch details
                </Typography>
                <hr />
                <Box className={styles.user_Data_container}>


                    <Box >
                        {userData.batchStarted !== null &&
                            <Box display={'flex'} padding={'2%'}>
                                <Typography variant="" className={styles.Detailes}>
                                    Batch Started Date 
                                </Typography>
                                <Typography variant="body1" fontWeight={'bold'} className={styles.data_detailes}>
                                    : {userData?.batchStarted}
                                </Typography>
                            </Box>}

                        {userData?.students?.length > 0 ?
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Week</TableCell>
                                        <TableCell>Advisor</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {userData.students?.map(student => {
                                        return (
                                            <TableRow key={student._id}>
                                                <TableCell>
                                                    <Link to={`/students/${student._id}`}>
                                                        {student.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{student.course}</TableCell>
                                                <TableCell>{student.week}</TableCell>
                                                <TableCell>{student.advisor}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                            :
                            <Typography color={'#eb3e2f'} padding={'2%'} fontWeight={'bold'} variant="h6">
                                This batch has no students !!!
                            </Typography>}
                    </Box>
                </Box>
            </>
        );


    }


    return (
        <>
            <Paper
                className={'styles.mainContainer'}
                sx={{
                    padding: '5%',
                    width: '30em',
                    color: "rgba(76, 78, 100)",
                }}
                elevation={7}
            >
                <Box className={styles.mainContent}>
                    <Typography variant="h6" className={styles.name}>
                        {userData?.name}
                    </Typography>
                </Box>

                <Box className={styles.user_mainContent}>
                    {renderCardContent()}
                    <Box className={styles.button_container}>
                        <CreateFormDrawer type={'batches'} edit data={userData} />
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

export default BatchCard