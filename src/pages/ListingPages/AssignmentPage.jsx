import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { isAuth } from '../../utils/isAuth'
import { Box, Typography } from '@mui/material'
import UserTable from '../../components/UserTable/UserTable'

function AssignmentPage() {
    const [assignments, setAssignments] = useState(null)

    useEffect(() => {
        let isMounted = true
        const token = isAuth()
        const getAssignments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/assignments`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (isMounted) setAssignments(response.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        getAssignments()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <>

            <Box
                display={'flex'}
            >
                {assignments ?
                    <UserTable userData={assignments} type={'assignments'} /> : <Typography>Loading...</Typography>
                }

            </Box>
        </>
    )
}

export default AssignmentPage