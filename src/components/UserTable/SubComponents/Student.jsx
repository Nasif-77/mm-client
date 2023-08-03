import { TableCell, TableRow } from '@mui/material'
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
                    <Link to={`/${type}/${item._id}`}>
                        {item.name}
                    </Link>

                </TableCell>
                <TableCell padding='normal' align="left">{item.status}</TableCell>
                <TableCell padding='normal' align="left">{item.grade}</TableCell>
                <TableCell padding='normal' align="left">{item.batch}</TableCell>
                <TableCell padding='normal' align="left">{item.course}</TableCell>
            </TableRow>
        </>
    )
}

export default Student