import { Box, Button, FormControl, TextField, Typography } from '@mui/material'

import React, { useState } from 'react'
import styles from '../../styles/userCreateForm.module.scss'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { batchSchema } from '../../utils/validations/userCreateForm';
import { useFormik } from 'formik';

import useCreateForm from '../../hooks/useCreateForm';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function BatchForm({ edit, data }) {

    const [batchStarted, setBatchStarted] = useState(edit ? data?.batchStarted : dayjs(Date()).$d.toDateString().slice(4, 15));
    const [batchStarted2, setBatchStarted2] = useState(edit ? dayjs(data?.batchStarted) : '');


    const initialValues = edit ? {
        name: data?.name || "",
        batchStarted: data?.batchStarted || ""
    } : {
        name: "",
        batchStarted: ""
    }

    const batchFormik = useFormik({
        initialValues: initialValues,
        onSubmit: () => {
            sentValues()
        },
        validationSchema: batchSchema
    })

    const { values, handleChange, handleSubmit, handleBlur, touched, errors } = batchFormik

    const [buttonDisable, sentValues] = useCreateForm(edit, 'batches', values, data?._id)


    return (
        <form onSubmit={handleSubmit}>
            <Box className={styles.box}>
                <Typography variant='h6' >{edit ? <>Edit</> : <>Create</>} Batch</Typography>
                <TextField
                    className={styles.TextField}
                    name='name'
                    label={'Batch Name'}
                    placeholder='Batch Name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />

                <FormControl
                    name="batchStarted"
                    error={Boolean(errors.batchStarted && touched.batchStarted)}
                    sx={{ marginTop: "2%", marginBottom: "2%" }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Batch Started Date"
                            format="DD/MM/YYYY"
                            value={batchStarted2}
                            onChange={(newValue) => {
                                setBatchStarted2(newValue);
                                values.batchStarted =
                                    newValue === null
                                        ? batchStarted
                                        : newValue.$d.toString().slice(4, 15);
                                setBatchStarted(
                                    newValue === null
                                        ? batchStarted
                                        : newValue.$d.toString().slice(4, 15)
                                );
                            }}
                            slotProps={{ textField: { variant: "outlined", readOnly: true, error: false } }}
                        />
                    </LocalizationProvider>
                </FormControl>
                <Button type={'submit'} disabled={buttonDisable}>Submit</Button>

            </Box>
            <ToastContainer />
        </form >
    )
}

export default BatchForm