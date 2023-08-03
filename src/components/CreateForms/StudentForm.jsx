import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material";
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Collapse, } from "@mui/material";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuth } from "../../utils/isAuth";
import useCreateForm from "../../hooks/useCreateForm";
import { studentSchema } from "../../utils/validations/userCreateForm";
import styles from "../../styles/userCreateForm.module.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


function StudentForm({ edit, data }) {

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const [documents, setDocuments] = useState([])
  const [joiningDate, setJoinDate] = useState(edit ? data?.joiningDate : dayjs(Date()).$d.toDateString().slice(4, 15));
  const [joinDate2, setJoinDate2] = useState(edit ? dayjs(data?.joiningDate) : '');
  const [staff, setStaff] = useState(null);
  const [batch, setBatch] = useState(null);
  const [course, setCourse] = useState(null);

  const handleClick = () => {
    setOpen(!open);
  };



  useEffect(() => {
    const token = isAuth();
    let isMounted = true

    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/staffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isMounted) setStaff(response.data.data);
        else return
      } catch (error) {
        alert(error.message)
      }
    };

    const fetchBatch = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/batches`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isMounted) setBatch(response.data.data);
        else return
      } catch (error) {
        alert(error.message)
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isMounted) setCourse(response.data.data);
        else return
      } catch (error) {
        alert(error.message)
      }
    };

    fetchStaff();
    fetchBatch();
    fetchCourse();

    return () => {
      isMounted = false
    }
  }, []);

  const initialValues = edit ?
    {
      name: data?.name || '',
      email: data?.email || '',
      address: data?.address || '',
      phone: data?.phone || '',
      batch: data?.batch || '',
      oldBatch: data?.batch || '',
      guardian: {
        guardianName: data?.guardian.name || '',
        guardianRelationship: data?.guardian.relationship || '',
        guardianPhone: data?.guardian.phone || ''
      },
      joiningDate: data?.joiningDate || '',
      mentor: data?.mentor || '',
      image: data?.image || '',
      document: [] || '',
      course: data?.course || '',
      qualification: data?.qualification || '',
      grade: data?.grade || '',
      week: data?.week || '',
      remark: data?.remark || "",
      status: data?.status || ''
    }
    :
    {
      name: "",
      email: "",
      address: "",
      phone: "",
      batch: "",
      guardian: {
        guardianName: "",
        guardianRelationship: "",
        guardianPhone: "",
      },
      joiningDate: "",
      mentor: "",
      image: "",
      document: [],
      course: "",
      qualification: "",
      grade: "",
      week: "",
      remark: "",
      status: "",
    }

  const studentFormik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      sentValues();
    },
    validationSchema: studentSchema,
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    studentFormik;

  const [buttonDisable, sentValues] = useCreateForm(edit, 'students', values, data?._id)
  return (
    <>

      <form onSubmit={handleSubmit}>
        <Box className={styles.box}>
          <Typography variant="h6">Create Student</Typography>
          <TextField
            className={styles.TextField}
            name="name"
            label={"Full Name"}
            placeholder="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            className={styles.TextField}
            name="email"
            label={"Email"}
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            className={styles.TextField}
            placeholder="Address"
            name="address"
            label={"Address"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
          />

          <TextField
            className={styles.TextField}
            type="number"
            placeholder="Phone"
            name="phone"
            label={"Phone"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          {batch && <Autocomplete
            sx={{ marginTop: "2%", marginBottom: "2%" }}
            name='batch'
            value={values.batch}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                values.batch = newValue
                studentFormik.setFieldValue('batch', newValue)
              } else {
                values.batch = ""
                studentFormik.setFieldValue('batch', '')
              }
            }}
            options={batch?.map(batch => batch.name)}
            renderInput={(params) => <TextField {...params} label="Batch" />}
          />}

          {course && <Autocomplete
            sx={{ marginTop: "2%", marginBottom: "2%" }}
            name='course'
            value={values.course}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                values.course = newValue
                studentFormik.setFieldValue('course', newValue)
              } else {
                values.course = ""
                studentFormik.setFieldValue('course', '')
              }
            }}
            options={course?.map(course => course.name)}
            renderInput={(params) => <TextField {...params} label="Course" />}
          />}

          <FormControl
            error={
              Boolean(errors.guardian?.guardianName) ||
              Boolean(errors.guardian?.guardianRelationship) ||
              Boolean(errors.guardian?.guardianPhone)
            }
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Details of guardian
                </ListSubheader>
              }
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <FamilyRestroomIcon />
                </ListItemIcon>
                <ListItemText primary="Guardian" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <TextField
                    className={styles.TextField}
                    placeholder="Name"
                    name="guardian.guardianName"
                    label={"Name"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={studentFormik.values.guardian?.guardianName}
                    error={
                      studentFormik.touched.guardian?.guardianName &&
                      Boolean(studentFormik.errors.guardian?.guardianName)
                    }
                    helperText={
                      studentFormik.touched.guardian?.guardianName &&
                      studentFormik.errors.guardian?.guardianName
                    }
                  />
                  <TextField
                    className={styles.TextField}
                    placeholder="Relationship"
                    name="guardian.guardianRelationship"
                    label={"Relationship"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.guardian?.guardianRelationship}
                    error={
                      touched.guardian?.guardianRelationship &&
                      Boolean(errors.guardian?.guardianRelationship)
                    }
                    helperText={
                      touched.guardian?.guardianRelationship &&
                      errors.guardian?.guardianRelationship
                    }
                  />

                  <TextField
                    className={styles.TextField}
                    placeholder="Phone"
                    name="guardian.guardianPhone"
                    label={"Phone"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.guardian?.guardianPhone}
                    error={
                      touched.guardian?.guardianPhone &&
                      Boolean(errors.guardian?.guardianPhone)
                    }
                    helperText={
                      touched.guardian?.guardianPhone &&
                      errors.guardian?.guardianPhone
                    }
                  />

                </List>
              </Collapse>
            </List>
            <FormHelperText>
              {errors.guardian?.guardianName ||
                errors.guardian?.guardianRelationship ||
                errors.guardian?.guardianPhone
                ? "Please enter the details of the gurdian"
                : ""}
            </FormHelperText>
          </FormControl>

          <FormControl
            name="joiningDate"
            error={Boolean(errors.joiningDate && touched.joiningDate)}
            sx={{ marginTop: "2%", marginBottom: "2%" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Joining Date"
                format="DD/MM/YYYY"
                value={joinDate2}
                disableFuture
                onChange={(newValue) => {
                  setJoinDate2(newValue);
                  values.joiningDate =
                    newValue === null
                      ? joiningDate
                      : newValue.$d.toString().slice(4, 15);
                  setJoinDate(
                    newValue === null
                      ? joiningDate
                      : newValue.$d.toString().slice(4, 15)
                  );
                }}
                slotProps={{ textField: { variant: "outlined", readOnly: true, error: false } }}
              />
            </LocalizationProvider>
          </FormControl>

          {staff &&
            <Autocomplete
              value={values.mentor}
              sx={{ marginTop: "2%", marginBottom: "2%" }}
              name='mentor'
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  values.mentor = newValue
                  studentFormik.setFieldValue('mentor', newValue)
                } else {
                  values.mentor = ""
                  studentFormik.setFieldValue('mentor', '')
                }
              }}
              options={staff?.map(mentor => mentor.name)}
              renderInput={(params) => <TextField {...params} label="Mentor" />}
            />


          }

          <TextField
            className={styles.TextField}
            name="week"
            label="Current Week"
            placeholder="Week"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.week}
            error={touched.week && Boolean(errors.week)}
            helperText={touched.week && errors.week}
            InputProps={{
              inputProps: { min: 1 }
            }}
          />

          <TextField
            className={styles.TextField}
            name="qualification"
            label="Qualification"
            placeholder="Qualification"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.qualification}
            error={touched.qualification && Boolean(errors.qualification)}
            helperText={touched.qualification && errors.qualification}
          />

          <FormControl
            className={styles.TextField}
            error={touched.grade && Boolean(errors.grade)}
          >
            <InputLabel>Grade</InputLabel>
            <Select
              name="grade"
              label="Grade"
              value={values.grade}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"Excellent"}>Excellent</MenuItem>
              <MenuItem value={"Good"}>Good</MenuItem>
              <MenuItem value={"Average"}>Average</MenuItem>
              <MenuItem value={"Below Average"}>Below Average</MenuItem>
              <MenuItem value={"Needs Improvement"}>Needs Improvement</MenuItem>
            </Select>
            {touched.grade && errors.grade && (
              <FormHelperText>{errors.grade}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            className={styles.TextField}
            error={touched.status && Boolean(errors.status)}
          >
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              label="Status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Placed"}>Placed</MenuItem>
              <MenuItem value={"Dropped"}>Dropped</MenuItem>
              <MenuItem value={"Terminated"}>Terminated</MenuItem>
            </Select>
            {touched.status && errors.status && (
              <FormHelperText>{errors.status}</FormHelperText>
            )}
          </FormControl>

          <TextField
            className={styles.TextField}
            placeholder="Remark"
            name="remark"
            multiline
            label={"Remark"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.remark}
            error={touched.remark && Boolean(errors.remark)}
            helperText={touched.remark && errors.remark}
          />

          <FormControl sx={{ marginTop: "2%", marginBottom: "2%" }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<ImageIcon />}
            >
              {edit ? "Update" : "Upload"} Image
              <input
                accept=".png, .jpg, .jpeg"
                type="file"
                hidden
                name="image"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    values.image = e.target.files[0];
                    setImage(e.target.files[0])
                  }
                }}
              />
            </Button>
            <FormHelperText>{image?.name}</FormHelperText>
          </FormControl>

          <FormControl className={styles.TextField}>
            <Button
              variant="contained"
              component="label"
              startIcon={<ImageIcon />}
            >
              {edit ? "Update" : "Upload"} Documents
              <input
                type="file"
                hidden
                name="document"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    values.document.push(...e.target.files);
                    setDocuments([...e.target.files])
                  }
                }}
                multiple
              />
            </Button>
            <FormHelperText>

              <Typography sx={{ textDecoration: 'underline' }} color={'black'} fontWeight={'bold'} variant="body2">
                {documents.length > 0 ? 'Selected documents' : ''}
              </Typography>

              {documents.map(document => (
                <Typography key={document.name} variant="subtitle2">
                  *{document.name}
                </Typography>
              ))}

            </FormHelperText>
          </FormControl>

          <Button type={'submit'} disabled={buttonDisable}>Submit</Button>

        </Box >
        <ToastContainer />
      </form >
    </>
  )

}

export default StudentForm;
