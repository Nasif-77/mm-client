import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { isAuth } from "../utils/isAuth";

function useCreateForm(edit, type, values, id) {
  const [buttonDisable, setButtonDisable] = useState(false)

  const sentValues = async () => {
    const token = isAuth();
    setButtonDisable(true)

    try {
      let response;
      if (edit) {

        if (type === 'students') {
          const datas = new FormData()
          if (values.password) {
            datas.append("password", values.password);
            datas.append("oldPass", values.oldPass);
          } else {
            datas.append("name", values.name)
            datas.append("email", values.email)
            datas.append("phone", values.phone)
            datas.append("address", values.address)
            datas.append("batch", values.batch)
            datas.append("oldBatch", values.oldBatch)
            datas.append("course", values.course)
            datas.append("guardian", JSON.stringify(values.guardian))
            datas.append("image", values.image)
            if (values.document && values.document.length > 0) {
              values.document.forEach((file, index) => {
                datas.append(`document`, file);
              });
            }
            datas.append("joiningDate", values.joiningDate)
            datas.append("mentor", values.mentor)
            datas.append("grade", values.grade)
            datas.append("qualification", values.qualification)
            datas.append("week", values.week)
            datas.append("remark", values.remark)
            datas.append("status", values.status)
          }
          response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}/${id}`, datas, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          })

        }
        else if (type === 'staffs') {
          const datas = new FormData()
          if (values.password) {
            datas.append("password", values.password);
            datas.append("oldPass", values.oldPass);
          } else {
            datas.append("name", values.name);
            datas.append("email", values.email);
            datas.append("permissions", JSON.stringify(values.permissions));
            datas.append("joiningDate", values.joiningDate);
            datas.append("resignationDate", values.resignationDate);
            datas.append("status", values.status);
            datas.append("image", values.image);
            datas.append("phoneNumber", values.phoneNumber);
            if (values.document && values.document.length > 0) {
              values.document.forEach((file, index) => {
                datas.append(`document`, file);
              });
            }
            datas.append("employmentType", values.employmentType);
            // datas.append("employeeId", values.employeeId);
            datas.append("address", values.address);
            datas.append("guardian", JSON.stringify(values.guardian));
          }

          response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}/${id}`, datas, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        else if (type === 'assignments') {
          const datas = new FormData()

          datas.append("name", values.name);
          datas.append("createdBy", values.createdBy);
          datas.append("createdDate", values.createdDate);
          datas.append("dueDate", values.dueDate);
          datas.append("description", values.description);
          datas.append("resignationDate", values.resignationDate);
          datas.append("assignment", values.assignment);

          response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}/${id}`, datas, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }


        else {
          response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}/${id}`, values, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }

        if (response.status === 200) {
          setButtonDisable(true)
          toast.success(`Edited succesfully`)
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      }

      else {

        if (type === 'students') {
          const datas = new FormData()
          datas.append("name", values.name)
          datas.append("email", values.email)
          datas.append("phone", values.phone)
          datas.append("address", values.address)
          datas.append("batch", values.batch)
          datas.append("course", values.course)
          datas.append("guardian", JSON.stringify(values.guardian))
          datas.append("image", values.image)
          if (values.document && values.document.length > 0) {
            values.document.forEach((file, index) => {
              datas.append(`document`, file);
            });
          }
          datas.append("joiningDate", values.joiningDate)
          datas.append("mentor", values.mentor)
          datas.append("advisor", values.advisor)
          datas.append("qualification", values.qualification)
          datas.append("grade", values.grade)
          datas.append("week", values.week)
          datas.append("remark", values.remark)
          datas.append("status", values.status)

          response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}`, datas, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          })
        }
        else if (type === 'staffs') {
          const datas = new FormData()
          datas.append("name", values.name);
          datas.append("email", values.email);
          datas.append("permissions", JSON.stringify(values.permissions));
          datas.append("joiningDate", values.joiningDate);
          datas.append("resignationDate", values.resignationDate);
          datas.append("status", values.status);
          datas.append("image", values.image);
          datas.append("phoneNumber", values.phoneNumber);
          if (values.document && values.document.length > 0) {
            values.document.forEach((file, index) => {
              datas.append(`document`, file);
            });
          }
          datas.append("employmentType", values.employmentType);
          // datas.append("employeeId", values.employeeId);
          datas.append("address", values.address);
          datas.append("guardian", JSON.stringify(values.guardian));

          response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}`, datas, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        else if (type === 'assignments') {
          const datas = new FormData()

          datas.append("name", values.name);
          datas.append("createdBy", values.createdBy);
          datas.append("createdDate", values.createdDate);
          datas.append("dueDate", values.dueDate);
          datas.append("description", values.description);
          datas.append("resignationDate", values.resignationDate);
          datas.append("assignment", values.assignment);

          response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}`, datas, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        else if (type === 'QandA') {
          const data = new FormData()
          data.append('question', values.question)
          data.append('description', values.description)
          data.append('image', values.image)
          data.append('createdBy', values.createdBy)

          response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/questions`, data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }

        else {
          response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/admin/${type}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }


      }
      if (response.status === 201) {
        toast.success("Created succesfully")
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }



    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
      setButtonDisable(false)
    }

  };

  return [buttonDisable, sentValues];
}

export default useCreateForm;
