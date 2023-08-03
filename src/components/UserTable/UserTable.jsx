/*
This component is used to list the staffs/inquiries/students/courses.
The table provides options to sort the items in ascending or desending and we can also search items using its name.
For student/staff the table provides the option to filter items. Staffs can be filtered using roles and students can be filtered using course
and batch.

USAGE
----------
staff
------
<UserTable userData={userData} type{'staff'} filterProps={['role']}/>

student
------
<UserTable userData={userData} type{'student'} filterProps={['batch','course']}/>

inquiry
------
<UserTable userData={userData} type{'inquiry'} />

course
------
<UserTable userData={userData} type{'course'} />

userData is the array of objects and type is type of the userlist.
FilterProps is the array of properties that we want to filter, in the case of inquiry and course there is no need of using filterProps

*/


import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useReducer } from 'react'
import styles from '../../styles/userTable.module.scss'
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import Staff from './SubComponents/Staff';
import Student from './SubComponents/Student';
import EnhancedTableHead from './SubComponents/EnhancedTableHead'
import CreateFormDrawer from '../../pages/CreateFormDrawer';
import Inquiry from './SubComponents/Inquiry';
import dayjs from 'dayjs';
import Course from './SubComponents/Course';
import Batch from './SubComponents/Batch';
import Assignment from './SubComponents/Assignment';
import { useSelector } from 'react-redux';




