import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

function Batch({ item, type }) {

    if (item.batchStarted) item.batchStarted = dayjs(item.batchStarted).format('DD MMM YYYY')

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
                    {item.students?.length}
                </TableCell>
                <TableCell padding="normal" align="left">
                    {item.batchStarted}
                </TableCell>
            </TableRow>
        </>
    )
}

export default Batch