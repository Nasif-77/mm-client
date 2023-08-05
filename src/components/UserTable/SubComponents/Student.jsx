import { Avatar, Button, Chip, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

function Student({ item, type }) {

    if (item.joiningDate) item.joiningDate = dayjs(item.joiningDate).format('DD MMM YYYY')

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={item.name}
                sx={{ cursor: 'pointer' }}
            >

                <TableCell
                    component="th"
                    scope="row"
                >
                    <Link style={{ textDecoration: 'none' }} to={`/students/${item._id}`}>

                        <Button startIcon={<Avatar
                            src={`${process.env.REACT_APP_SERVER_URL}/uploads/${item?.image}`}
                            variant="circular"
                            sx={{ marginRight: '2%' }}
                        />} variant='text' >
                            {item.name}
                        </Button>
                    </Link>

                </TableCell>
                <TableCell padding='normal' align="left">
                    {item?.status && <Chip label={item.status} color={item.status === 'Active' ? 'success' : item.status === 'Terminated' ? 'error' : 'primary'} />}
                </TableCell>
                <TableCell padding='normal' align="left">{item.grade}</TableCell>
                <TableCell padding='normal' align="left">{item.batch}</TableCell>
                <TableCell padding='normal' align="left">{item.course}</TableCell>
            </TableRow>
        </>
    )
}

export default Student