import React, { useEffect, useState } from 'react'
import { Box, Button, DialogContent, DialogContentText, IconButton, Paper, Typography } from "@mui/material";
import styles from "../../styles/infoCard.module.scss"
import CreateFormDrawer from '../../pages/CreateFormDrawer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useInfoCard from "../../hooks/useInfoCard";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import AssignmentSubmit from '../Assignment/AssignmentSubmit';
import axios from 'axios';
import { isAuth } from '../../utils/isAuth';
import Students from '../Assignment/Students';
import SubmissionDetails from '../Assignment/SubmissionDetails';

function AssignmentCard({ userData }) {
    const navigate = useNavigate()
    const user = useSelector(state => state.reducer.userDetails.user)


    const [
        deleteDialog,
        buttonDisable,
        handleDeleteDialogOpen,
        handleDeleteDialogClose,
        deleteCard
    ] = useInfoCard('assignments', userData)

    const [students, setStudents] = useState(null)
    const [fetched, setFetched] = useState(false)
    const [flag, setFlag] = useState('info')
    const [submitted, setSubmitted] = useState(null)

    if (userData.dueDate) userData.dueDate = dayjs(userData.dueDate).format('DD MMM YYYY')
    if (userData.createdDate) userData.createdDate = dayjs(userData.createdDate).format('DD MMM YYYY')


    useEffect(() => {
        const token = isAuth()
        let isMounted = true

        const getSubmittedStudents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/assignments/students/${userData?._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (isMounted) setStudents(response.data.data)

            } catch (error) {
            }
        }

        getSubmittedStudents()

        return () => {
            isMounted = false
        }


    }, [fetched, userData?._id])

    useEffect(() => {
        students && students?.submittedStudents.forEach(student => {
            if (student.studentId._id === user.userId) setSubmitted(student)
        })
    }, [students, user])


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

                <Typography
                    variant="h6"
                    sx={{ fontSize: "1.25rem", padding: ".2rem" }}
                >
                    Assignment details
                </Typography>
                <hr />
                <Box className={styles.user_Data_container}>
                    <Box className={styles.Data}>
                        <Typography variant="h6" className={styles.Detailes}>
                            Created By:
                        </Typography>
                        <Typography variant="body1" className={styles.data_detailes}>
                            {userData.createdBy?.name}
                        </Typography>
                    </Box>


                    {userData.createdDate !== null && (
                        <Box className={styles.Data}>
                            <Typography variant="h6" className={styles.Detailes}>
                                Assignment Created Date:
                            </Typography>
                            <Typography variant="body1" className={styles.data_detailes}>
                                {userData.createdDate}
                            </Typography>
                        </Box>
                    )}

                    {userData.description !== '' && <Box className={styles.Data}>
                        <Typography variant="h6" className={styles.Detailes}>
                            Description:
                        </Typography>
                        <Typography variant="body1" className={styles.data_detailes}>
                            {userData.description}
                        </Typography>
                    </Box>}

                    {userData.dueDate !== null && (
                        <Box className={styles.Data}>
                            <Typography variant="h6" className={styles.Detailes}>
                                Assignment Due Date:
                            </Typography>
                            <Typography variant="body1" className={styles.data_detailes}>
                                {userData.dueDate}
                            </Typography>
                        </Box>
                    )}

                    {(userData.fileName && userData.fileName !== '') && <Box className={styles.Data}>
                        <Typography variant="h6" className={styles.Detailes}>
                            Assignment file:
                        </Typography>
                        <Typography variant="body1" className={styles.data_detailes}>
                            <Button variant="outlined" onClick={() => downloadFile(userData?.fileName)} >
                                Download file
                            </Button>
                        </Typography>
                    </Box>}


                </Box>
            </>
        );


    }

    return (
        <React.Fragment>

            {flag === 'info' && <Paper
                className={styles.mainContainer}
                sx={{
                    borderRadius: "20px",
                    color: "rgba(76, 78, 100, 0.87)",
                }}
                elevation={7}
            >
                <IconButton onClick={() => navigate('/assignments')} sx={{ padding: '3%' }}>
                    <ArrowBack />
                </IconButton>

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

                    {user.role !== 'students' && <Box>

                        <Button fullWidth variant='contained' color='success' onClick={() => setFlag('students')}>Submitted Students</Button>

                        {user?.role === 'staffs' && <Box className={styles.button_container}>
                            <CreateFormDrawer type={'assignments'} edit data={userData} />
                            <Button variant="outlined" color="error" onClick={handleDeleteDialogOpen}>
                                Delete
                            </Button>
                        </Box>
                        }

                    </Box>}

                    {user.role === 'students' && <Box className={styles.button_container}>
                        {submitted ? <>
                            <Typography fontWeight={'bold'} color={'black'}>
                                Assignment submitted
                            </Typography>
                            <Button variant='outlined' color='success' onClick={() => setFlag('submitted')}>Details </Button>
                        </>

                            :
                            <AssignmentSubmit userId={user?.userId} />}

                    </Box>}

                </Box>

            </Paper>}

            {flag === 'students' &&
                <Paper
                    elevation={7}
                    sx={{
                        padding: '4%',
                        width: '60em',
                        height: '30em'
                    }}
                >
                    <IconButton onClick={() => setFlag('info')}>
                        <ArrowBack />
                    </IconButton>
                    {students?.submittedStudents?.length > 0 ? <>
                        <Students students={students} setFetch={setFetched} role={user?.role} />
                    </>
                        :
                        <Typography textAlign={'center'} color='black' variant='h4'>
                            No students has submitted yet!
                        </Typography>}


                </Paper>
            }

            {flag === 'submitted' &&
                <Paper
                    elevation={7}
                    sx={{
                        padding: '4%',
                        width: '60em',
                        height: '30em'
                    }}
                >
                    <IconButton onClick={() => setFlag('info')}>
                        <ArrowBack />
                    </IconButton>
                    <SubmissionDetails details={submitted} />

                </Paper>
            }

            <ToastContainer />

            <Dialog
                open={deleteDialog}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure to delete this assignment?`}
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

            <ToastContainer />

        </React.Fragment>
    )
}

export default AssignmentCard