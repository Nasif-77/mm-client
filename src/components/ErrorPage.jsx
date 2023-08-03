import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <Box height={'100vh'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} >

            <Typography style={{textDecoration:'none'}} variant='h2'>
                <Link to={'/'} t>
                    Please return to Home Page
                </Link>
            </Typography>
        </Box>
    )
}

export default ErrorPage