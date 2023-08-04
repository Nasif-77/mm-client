import React, { useEffect, useState } from "react";
import UserTable from "../../components/UserTable/UserTable";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { isAuth } from "../../utils/isAuth";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function BatchListPage() {
  const [userData, setUserData] = useState(null);
  const [access, setAccess] = useState(false);
  const user = useSelector((state) => state.reducer.userDetails.user);

  useEffect(() => {
    let isMounted = true;
    const getUserData = async () => {
      try {
        const token = isAuth();
        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/admin/batches`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (isMounted) {
            setUserData(response.data.data);
            user.role === "students" || (user.permissions && !user.permissions?.includes("batches")) || !user.role === 'Super Admin'              ? toast.error("Not Authorized")
              : setAccess(true);
          } else return;
        } else return;
      } catch (error) {}
    };
    getUserData();
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <>
      {access && (
        <Box display={"flex"}>
          {userData ? (
            <UserTable userData={userData} type={"batches"} />
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default BatchListPage;
