import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { isAuth } from '../../utils/isAuth'
import { Assignment } from '@mui/icons-material'
import { assignmentSubmitSchema } from '../../utils/validations/userCreateForm'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function AssignmentSubmit({ userId }) {

    const [dialog, setDialog] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)
    const [assignment, setAssignment] = useState({})

    const { id } = useParams()

    const handleDialogOpen = () => {
        setDialog(true);
    };

    const handleDialogClose = () => {
        setDialog(false);
        setAssignment({});
    };



    const formik = useFormik({
        initialValues: {
            studentId: userId,
            submittedDate: Date.now(),
            assignment: ""
        },
        onSubmit: () => {

        },
        validationSchema: assignmentSubmitSchema
    })

    const { values } = formik

    const submitAssignment = async () => {
        const token = isAuth()
        setButtonDisable(true)

        const data = new FormData()
        data.append('studentId', values.studentId)
        data.append('submittedDate', values.submittedDate)
        data.append('assignment', values.assignment)


        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/assignments/students/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                toast.success("Succesfully submitted the assignment")
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }

        } catch (error) {
            toast.error('Something Went Wrong')
            setButtonDisable(false)
        }

    }
    return (
        <React.Fragment>

            <Button variant="contained" onClick={handleDialogOpen} >
                Submit Assignment
            </Button>

            <Dialog
                open={dialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Please select the file for this assignment?`}
                </DialogTitle>
                <DialogContent>
                    {assignment.name && <DialogContentText id="alert-dialog-description">
                        File Name : <strong>{assignment?.name}</strong>
                    </DialogContentText>}
                </DialogContent>
                <DialogActions sx={{ ...(assignment.name && { display: 'flex', flexDirection: 'column' }) }}>
                    <Box padding={'5%'} display={'flex'} justifyContent={'space-evenly'} width={'100%'}>
                        <FormControl>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<Assignment />}
                            >
                                {assignment.name ? "Change" : " Upload"} File
                                <input
                                    type="file"
                                    hidden
                                    name="assignment"
                                    onChange={(e) => {
                                        if (e.target.files.length > 0) {
                                            values.assignment = e.target.files[0];
                                            setAssignment(e.target.files[0])
                                        }
                                    }}
                                />
                            </Button>
                        </FormControl>

                        <Button onClick={handleDialogClose}>Cancel</Button>
                    </Box>

                    {assignment.name &&
                        <Button fullWidth onClick={submitAssignment} variant='contained' disabled={buttonDisable} autoFocus>
                            Submit
                        </Button>
                    }

                </DialogActions>
            </Dialog>

        </React.Fragment >
    )
}

export default AssignmentSubmit