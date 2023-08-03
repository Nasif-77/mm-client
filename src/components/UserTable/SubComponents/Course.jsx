import { TableCell, TableRow } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';


function Course({ item, type }) {
    
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
                    <Link to={`/${type}/${item._id}`}>{item.name}</Link>
                </TableCell>
                <TableCell padding="normal" align="left">
                    {item.duration} week
                </TableCell>
                <TableCell padding="normal" align="left">
                    {item.description}
                </TableCell>
            </TableRow>
        </>
    )
}

export default Course