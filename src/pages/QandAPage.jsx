import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreateFormDrawer from './CreateFormDrawer'
import { ToastContainer } from 'react-toastify'
import ListingQuestions from '../components/QandA/ListingQuestions'
import axios from 'axios'
import { isAuth } from '../utils/isAuth'
import { Box } from '@mui/material'

function QandAPage() {

  const userRole = useSelector(state => state.reducer.userDetails.user.role)
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    let isMounted = true
    const token = isAuth()
    const getQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/questions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (isMounted) setQuestions(response.data.data)

      } catch (error) {

      }
    }

    getQuestions()
    return () => {
      isMounted = false
    }

  }, [])


  return (
    <div style={{ width: '100%', height: '100%' }}>

      <Box width={'100%'} display={'flex'} padding={'1%'} justifyContent={'flex-end'} >
      {userRole === 'students' && <CreateFormDrawer type={'QandA'} add={true} />}
    </Box>

      {
    questions ? <ListingQuestions questions={questions} />
      : <>Loading....</>
  }

  <ToastContainer />
    </div >
  )
}

export default QandAPage