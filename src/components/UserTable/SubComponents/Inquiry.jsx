import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

function Inquiry({ item, type }) {

    if (item.createdOn) item.createdOn = dayjs(item.createdOn).format('DD MMM YYYY')
    if (item.nextFollowUp) item.nextFollowUp = dayjs(item.nextFollowUp).format('DD MMM YYYY')

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
                    {item.status}
                </TableCell>
                <TableCell padding="normal" align="left">
                    {item.possibility}
                </TableCell>
                <TableCell padding="normal" align="left">
                    {item.nextFollowUp}
                </TableCell>
            </TableRow>
        </>
    )
}

export default Inquiry