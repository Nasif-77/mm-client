import React from 'react'
import InquiryForm from './InquiryForm'
import StudentForm from './StudentForm'
import StaffForm from './StaffForm'
import CourseForm from './CourseForm'
import BatchForm from './BatchForm'
import AssignmentForm from './AssignmentForm'
import StudentQandA from './StudentQandA'

function CreateForm({ type, edit, data }) {


  return (
    <>
      {edit && data ?
        <>
          {type === 'inquiries' ? <InquiryForm edit data={data} /> : null}
          {type === 'students' ? <StudentForm edit data={data} /> : null}
          {type === 'staffs' ? <StaffForm edit data={data} /> : null}
          {type === 'courses' ? <CourseForm edit data={data} /> : null}
          {type === 'batches' ? <BatchForm edit data={data} /> : null}
          {type === 'assignments' ? <AssignmentForm edit data={data} /> : null}

        </>
        :
        <>
          {type === 'inquiries' ? <InquiryForm /> : null}
          {type === 'students' ? <StudentForm /> : null}
          {type === 'staffs' ? <StaffForm /> : null}
          {type === 'courses' ? <CourseForm /> : null}
          {type === 'batches' ? <BatchForm /> : null}
          {type === 'assignments' ? <AssignmentForm /> : null}
          {type === 'QandA' ? <StudentQandA /> : null}

        </>
      }
    </>
  )
}

export default CreateForm