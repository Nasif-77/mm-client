import { Button, TableCell, TableRow } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'

function Assignment({ item, type }) {
    item.createdDate = dayjs(item.createdDate).format('DD MMM YYYY')

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={item.name}
                sx={{ cursor: "pointer" }}
            >
                <TableCell
                    component="th"
                    scope="row"
                >
                    <Link to={`/${type}/${item._id}`}>
                        <Button variant='contained'>
                            {item.name}
                        </Button>
                    </Link>

                </TableCell>

                <TableCell padding="normal" align="left">
                    {item.createdDate}
                </TableCell>
            </TableRow>
        </>
    )
}

export default Assignment