function descendingComparator(a, b, orderBy) {
  if (orderBy === 'nextFollowUp') {
    const dateA = dayjs(a[orderBy]);
    const dateB = dayjs(b[orderBy]);
    const today = dayjs();

    const differenceA = Math.abs(today.diff(dateA, 'day'));
    const differenceB = Math.abs(today.diff(dateB, 'day'));

    // Check if the dates are in the past
    const isAPastDate = dateA.isBefore(today, 'day');
    const isBPastDate = dateB.isBefore(today, 'day');

    // If both are past dates or both are not past dates, sort based on the differences
    if ((isAPastDate && isBPastDate) || (!isAPastDate && !isBPastDate)) {
      return differenceA - differenceB;
    }

    // If one is a past date and the other is not, prioritize the non-past date
    return isAPastDate ? 1 : -1;
  }
  else if (orderBy === 'batchStarted' || orderBy === 'createdDate') {
    const dateA = dayjs(a[orderBy])
    const dateB = dayjs(b[orderBy])

    if (dateB.isBefore(dateA)) {
      return -1;
    }
    if (dateB.isAfter(dateA)) {
      return 1;
    }

  }
  else if (orderBy === 'students') {
    if (b[orderBy].length < a[orderBy].length) {
      return -1;
    }
    if (b[orderBy].length > a[orderBy].length) {
      return 1;
    }
  }
  else {

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


function UserTable({ userData, type, filterProps }) {

  const userRole = useSelector(state => state.reducer.userDetails.user.role)

  const orderby = type === 'inquiries' ? 'nextFollowUp' : 'name'

  const initialState = {
    order: type === 'inquiries' ? "desc" : "asc ",
    orderBy: orderby,
    page: 0,
    dense: false,
    rowsPerPage: 15,
    userName: "",
    roles: [],
    batches: [],
    courses: [],
    possibilities: [],
    mentors: [],
    statuses: [],
    status: type === "staffs" ? "Active" : type === 'inquiries' ? "Open" : "",
    mentor: "",
    grade: "",
    grades: [],
    role: "",
    batch: "",
    course: "",
    possibility: '',
    data: userData
  };


  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_ORDER":
        return { ...state, order: action.payload };
      case "SET_ORDER_BY":
        return { ...state, orderBy: action.payload };
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "SET_DENSE":
        return { ...state, dense: action.payload };
      case "SET_ROWS_PER_PAGE":
        return { ...state, rowsPerPage: action.payload };
      case "SET_DATA":
        return { ...state, data: action.payload };
      case "SET_USER_NAME":
        return { ...state, userName: action.payload };
      case "SET_ROLES":
        return { ...state, roles: action.payload };
      case "SET_BATCHES":
        return { ...state, batches: action.payload };
      case "SET_COURSES":
        return { ...state, courses: action.payload };
      case 'SET_POSSIBILITIES':
        return { ...state, possibilities: action.payload };
      case "SET_ROLE":
        return { ...state, role: action.payload };
      case "SET_BATCH":
        return { ...state, batch: action.payload };
      case "SET_COURSE":
        return { ...state, course: action.payload };
      case 'SET_POSSIBILITY':
        return { ...state, possibility: action.payload };
      case "SET_MENTOR":
        return { ...state, mentor: action.payload };
      case "SET_MENTORS":
        return { ...state, mentors: action.payload };
      case "SET_STATUS":
        return { ...state, status: action.payload };
      case "SET_STATUSES":
        return { ...state, statuses: action.payload };
      case "SET_GRADE":
        return { ...state, grade: action.payload };
      case "SET_GRADES":
        return { ...state, grades: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    userName,
    role,
    batch,
    course,
    batches,
    courses,
    roles, possibility, possibilities,
    order,
    orderBy,
    page,
    dense,
    rowsPerPage,
    status,
    statuses,
    mentor,
    mentors,
    grade,
    grades,
    data
  } = state;


  useEffect(() => {
    const getFilters = () => {

      //Roles
      let rolesArray = userData.map((item) => {
        return item.role;
      });
      rolesArray = rolesArray.filter((item, index) => {
        if (rolesArray.indexOf(item) === index) return item;
        else return "";
      });

      //Batches
      let batchesArray = userData.map((item) => {
        return item.batch;
      });
      batchesArray = batchesArray.filter((item, index) => {
        if (batchesArray.indexOf(item) === index) return item;
        else return "";
      });

      //Courses
      let coursesArray = userData.map((item) => {
        return item.course;
      });
      coursesArray = coursesArray.filter((item, index) => {
        if (coursesArray.indexOf(item) === index) return item;
        else return "";
      });

      //Possibility
      let possibilityArray = userData.map(item => {
        return item.possibility
      })
      possibilityArray = possibilityArray.filter((item, index) => {
        if (possibilityArray.indexOf(item) === index) return item
        else return ''
      })

      //Mentor
      let mentoresArray = userData.map((item) => {
        return item.mentor;
      });
      mentoresArray = mentoresArray.filter((item, index) => {
        if (mentoresArray.indexOf(item) === index) return item;
        else return "";
      });

      //Grade
      let gradesArray = userData.map((item) => {
        return item.grade;
      });
      gradesArray = gradesArray.filter((item, index) => {
        if (gradesArray.indexOf(item) === index) return item;
        else return "";
      });

      //Status
      let statusesArray = userData.map((item) => {
        return item.status;
      });
      statusesArray = statusesArray.filter((item, index) => {
        if (statusesArray.indexOf(item) === index) return item;
        else return "";
      });

      dispatch({ type: "SET_BATCHES", payload: batchesArray });
      dispatch({ type: "SET_COURSES", payload: coursesArray });
      dispatch({ type: "SET_ROLES", payload: rolesArray });
      dispatch({ type: "SET_MENTORS", payload: mentoresArray });
      dispatch({ type: "SET_GRADES", payload: gradesArray });
      dispatch({ type: "SET_POSSIBILITIES", payload: possibilityArray })
      dispatch({ type: "SET_STATUSES", payload: statusesArray })
    };
    getFilters();
  }, [userData, filterProps]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch({ type: "SET_ORDER", payload: isAsc ? "desc" : "asc" });
    dispatch({ type: "SET_ORDER_BY", payload: property });
  };

  const handleChangePage = (event, newPage) => {
    dispatch({ type: "SET_PAGE", payload: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch({
      type: "SET_ROWS_PER_PAGE",
      payload: parseInt(event.target.value, 10),
    });
    dispatch({ type: "SET_PAGE", payload: 0 });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  const handleSelectRole = (e) => {
    dispatch({ type: "SET_ROLE", payload: e.target.value });
  };

  const handleSelectBatch = (e) => {
    dispatch({ type: "SET_BATCH", payload: e.target.value });
  };

  const handleSelectCourse = (e) => {
    dispatch({ type: 'SET_COURSE', payload: e.target.value })
  }

  const handleSelectPossiblity = (e) => {
    dispatch({ type: 'SET_POSSIBILITY', payload: e.target.value })
  }


  const searchUser = (e) => {
    const name = e.target.value.toLowerCase();
    dispatch({ type: "SET_USER_NAME", payload: name });
  };


  const handleSelectMentor = (e) => {
    dispatch({ type: "SET_MENTOR", payload: e.target.value });
  };

  const handleSelectGrade = (e) => {
    dispatch({ type: "SET_GRADE", payload: e.target.value });
  };

  const handleSelectStatus = (e) => {
    dispatch({ type: "SET_STATUS", payload: e.target.value });
  };

  const clearFilters = () => {
    dispatch({ type: "SET_BATCH", payload: "" });
    dispatch({ type: "SET_ROLE", payload: "" });
    dispatch({ type: "SET_USER_NAME", payload: "" });
    dispatch({ type: "SET_COURSE", payload: "" });
    dispatch({ type: "SET_MENTOR", payload: "" });
    dispatch({ type: "SET_GRADE", payload: "" });
    dispatch({ type: 'SET_POSSIBILITY', payload: '' })
    dispatch({ type: 'SET_STATUS', payload: '' })
    dispatch({ type: 'SET_DATA', payload: userData })
  }

  const filteredData = useMemo(() => {
    return userData.filter((item) => {
      const isBatchMatched = batch === "" || batch === item.batch;
      const isCourseMatched = course === "" || course === item.course;
      const isUserNameMatched = userName === "" || item.name.toLowerCase().includes(userName);
      const isMentorMatched = mentor === "" || mentor === item.mentor;
      const isRoleMatched = role === "" || role === item.role;
      const isPossibilityMatched = possibility === "" || possibility === item.possibility;
      const isGradeMatched = grade === "" || grade === item.grade;
      const isStatusMatched = status === "" || status === item.status;

      return isBatchMatched && isCourseMatched && isUserNameMatched && isMentorMatched && isGradeMatched && isRoleMatched && isPossibilityMatched && isStatusMatched;
    });
  }, [batch, course, userName, mentor, role, possibility, grade, status, userData])

  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: filteredData });
  }, [filteredData]);

  return (
    <Paper elevation={4} className={styles.paper}>

      {filterProps ? <>
        <Typography variant={'h6'}>Search Filters</Typography>
        <Box
          className={styles.box1}
          display={'flex'}
          padding={'1%'}
          justifyContent={'space-evenly'}
          alignItems={'center'}
        >

          {filterProps.map((item) => {
            return (
              <FormControl key={item} className={styles.formControl}>
                <InputLabel>Select {item}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Role"
                  value={item === 'batch' ? batch : item === 'course' ? course : item === "mentor"
                    ? mentor : item === "grade" ? grade : item === 'role'
                      ? role : item === 'possibility' ? possibility : status}
                  onChange={
                    item === 'batch' ? handleSelectBatch : item === 'course' ? handleSelectCourse : item === "mentor"
                      ? handleSelectMentor
                      : item === "grade"
                        ? handleSelectGrade
                        : item === 'role' ? handleSelectRole :
                          item === 'possibility' ? handleSelectPossiblity : handleSelectStatus
                  }
                >
                  <MenuItem value={''}>None</MenuItem>
                  {item === 'batch' ? batches.map((item, index) => {
                    return (
                      <MenuItem value={item} key={index}>{item}</MenuItem>
                    )
                  }) : item === 'course' ? courses.map((item, index) => {
                    return (
                      <MenuItem value={item} key={index}>{item}</MenuItem>
                    )
                  }) : item === "mentor"
                    ? mentors.map((item, index) => {
                      return (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      );
                    })
                    : item === "grade"
                      ? grades.map((item, index) => {
                        return (
                          <MenuItem value={item} key={index}>
                            {item}
                          </MenuItem>
                        );
                      })
                      : item === 'role' ?
                        roles.map((item, index) => {
                          return (
                            <MenuItem value={item} key={index}>{item}</MenuItem>
                          )
                        }) : item === 'possibility' ? possibilities.map((item, index) => {
                          return (
                            <MenuItem value={item} key={index}>{item}</MenuItem>
                          )
                        }) : statuses.map((item, index) => {
                          return (
                            <MenuItem value={item} key={index}>{item}</MenuItem>
                          )
                        })
                  }
                </Select>
              </FormControl>
            )
          })}


          <Button
            variant="outlined"
            color="error"
            sx={{ maxHeight: "50px" }}
            startIcon={<ClearIcon />}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </Box>
        <Divider sx={{ width: "100%", margin: "1%" }} />
      </>
        :
        ""
      }

      <Box
        padding={"2%"}
        display={"flex"}
        className={styles.box2}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Box display={"flex"} justifyContent={"flex-start"} width={"20%"}>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            {type === 'staffs' ? 'Mentor' : type.charAt(0).toUpperCase() + type.slice(1)} List
          </Typography>
        </Box>

        <Box
          width={'80%'}
          display={'flex'}
          padding={'1%'}
          justifyContent={'flex-end'}
        >
          <TextField sx={{ margin: '1%' }} value={userName} placeholder={`Search ${type === 'staffs' ? 'mentor' : type}`} onChange={(e) => searchUser(e)} />
          {(type === 'assignments' ? userRole === 'staffs' : userRole !== 'students') && <CreateFormDrawer type={type} add />}
        </Box>

      </Box>

      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            type={type}
            userData={userData}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={userData.length}
          />
          <TableBody>
            {
              visibleRows.map((item, index) => {

                return (
                  <>

                    {type === 'staffs' && <Staff type={type} key={item.name} item={item} />}
                    {type === 'inquiries' && <Inquiry type={type} key={item.name} item={item} />}
                    {type === 'students' && <Student type={type} key={item.name} item={item} />}
                    {type === 'courses' && <Course type={type} key={item.name} item={item} />}
                    {type === 'batches' && < Batch type={type} key={item.name} item={item} />}
                    {type === 'assignments' && < Assignment type={type} key={item.name} item={item} />}

                  </>
                );
              })

            }

            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


      <TablePagination
        rowsPerPageOptions={[10, 15, 25, 50]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Paper >
  );
}

export default UserTable;
