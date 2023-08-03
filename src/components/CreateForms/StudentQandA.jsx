import { Image } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import styles from "../../styles/userCreateForm.module.scss";
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { QandAschema } from '../../utils/validations/userCreateForm';
import { useSelector } from 'react-redux';
import useCreateForm from '../../hooks/useCreateForm';

function StudentQandA() {

    const user = useSelector(state => state.reducer.userDetails.user)
    const [image, setImage] = useState({});
    const formik = useFormik({
        initialValues: {
            question: '',
            description: '',
            image: '',
            createdBy: user?.userId || ""
        },
        onSubmit: () => {
            sentValues()
        },
        validationSchema: QandAschema
    })

    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = formik

    const [buttonDisable, sentValues] = useCreateForm(false, 'QandA', values)




    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className={styles.box}>
                    <TextField
                        className={styles.TextField}
                        value={values.question}
                        onChange={handleChange}
                        name='question'
                        autoComplete='off'
                        multiline
                        onBlur={handleBlur}
                        label={'Question'}
                        placeholder='Ask anything'
                        error={touched.question && Boolean(errors.question)}
                        helperText={touched.question && errors.question} />

                    <TextField
                        className={styles.TextField}
                        value={values.description}
                        onChange={handleChange}
                        name='description'
                        multiline
                        autoComplete='off'
                        label={'Description'}
                    />
                    <FormControl
                        className={styles.TextField}
                    >
                        <Button
                            variant="contained"
                            color='inherit'
                            component="label"
                            startIcon={<Image />}
                        >
                            Upload Image
                            <input
                                accept=".png, .jpg, .jpeg"
                                type="file"
                                hidden
                                name="image"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        values.image = e.target.files[0];
                                        setImage(e.target.files[0])
                                    }
                                }}
                            />
                        </Button>
                        <FormHelperText>{image?.name}</FormHelperText>
                    </FormControl>

                    <Button type='submit' sx={{ marginLeft: '2%' }} disabled={buttonDisable} variant='contained' >
                        Submit Question
                    </Button>

                </div>
            </form>

        </>
    )
}

export default StudentQandA