import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../styles/Questions.module.scss'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { isAuth } from '../../utils/isAuth'
import { ToastContainer, toast } from 'react-toastify'

function ListingQuestions({ questions }) {

    const navigate = useNavigate()
    const userId = useSelector(state => state.reducer.userDetails.user.userId)
    const [open, setOpen] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)
    const [question, setQuestion] = useState(null)


    const handleOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const deleteQuestion = async (id) => {
        const token = isAuth()
        try {
            setButtonDisable(true)
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/admin/questions/${question?._id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setOpen(false)
                toast.success("Question deleted succesfully")
            }
        } catch (error) {
            setButtonDisable(false)
            toast.error(error.response.data.message || "Error!!")

        }
    }


    return (
        <div className={styles.container}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell
                            align={'left'}
                            padding={'normal'}
                        >
                            Question
                        </TableCell>
                        <TableCell
                            align={'left'}
                            padding={'normal'}
                        >
                            Created by
                        </TableCell>
                        <TableCell
                            align={'left'}
                            padding={'normal'}
                        >
                            Created Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map(question => {
                        question.createdAt = dayjs(question.createdAt).format('DD MMM YYYY')
                        console.log(question.createdBy._id === userId)
                        return (
                            <TableRow key={question._id} className={styles.ListItem}>
                                <TableCell  >
                                    <Button onClick={() => navigate(`${question._id}`)}>
                                        {question.question?.slice(0, 20)}.....
                                    </Button>
                                    {question.createdBy._id === userId && <Button onClick={() => { handleOpen(); setQuestion(question) }} variant='contained' color='error'>
                                        Delete question
                                    </Button>}
                                </TableCell>
                                <TableCell >
                                    {question.createdBy.name}
                                </TableCell>
                                <TableCell >
                                    {question.createdAt}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure to delete this course?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Question : <strong>{question?.question}</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={deleteQuestion} disabled={buttonDisable} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />

        </div>
    )
}

export default ListingQuestions