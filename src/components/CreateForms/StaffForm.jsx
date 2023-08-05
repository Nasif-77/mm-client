import {
  Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, TextField, Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

import React, { useState } from "react";
import styles from "../../styles/userCreateForm.module.scss";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { staffSchema } from "../../utils/validations/userCreateForm";
import { useFormik } from "formik";

import useCreateForm from "../../hooks/useCreateForm";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function UserCreateForm({ edit, data }) {

  const [image, setImage] = useState({});
  const [documents, setDocuments] = useState([])
  const [joiningDate, setJoinDate] = useState(edit ? data?.joiningDate : dayjs(Date()).$d.toDateString().slice(4, 15));
  const [joinDate2, setJoinDate2] = useState(edit ? dayjs(data?.joiningDate) : '');
  const [resignationDate, setResignationDate] = useState(edit ? data?.resignationDate : dayjs(Date()).$d.toDateString().slice(4, 15));
  const [resignationDate2, setResignationDate2] = useState(edit ? dayjs(data?.resignationDate) : '');
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [permissions, setPermissions] = useState({
    attendence: false, batch: false, students: false,
  });

  const initialValues = edit ?
    {
      name: data?.name || '',
      email: data?.email || '',
      // password: data?.password || '',
      permissions: [...data?.permissions],
      joiningDate: data?.joiningDate || '',
      resignationDate: data?.resignationDate || '',
      status: data?.status || '',
      image: data?.image || '',
      phoneNumber: data?.phoneNumber || '',
      guardian: {
        guardianName: data?.guardian.name || '',
        guardianRelationship: data?.guardian.relationship || '',
        guardianPhone: data?.guardian.phone || '',
      },
      document: [] || '',
      employmentType: data?.employmentType || '',
      // employeeId: data?.employeeId || '',
      address: data?.address || ''
    }
    :
    {
      name: "",
      email: "",
      // password: "",
      permissions: [],
      joiningDate: "",
      resignationDate: "",
      status: "Active",
      image: "",
      phoneNumber: "",
      guardian: {
        guardianName: "",
        guardianRelationship: "",
        guardianPhone: "",
      },
      document: [],
      employmentType: "",
      // employeeId: "",
      address: ""
    }

  const staffFormik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      if (values.permissions.length > 0) sentValues()
      else {
        errors.permissions = 'Please select one permission';
        touched.permissions = true;
      }
    },
    validationSchema: staffSchema,
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    staffFormik;


  const [buttonDisable, sentValues] = useCreateForm(edit, 'staffs', values, data?._id)


  const handlePermissions = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
    const { name, checked } = event.target;

    if (checked) {
      values.permissions.push(name);
    } else {
      values.permissions = values.permissions.filter(
        (permission) => permission !== name
      );
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.box}>
        <Typography variant='h6' >{edit ? <>Edit</> : <>Create</>} Mentor</Typography>
        <TextField
          className={styles.TextField}
          name='name'
          label={'Full Name'}
          placeholder='Full Name'
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


        <FormControl sx={{ marginTop: "2%", marginBottom: "2%" }}>
          <InputLabel>Employment Type</InputLabel>
          <Select
            onBlur={handleBlur}
            name="employmentType"
            value={values.employmentType}
            label="Employment Type"
            onChange={handleChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </Select>
          <FormHelperText>
            {touched.employmentType && errors.employmentType}
          </FormHelperText>
        </FormControl>


        <FormControl
          name="permissions"
          error={
            values.permissions.length < 1
              ? touched.permissions && Boolean(errors.permissions)
              : false
          }
          sx={{ m: 2 }}
          onChange={() => {
            if (values.permissions.length < 1) {
              errors.permissions = "Please select at least one permission"
              touched.permissions = true
            }
            else {
              staffFormik.setErrors({
                ...errors,
                permissions: false
              })
            }
          }
          }
          onBlur={handleBlur}
          component="div"
          variant="standard"
        >
          <FormLabel component="header">Permissions</FormLabel>
          <FormGroup>

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.permissions.includes("mentors")}
                  onBlur={handleBlur}
                  onChange={handlePermissions}
                  name="mentors"
                />
              }
              label="Mentor"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.permissions.includes("batches")}
                  onBlur={handleBlur}
                  onChange={handlePermissions}
                  name="batches"
                />
              }
              label="Batch"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.permissions.includes("students")}
                  onBlur={handleBlur}
                  onChange={handlePermissions}
                  name="students"
                />
              }
              label="Students"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.permissions.includes("inquiries")}
                  onBlur={handleBlur}
                  onChange={handlePermissions}
                  name="inquiries"
                />
              }
              label="Inquiry"
            />
          </FormGroup>
          <FormHelperText>
            {values.permissions.length < 1
              ? touched.permissions && errors.permissions
              : ""}
          </FormHelperText>
        </FormControl>

        <TextField
          className={styles.TextField}
          name="address"
          label="Address"
          placeholder="Address"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />

        <TextField
          className={styles.TextField}
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phoneNumber}
          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
          helperText={touched.phoneNumber && errors.phoneNumber}
        />

        <FormControl>
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
                  value={values.guardian?.guardianName}
                />
                <TextField
                  className={styles.TextField}
                  placeholder="Relationship"
                  name="guardian.guardianRelationship"
                  label={"Relationship"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.guardian?.guardianRelationship}
                />

                <TextField
                  className={styles.TextField}
                  placeholder="Phone"
                  name="guardian.guardianPhone"
                  label={"Phone"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.guardian?.guardianPhone}
                />
              </List>
            </Collapse>
          </List>
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
              required={true}
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

        <FormControl>
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


        <FormControl
          error={touched.status && Boolean(errors.status)}
          sx={{ marginTop: "2%", marginBottom: "2%" }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            onBlur={handleBlur}
            name="status"
            value={values.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Resigned">Resigned</MenuItem>
          </Select>
          <FormHelperText>{touched.status && errors.status}</FormHelperText>
        </FormControl>

        {values.status === "resigned" && (
          <FormControl
            name="resignationDate"
            error={Boolean(errors.resignationDate && touched.resignationDate)}
            sx={{ marginTop: "2%", marginBottom: "2%" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Resignation date "
                format="DD/MM/YYYY"
                value={resignationDate2}
                required={true}
                onChange={(newValue) => {
                  setResignationDate2(newValue);  // Update resignationDate2 state
                  values.resignationDate =
                    newValue === null
                      ? resignationDate
                      : newValue.$d.toString().slice(4, 15);  // Update values.resignationDate in the formik values
                  setResignationDate(
                    newValue === null
                      ? resignationDate
                      : newValue.$d.toString().slice(4, 15)  // Update resignationDate state
                  );
                }}
                slotProps={{
                  textField: { variant: "outlined", readOnly: true, error: false },
                }}
              />
            </LocalizationProvider>
          </FormControl>
        )}

        <Button type={"submit"} disabled={buttonDisable}>Submit</Button>
      

      </Box>
      <ToastContainer />
    </form>
  );
}

export default UserCreateForm;
