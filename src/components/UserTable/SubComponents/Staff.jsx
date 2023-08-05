import { Avatar, Button, Chip, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Staff({ item, type }) {

  if (item.joiningDate) item.joiningDate = dayjs(item.joiningDate).format('DD MMM YYYY')
  if (item.resignationDate) item.resignationDate = dayjs(item.resignationDate).format('DD MMM YYYY')

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
          <Link style={{ textDecoration: 'none' }} to={`/mentors/${item._id}`}>

            <Button
              variant='text'
              startIcon={<Avatar src={`${process.env.REACT_APP_SERVER_URL}/uploads/${item?.image}`}
                variant="circular"
                sx={{ marginRight: '2%' }}
              />}
            >
              {item.name}
            </Button>
          </Link>

        </TableCell>
        <TableCell padding='normal' align="left">
          {item?.status && <Chip label={item.status} color={item.status === 'Active' ? 'success' : item.status === 'Terminated' ? 'error' : 'primary'} />}
        </TableCell>
        <TableCell padding="normal" align="left">
          {item.phoneNumber}
        </TableCell>
        <TableCell padding="normal" align="left">
          {item.role}
        </TableCell>
      </TableRow >
    </>
  );
}

export default Staff;
