import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'

function SubmissionDetails({ details }) {

  details.submittedDate = dayjs(details.submittedDate).format('DD MMM YYYY')

  return (

    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-evenly'}
      width={'100%'}
      height={'80%'}
    >

      <Box display={'flex'} >

        <Typography>
          Name:
        </Typography>

        <Typography paddingLeft={'1%'} color={'black'} fontWeight={'bold'}>
          {`${details?.studentId?.name}`}
        </Typography>

      </Box>

      <Box display={'flex'} >

        <Typography>
          Submitted Date:
        </Typography>

        <Typography paddingLeft={'1%'} color={'black'} fontWeight={'bold'}>
          {`${details?.submittedDate}`}

        </Typography>
      </Box>

      <Box display={'flex'} >

        <Typography>
          Submitted File:
        </Typography>

        <Box paddingLeft={'5%'}>
          <Link download target="blank" to={`${process.env.REACT_APP_SERVER_URL}/uploads/${details?.assignment}`}>
            <Button variant="outlined" sx={{ textDecoration: 'none' }}>
              Show file
            </Button>
          </Link>
        </Box>

      </Box>

      <Box display={'flex'} >

        <Typography>
          Feedback:
        </Typography>

        <Typography paddingLeft={'1%'} color={details?.feedback ? 'black' : 'red'} fontWeight={'bold'}>
          {`${details?.feedback ? details.feedback : "Not evaluated !"}`}

        </Typography>
      </Box>

      <Box display={'flex'} >

        <Typography>
          Grade:
        </Typography>

        <Typography paddingLeft={'1%'} color={details.grade ? 'black' : 'red'} fontWeight={'bold'}>
          {`${details?.grade ? details.grade : "Not evaluated !"}`}

        </Typography>
      </Box>

    </Box>
  )
}

export default SubmissionDetails