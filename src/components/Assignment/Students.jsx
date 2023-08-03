import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel, List, ListItem, ListItemButton, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { assignmentSubmitSchema } from '../../utils/validations/userCreateForm'
import axios from 'axios'
import { isAuth } from "../../utils/isAuth";
import { toast } from 'react-toastify'


function Students({ students, setFetch, role }) {

    const [dialog, setDialog] = useState(false)
    const [edit, setEdit] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)
    const [student, setStudent] = useState({})
    const { id } = useParams()


    const handleDialogOpen = () => {
        setDialog(true);
    };

    const handleDialogClose = () => {
        setDialog(false);
    };

    const formik = useFormik({
        initialValues: {
            feedback: "",
            grade: "",
            submittedId: ""
        },
        onSubmit: () => {
            sendValues()
        },
        validationSchema: assignmentSubmitSchema
    })
    const { values, handleChange, handleSubmit } = formik

    const sendValues = async () => {
        const token = isAuth()

        setButtonDisable(true)
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/assignments/students/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                toast.success("Edited the fields succesfully")
                setDialog(false)
                setButtonDisable(false)
                setEdit(false)
                setFetch(true)

            }
        } catch (error) {
            setButtonDisable(false)
        }
    }


    return (

        <React.Fragment>

            <Typography textAlign={'center'} fontFamily={'monospace'} fontWeight={'bold'} variant='h4'>
                Submitted Students
            </Typography>
            <Typography variant='h6'>
                <u>Name and submitted date</u>
            </Typography>
            <List>
                {students?.submittedStudents.map(student => {
                    student.submittedDate = dayjs(student.submittedDate).format('DD MMM YYYY')

                    return (
                        <ListItem key={student._id} onClick={() => {
                            values.feedback = student.feedback || ""
                            values.grade = student.grade || ""
                            values.submittedId = student._id || ""
                            setStudent(student);
                            handleDialogOpen()
                        }}>
                            <ListItemButton sx={{ borderBottom: '1px solid black', borderTop: '1px solid black' }} >
                                <Box width='60%' display={'flex'} justifyContent={'space-between'}>
                                    <Typography fontWeight={'bold'}>
                                        {student?.studentId?.name}
                                    </Typography>
                                    <Typography>
                                        {student.submittedDate}
                                    </Typography>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    )
                })}

            </List>

            <Dialog
                sx={{ padding: '5%' }}
                open={dialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Submition Details
                </DialogTitle>
                <DialogContent>
                    <DialogContentText width={'20em'} id="alert-dialog-description">

                        <Box width={'100%'} display={'flex'} >
                            Name:
                            <Typography padding={'1%'} color={'black'} fontWeight={'bold'}>
                                {`${student?.studentId?.name}`}
                            </Typography>
                        </Box>

                        <Box display={'flex'} >
                            Submitted Date:
                            <Typography padding={'1%'} color={'black'} fontWeight={'bold'}>
                                {`${student?.submittedDate}`}
                            </Typography>
                        </Box>

                        <Box display={'flex'} >
                            Assignment:

                            <Box paddingLeft={'5%'}>
                                <Link download target="blank" to={`${process.env.REACT_APP_SERVER_URL}/uploads/${student.assignment}`} key={student._id}>
                                    <Button variant="outlined" sx={{ textDecoration: 'none' }}>
                                        Show file
                                    </Button>
                                </Link>
                            </Box>
                        </Box>


                    </DialogContentText>
                </DialogContent>
                <DialogActions >

                    <Box minHeight={'15rem'} display={'flex'} width={'100%'} flexDirection={'column'} justifyContent={'space-evenly'}>
                        {role === 'staffs' && <FormControlLabel control={<Switch checked={edit} onChange={() => setEdit(prev => !prev)} />} label="Edit" />}

                        <TextField
                            label={'Feedback'}
                            multiline
                            fullWidth
                            value={values.feedback}
                            onChange={handleChange}
                            name='feedback'
                            inputProps={{
                                readOnly: !edit
                            }}
                        />
                        <FormControl
                        >
                            <InputLabel>Grade</InputLabel>
                            <Select
                                name="grade"
                                label="Grade"
                                value={values.grade}
                                onChange={handleChange}
                                readOnly={!edit}
                            >
                                <MenuItem value={""}>None</MenuItem>
                                <MenuItem value={"Excellent"}>Excellent</MenuItem>
                                <MenuItem value={"Good"}>Good</MenuItem>
                                <MenuItem value={"Average"}>Average</MenuItem>
                                <MenuItem value={"Below Average"}>Below Average</MenuItem>
                                <MenuItem value={"Needs Improvement"}>Needs Improvement</MenuItem>
                            </Select>

                        </FormControl>

                        {edit && <Button onClick={handleSubmit} disabled={buttonDisable}>
                            Submit
                        </Button>}

                    </Box>

                </DialogActions>
            </Dialog>


        </React.Fragment>
    )
}

export default Students