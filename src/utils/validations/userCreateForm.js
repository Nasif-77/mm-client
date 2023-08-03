import * as yup from "yup";

export const loginAuthentication = yup.object().shape({
  email: yup.string().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password"),

});

export const staffSchema = yup.object({
  name: yup
    .string()
    .min(2, "Please enter the name correctly")
    .required("Your name is required"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("please enter a valid Email"),
  permissions: yup
    .array()
    .min(1, "Please select at least one permission"),

  joiningDate: yup.string(),
  resignationDate: yup.string(),
  status: yup
    .string()
    .required("Status is required"),
  image: yup.string(),
  phoneNumber: yup
    .string()
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number"),
  guardian: yup.object().shape({
    guardianName: yup.string().min(2, "Please enter the name correctly"),
    guardianRelationship: yup.string(),
    guardianPhone: yup
      .string()
      .min(10, "Please enter a valid phone number")
      .max(10, "Please enter a valid phone number"),
  }),
  document: yup.array(),
  employmentType: yup.string(),
  // employeeId: yup.string().required('Employee ID is required'),
  address: yup.string().min(4, "Please enter the address correctly"),
});

export const inquirySchema = yup.object({

  name: yup
    .string()
    .min(2, 'Please enter the name correctly')
    .required('Your name is required'),
  email: yup
    .string()
    .email('please enter a valid Email'),
  address: yup
    .string()
    .min(4, 'Please enter your correct address'),
  reference: yup
    .string(),
  qualification: yup
    .string(),
  nextFollowUp: yup
    .date(),
  staff: yup
    .string(),
  createdOn: yup
    .date(),
  course: yup
    .string(),
  phone: yup
    .string()
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number"),
  remark: yup
    .string(),
  branch: yup
    .string(),
  status: yup
    .string()
    .required("Status is required"),
  possibility: yup
    .string(),

})


export const studentSchema = yup.object({
  name: yup
    .string()
    .min(2, "Please enter the name correctly")
    .required("Your name is required"),
  email: yup
    .string()
    .email("please enter a valid Email")
    .required("Email is  required"),
  address: yup
    .string()
    .min(4, "Please enter your correct address"),
  guardian: yup.object().shape({
    guardianName: yup
      .string()
      .min(2, "Please enter the name correctly"),
    guardianRelationship: yup
      .string(),
    guardianPhone: yup
      .string()
      .min(10, "Please enter a valid phone number")
      .max(10, "Please enter a valid phone number"),
  }),
  phone: yup
    .string()
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number"),

  batch: yup
    .string(),
  course: yup
    .string(),
  image: yup
    .string(),
  document: yup
    .array(),
  joiningDate: yup
    .string(),
  mentor: yup
    .string(),
  qualification: yup
    .string(),
  grade: yup
    .string(),
  week: yup
    .string()
    .test(
      'Is positive?',
      'Please enter a valid week',
      (value) => value > 0 || value === undefined
    ),
  remark: yup
    .string(),
  status: yup
    .string(),
});

export const courseSchema = yup.object({
  name: yup
    .string()
    .min(2, "Please enter a valid name for  the course")
    .required("A name is required for course"),
  duration: yup
    .number()
    .lessThan(101, "Please enter a valid duration for course")
    .required('A duration is required for course'),
  description: yup
    .string()
  // .required("Please enter a description for the course")
});

export const batchSchema = yup.object({
  name: yup
    .string()
    .required("A name is required for creating a batch"),
  batchStarted: yup
    .string()
});

export const assignmentSchema = yup.object({
  name: yup
    .string()
    .required('A name is required'),
  createdBy: yup
    .string()
    .required(),
  dueDate: yup
    .date()
    .required("Due date is required"),
  createdDate: yup
    .date()
    .required(),
  description: yup
    .string(),
  assignment: yup
    .string()
})

export const assignmentSubmitSchema = yup.object({
  studentId: yup
    .string(),
  submittedDate: yup
    .date(),
  grade: yup
    .string(),
  feedback: yup
    .string(),
  assignment: yup
    .string()
})

export const QandAschema = yup.object({
  question: yup
    .string()
    .required("Question is required"),
  description: yup
    .string(),
  image: yup
    .string()
})


export const profileSchema = yup.object({
  oldPass: yup
    .string()
    .required("Current Password is required"),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      { message: "Please create a stronger password(characters,numbers)" }),
  confirmPass: yup
    .string()
    .oneOf([yup.ref('password'), null], ('Passwords must match '))
    .required('Password confirmation is required'),
})


