import { TableCell, TableRow } from "@mui/material";
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
          <Link to={`/mentors/${item._id}`}>{item.name}</Link>
        </TableCell>
        <TableCell padding="normal" align="left">
          {item.phoneNumber}
        </TableCell>
        <TableCell padding="normal" align="left">
          {item.role}
        </TableCell>
      </TableRow>
    </>
  );
}

export default Staff;
