import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InquiryCard from "../components/InfoCards/InquiryCard";
import StudentCard from "../components/InfoCards/StudentCard";
import StaffCard from "../components/InfoCards/StaffCard";
import CourseCard from "../components/InfoCards/CourseCard";
import BatchCard from "../components/InfoCards/BatchCard";
import axios from "axios";
import { isAuth } from "../utils/isAuth";
import AssignmentCard from "../components/InfoCards/AssignmentCard";
import { useSelector } from "react-redux";

function CardOverView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.reducer.userDetails.user);

  const [userData, setUserData] = useState(null);
  const [type, setType] = useState("");
  const [response, setResponse] = useState("Loading Data ....");

  useEffect(() => {
    const token = isAuth();
    let isMounted = true;

    const getData = async () => {
      try {
        const reqType = location.pathname.split("/")[1];
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/${
            reqType === "mentors" ? "staffs" : reqType
          }/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isMounted)
          response.data.data?.isDeleted === false
            ? setUserData(response.data.data)
            : navigate(`/${location.pathname.split("/")[1]}`);
      } catch (error) {
        if (error.response.status !== 200) setResponse("Nothing to see here");
      }
    };
    getData();
    setType(location.pathname.split("/")[1]);
    return () => {
      isMounted = false;
    };
  }, [location, id, navigate]);

  return (
    <div>
      {userData?.isDeleted === false ? (
        <div>
          {(user.role === "Super Admin" || user.permissions.includes(type)) && (
            <>
              {type === "inquiries" ? (
                <InquiryCard userData={userData} />
              ) : null}
              {type === "students" ? <StudentCard userData={userData} /> : null}
              {type === "mentors" ? <StaffCard userData={userData} /> : null}
              {type === "courses" ? <CourseCard userData={userData} /> : null}
              {type === "batches" ? <BatchCard userData={userData} /> : null}
            </>
          )}
          {type === "assignments" ? (
            <AssignmentCard userData={userData} />
          ) : null}
        </div>
      ) : (
        <p>{response}</p>
      )}
    </div>
  );
}

export default CardOverView;
