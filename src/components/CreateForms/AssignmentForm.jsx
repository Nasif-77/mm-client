import { Box, Button, FormControl, FormHelperText, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { assignmentSchema } from '../../utils/validations/userCreateForm'
import styles from "../../styles/userCreateForm.module.scss";
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useCreateForm from '../../hooks/useCreateForm';
import { useSelector } from 'react-redux';
import { Assignment } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';



function AssignmentForm({ edit, data }) {

    const [dueDate, setDueDate] = useState(edit ? data?.dueDate : dayjs(Date()).$d.toDateString().slice(4, 15));
    const [dueDate2, setDueDate2] = useState(edit ? dayjs(data?.dueDate) : '');
    const [createdDate, setcreatedDate] = useState(edit ? data?.createdDate : dayjs(Date()).$d.toDateString().slice(4, 15));
    const [createdDate2, setcreatedDate2] = useState(edit ? dayjs(data?.createdDate) : '');
    const [assignment, setAssignment] = useState({});

    let user = useSelector(state => state.reducer.userDetails.user)


    const initialValues = edit ? {
        name: data?.name || "",
        createdBy: user?.userId || user?.role,
        dueDate: data?.dueDate || "",
        assignment: "",
        description: data?.description || "",
        createdDate: data?.createdDate || dayjs(Date()).$d.toDateString().slice(4, 15)
    } : {
        name: "",
        createdBy: user?.userId || user?.role,
        dueDate: "",
        assignment: "",
        description: "",
        createdDate: dayjs(Date()).$d.toDateString().slice(4, 15)
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: () => {
            sentValues()
        },
        validationSchema: assignmentSchema
    })

    const { values, handleBlur, handleChange, errors, touched, handleSubmit } = formik

    const [buttonDisable, sentValues] = useCreateForm(edit, 'assignments', values, data?._id)


    return (
        <React.Fragment>

            <form onSubmit={handleSubmit}>

                <Box className={styles.box}>
                    <TextField
                        className={styles.TextField}
                        name='name'
                        label={'Assignment Name'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />

                    <FormControl
                        name="dueDate"
                        error={Boolean(errors.dueDate && touched.dueDate)}
                        sx={{ marginTop: "2%", marginBottom: "2%" }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Due Date"
                                format="DD/MM/YYYY"
                                value={dueDate2}
                                required={true}
                                onChange={(newValue) => {
                                    setDueDate2(newValue);
                                    values.dueDate = newValue === null ? dueDate : newValue.$d.toString().slice(4, 15);
                                    setDueDate(
                                        newValue === null
                                            ? dueDate
                                            : newValue.$d.toString().slice(4, 15)
                                    );
                                    formik.setErrors({
                                        ...errors,
                                        dueDate: false
                                    })
                                }}
                                slotProps={{ textField: { variant: "outlined", readOnly: true, error: (errors.dueDate && touched.dueDate) ? true : false } }}
                            />
                        </LocalizationProvider>
                        <FormHelperText>{touched.dueDate && errors.dueDate}</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<Assignment />}
                        >
                            {edit ? "Replace" : "Upload"} File
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
                        <FormHelperText>{assignment?.name}</FormHelperText>
                    </FormControl>

                    < TextField
                        className={styles.TextField}
                        name='description'
                        label={"Description"}
                        placeholder='Description'
                        multiline
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                    />

                    {edit &&
                        <FormControl
                            name="createdDate"
                            error={Boolean(errors.createdDate && touched.createdDate)}
                            sx={{ marginTop: "2%", marginBottom: "2%" }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Created Date"
                                    format="DD/MM/YYYY"
                                    value={createdDate2}
                                    required={true}
                                    onChange={(newValue) => {
                                        setcreatedDate2(newValue);
                                        values.createdDate = newValue === null ? createdDate : newValue.$d.toString().slice(4, 15);
                                        setcreatedDate(
                                            newValue === null
                                                ? createdDate
                                                : newValue.$d.toString().slice(4, 15)
                                        );
                                        formik.setErrors({
                                            ...errors,
                                            createdDate: false
                                        })
                                    }}
                                    slotProps={{ textField: { variant: "outlined", readOnly: true, error: (errors.createdDate && touched.createdDate) ? true : false } }}
                                />
                            </LocalizationProvider>
                            <FormHelperText>{touched.createdDate && errors.createdDate}</FormHelperText>
                        </FormControl>
                    }

                    <Button type={"submit"} disabled={buttonDisable}>Submit</Button>

                </Box>

            </form>

            <ToastContainer />

        </React.Fragment>
    )
}

export default AssignmentForm