import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import styles from "../../styles/userCreateForm.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { inquirySchema } from "../../utils/validations/userCreateForm";
import { useFormik } from "formik";
import dayjs from "dayjs";
import useCreateForm from "../../hooks/useCreateForm";
import axios from "axios";
import { isAuth } from "../../utils/isAuth";

function InquiryForm({ edit, data }) {
  const [followUpDate, setFollowUpDate] = useState(
    edit ? data?.nextFollowUp : dayjs(Date()).$d.toDateString().slice(4, 15)
  );
  const [followUpDate2, setFollowUpDate2] = useState(
    edit ? dayjs(data?.nextFollowUp) : ""
  );
  const [createdOn, setCreatedOn] = useState(
    edit ? data?.createdOn : dayjs(Date()).$d.toDateString().slice(4, 15)
  );
  const [createdOn2, setCreatedOn2] = useState(
    edit ? dayjs(data?.createdOn) : dayjs(Date())
  );
  const [staffs, setStaffs] = useState(null);
  const [courses, setCourses] = useState(null);
  const [possibility, setPosspossibility] = useState(0);
  const [phoneValidation, setPhoneValidation] = useState("");


  useEffect(() => {
    const token = isAuth();
    let isMounted = true

    const getStaffs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/staffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isMounted) setStaffs(response.data.data);
        else return
      } catch (error) { }
    };

    const getCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isMounted) setCourses(response.data.data);
        else return

      } catch (error) { }
    };

    getStaffs();
    getCourses();

    return () => {
      isMounted = false
    }

  }, []);

  const initialValues = edit
    ? {
      name: data?.name || "",
      email: data?.email || "",
      address: data?.address || "",
      phone: data?.phone || "",
      reference: data?.reference || "",
      qualification: data?.qualification || "",
      staff: data?.staff || "",
      course: data?.course || "",
      createdOn: data?.createdOn || "",
      nextFollowUp: data?.nextFollowUp || "",
      remark: data?.remark || "",
      branch: data?.branch || "",
      status: data?.status || "",
      possibility: data?.possibility || "",
    }
    : {
      name: "",
      email: "",
      address: "",
      phone: "",
      reference: "",
      qualification: "",
      course: "",
      createdOn: dayjs(Date()).$d.toDateString().slice(4, 15),
      staff: "",
      nextFollowUp: "",
      remark: "",
      branch: "",
      status: "Open",
      possibility: "",
    };
  const inquiryFormik = useFormik({
    initialValues: initialValues,

    onSubmit: () => {
      phoneValidation === "" && sentValues();
    },

    validationSchema: inquirySchema,
  });
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    inquiryFormik;
  const [buttonDisable, sentValues] = useCreateForm(
    edit,
    "inquiries",
    values,
    data?._id
  );

  const calculatePossiblitiy = (event, newValue) => {
    if (typeof newValue === "number") setPosspossibility(newValue);
    if (newValue === 1) values.possibility = "Low";
    else if (newValue === 2) values.possibility = "Medium";
    else values.possibility = "High";
    return;
  };


  const handlePhoneValidation = async (number) => {
    try {
      const token = isAuth();
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/admin/inquirie?number=${number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { status } = response.data;

      if (status === "success") {
        setPhoneValidation("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const user = error.response.data.data;
        const errorMessage = error.response.data.message;
        setPhoneValidation(`${errorMessage} for ${user}`);
      } else {
        setPhoneValidation("");
      }
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <Box className={styles.box}>
        <Typography variant="h6">
          {edit ? <>Edit</> : <>Create</>} Inquiry
        </Typography>
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
          onChange={(event) => {
            handleChange(event);
            const phoneNumber = event.target.value;
            if (event.target.value.length === 10) {
              handlePhoneValidation(phoneNumber);
            } else {
              setPhoneValidation("");
            }
          }}
          autoComplete="none"
          onBlur={handleBlur}
          value={values.phone}
          error={
            touched.phone &&
              (errors.phone || phoneValidation || !phoneValidation)
              ? errors.phone || phoneValidation
              : ""
          }
          helperText={
            touched.phone &&
              (errors.phone || phoneValidation || !phoneValidation)
              ? errors.phone || phoneValidation
              : ""
          }
        />
        {/* <p>{phoneValidation}</p> */}

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

        {courses && <Autocomplete
          sx={{ marginTop: "2%", marginBottom: "2%" }}
          name='course'
          value={values.course}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              values.course = newValue
              inquiryFormik.setFieldValue('course', newValue)
            } else {
              values.course = ""
              inquiryFormik.setFieldValue('course', '')
            }
          }}
          options={courses?.map(course => course.name)}
          renderInput={(params) => <TextField {...params} label="Course" />}
        />}

        {staffs && <>
          <Autocomplete
            sx={{ marginTop: "2%", marginBottom: "2%" }}
            name='staff'
            value={values.staff}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                values.staff = newValue
                inquiryFormik.setFieldValue('staff', newValue)
              } else {
                values.staff = ""
                inquiryFormik.setFieldValue('staff', '')
              }
            }}
            options={staffs?.map(staff => staff.name)}
            renderInput={(params) => <TextField {...params} label="Assign Staff" />}
          />

        </>}

        <FormControl
          name="createdOn"
          error={Boolean(errors.createdOn && touched.createdOn)}
          sx={{ marginTop: "2%", marginBottom: "2%" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Created On"
              format="DD/MM/YYYY"
              value={createdOn2}
              disableFuture
              required={true}
              onChange={(newValue) => {
                setCreatedOn2(newValue);
                values.createdOn =
                  newValue === null
                    ? createdOn
                    : newValue.$d.toString().slice(4, 15);
                setCreatedOn(
                  newValue === null
                    ? createdOn
                    : newValue.$d.toString().slice(4, 15)
                );
              }}
              slotProps={{ textField: { variant: "outlined", readOnly: true } }}
            />
          </LocalizationProvider>
          <FormHelperText>
            {errors.createdOn
              ? "Please select the date"
              : `Default:Today's date`}
          </FormHelperText>
        </FormControl>

        <TextField
          className={styles.TextField}
          placeholder="Qualification"
          name="qualification"
          label={"Qualification"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.qualification}
          error={touched.qualification && Boolean(errors.qualification)}
          helperText={touched.qualification && errors.qualification}
        />

        <TextField
          className={styles.TextField}
          placeholder="Reference"
          name="reference"
          label={"Reference"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.reference}
          error={touched.reference && Boolean(errors.reference)}
          helperText={touched.reference && errors.reference}
        />

        <FormControl
          error={touched.branch && Boolean(errors.branch)}
          sx={{ marginTop: "2%", marginBottom: "2%" }}
        >
          <InputLabel>Branch</InputLabel>
          <Select
            onBlur={handleBlur}
            name="branch"
            value={values.branch}
            label="Branch"
            onChange={handleChange}
          >
            <MenuItem value={""}>None</MenuItem>
            {["Kakkenchery", "Manjeri"].map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{touched.branch && errors.branch}</FormHelperText>
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
            <MenuItem value={""}>None</MenuItem>
            {["Open", "Closed", "Joined"].map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{touched.status && errors.status}</FormHelperText>
        </FormControl>

        <FormControl
          name="nextFollowUp"
          error={Boolean(errors.nextFollowUp && touched.nextFollowUp)}
          sx={{ marginTop: "2%", marginBottom: "2%" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Next Follow Up"
              format="DD/MM/YYYY"
              value={followUpDate2}
              disablePast
              required={true}
              onChange={(newValue) => {
                setFollowUpDate2(newValue);
                values.nextFollowUp =
                  newValue === null
                    ? followUpDate
                    : newValue.$d.toString().slice(4, 15);
                setFollowUpDate(
                  newValue === null
                    ? followUpDate
                    : newValue.$d.toString().slice(4, 15)
                );
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  readOnly: true,
                  error: false,
                },
              }}
            />
          </LocalizationProvider>
          <FormHelperText>
            {errors.nextFollowUp
              ? "Please select the date"
              : `Default:Today's date`}
          </FormHelperText>
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

        <Box marginTop={"2%"} marginBottom={"2%"}>
          <InputLabel>Possibility</InputLabel>
          <Typography fontWeight={"bold"}>{values.possibility}</Typography>
          <Slider
            value={possibility}
            marks
            name="possibility"
            onChange={calculatePossiblitiy}
            onBlur={handleBlur}
            defaultValue={1}
            valueLabelDisplay="off"
            step={1}
            min={1}
            max={3}
          />
        </Box>

        <Button type={"submit"} disabled={buttonDisable}>
          Submit
        </Button>

      </Box>
      <ToastContainer />
    </form>
  );
}

export default InquiryForm;
