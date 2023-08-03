import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isAuth } from '../../utils/isAuth'
import { useParams } from 'react-router-dom'
import styles from '../../styles/Questions.module.scss'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'


function QuestionDetails() {
    const { id } = useParams()
    const user = useSelector(state => state.reducer.userDetails.user)
    const [details, setDetails] = useState(null)
    const [answer, setAnswer] = useState({ answer: '', staffId: user.userId, submittedDate: Date.now() })
    const [answers, setAnswers] = useState(null)

    useEffect(() => {
        const token = isAuth()
        let isMounted = true

        const getQuestion = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/questions/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (isMounted) setDetails(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getAnswers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/questions/answers/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })



                if (isMounted) setAnswers(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        getQuestion()
        getAnswers()

        return () => {
            isMounted = false
        }

    }, [id])

    const addAnswer = async () => {
        try {
            const token = isAuth()

            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/questions/${id}`, { ...answer }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setAnswer({ ...answer, answer: '' })
                toast.success("Answer added succesfully")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            {details ? <>
                <Box>
                    <Typography>
                        <u>Question</u>
                    </Typography>
                    <Typography>
                        {details.question}
                    </Typography>
                    <br />

                    <Typography>
                        <u>Description </u>
                    </Typography>
                    <Typography>
                        {details.description ? details.description : 'No description'}
                    </Typography>
                    <br />

                    <Typography>
                        <u>Image</u>
                    </Typography>
                    <Typography>
                        {details.image ? <img width={'80%'} alt={`${details.question}`} src={`${process.env.REACT_APP_SERVER_URL}/uploads/${details.image}`} /> : "No image given"}
                    </Typography>
                    <br />
                </Box>

                {user?.role === 'staffs' && <Box display={'flex'} justifyContent={'space-between'}>
                    <TextField
                        onChange={(e) => setAnswer({ ...answer, answer: e.target.value })}
                        autoComplete='off'
                        value={answer.answer}
                        sx={{ width: '85%' }}
                    />
                    <Button variant='contained' onClick={() => {
                        answer.answer !== '' ? addAnswer() : toast.error("Please provide an answer")
                    }}>Add answer</Button>
                </Box>}
            </>
                : "Loading..."}

            {answers && <Box>
                <Typography variant='h4' style={{ marginTop: '20px' }}>
                    Answers
                </Typography>
                {answers?.answers?.map(answer => {
                    return (
                        <Box bgcolor={'white'} padding={'1%'} margin={'1%'}>
                            <Typography bgcolor={'black'} color={'white'} >{answer.staffId.name}</Typography>
                            <Typography>Answer: {answer.answer}</Typography>
                        </Box>
                    )
                })}
            </Box>}

            <ToastContainer />
        </div>
    )
}

export default QuestionDetails