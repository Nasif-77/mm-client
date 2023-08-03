import { Box, Button, TextField, Typography } from '@mui/material'

import React from 'react'
import styles from '../../styles/userCreateForm.module.scss'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { courseSchema } from '../../utils/validations/userCreateForm';
import { useFormik } from 'formik';

import useCreateForm from '../../hooks/useCreateForm';



function CourseForm({ edit, data }) { 


    const initialValues = edit ? {
        name: data?.name,
        description: data?.description,
        duration:data?.duration
    } : {
        name: "",
        description: "",
        duration:""
    }

    const courseFormik = useFormik({
        initialValues: initialValues,
        onSubmit: () => {
            sentValues()
        },
        validationSchema: courseSchema
    })

    const { values, handleChange, handleSubmit, handleBlur, touched, errors } = courseFormik

    const [buttonDisable, sentValues] = useCreateForm(edit, 'courses', values, data?._id)




    return (
        <form onSubmit={handleSubmit}>
            <Box className={styles.box}>
                <Typography variant='h6' >{edit ? <>Edit</> : <>Create</>} Course</Typography>
                <TextField
                    className={styles.TextField}
                    name='name'
                    label={'Course Title'}
                    placeholder='Title'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />

                < TextField
                    className={styles.TextField}
                    name='duration'
                    type='number'
                    label={"Duration"}
                    placeholder='Week'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                    error={touched.duration && Boolean(errors.duration)}
                    helperText={touched.duration && errors.duration}
                />

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

                <Button type={'submit'} disabled={buttonDisable}>Submit</Button>

            </Box>
            <ToastContainer />
        </form >
    )
}

export default CourseForm