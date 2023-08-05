import React from 'react'
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'



function EnhancedTableHead({ order, orderBy, onRequestSort, type }) {

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    align={'left'}
                    padding={'normal'}
                    sortDirection={orderBy === 'name' ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={createSortHandler('name')}
                    >
                        Name
                        {orderBy === 'name' ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>


                {type === 'inquiries' || type === 'students' || type === 'staffs' ?
                    <TableCell
                        align={'left'}
                        padding={'normal'}
                        sortDirection={orderBy === 'status' ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === 'status'}
                            direction={orderBy === 'status' ? order : 'asc'}
                            onClick={createSortHandler('status')}
                        >
                            Status
                            {orderBy === 'status' ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                    : ''}


                {type === 'courses' ?
                    <>
                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'duration' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'duration'}
                                direction={orderBy === 'duration' ? order : 'asc'}
                                onClick={createSortHandler('duration')}
                            >
                                Duration
                                {orderBy === 'duration' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>

                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'description' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'description'}
                                direction={orderBy === 'description' ? order : 'asc'}
                                onClick={createSortHandler('description')}
                            >
                                Description
                                {orderBy === 'description' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    </>
                    : ''}


                {type === 'batches' ?
                    <>
                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'students' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'students'}
                                direction={orderBy === 'students' ? order : 'asc'}
                                onClick={createSortHandler('students')}
                            >
                                No of Students
                                {orderBy === 'students' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>

                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'batchStarted' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'batchStarted'}
                                direction={orderBy === 'batchStarted' ? order : 'asc'}
                                onClick={createSortHandler('batchStarted')}
                            >
                                Started Date
                                {orderBy === 'batchStarted' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    </>
                    : ''}


                {type === 'staffs' ?
                    <>
                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'phone' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'phone'}
                                direction={orderBy === 'phone' ? order : 'asc'}
                                onClick={createSortHandler('phone')}
                            >
                                Phone
                                {orderBy === 'phone' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>

                        {/* <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'role' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'role'}
                                direction={orderBy === 'role' ? order : 'asc'}
                                onClick={createSortHandler('role')}
                            >
                                Role
                                {orderBy === 'role' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell> */}
                    </>
                    : ''}


                {type === 'inquiries' ?
                    <>
                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'possibility' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'possibility'}
                                direction={orderBy === 'possibility' ? order : 'asc'}
                                onClick={createSortHandler('possibility')}
                            >
                                Possibility
                                {orderBy === 'possibility' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>


                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'nextFollowUp' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'nextFollowUp'}
                                direction={orderBy === 'nextFollowUp' ? order : 'asc'}
                                onClick={createSortHandler('nextFollowUp')}
                            >
                                Next Follow Up
                                {orderBy === 'nextFollowUp' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>

                    </>
                    : ''}


                {type === 'students' ?
                    <>
                        <TableCell
                            align={'left'}
                            padding={'none'}
                            sortDirection={orderBy === 'grade' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'grade'}
                                direction={orderBy === 'grade' ? order : 'asc'}
                                onClick={createSortHandler('grade')}
                            >
                                Current Grade
                                {orderBy === 'grade' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>

                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'batch' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'batch'}
                                direction={orderBy === 'batch' ? order : 'asc'}
                                onClick={createSortHandler('batch')}
                            >
                                Batch
                                {orderBy === 'batch' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>


                        <TableCell
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === 'course' ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === 'course'}
                                direction={orderBy === 'course' ? order : 'asc'}
                                onClick={createSortHandler('course')}
                            >
                                Course
                                {orderBy === 'course' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    </>
                    : ''}

                {type === 'assignments' &&
                    <TableCell
                        align={'left'}
                        padding={'normal'}
                        sortDirection={orderBy === 'createdDate' ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === 'createdDate'}
                            direction={orderBy === 'createdDate' ? order : 'asc'}
                            onClick={createSortHandler('createdDate')}
                        >
                            created At
                            {orderBy === 'createdDate' ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                }

            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead