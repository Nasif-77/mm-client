import React from 'react'
import SideBar from "../components/Sidebar";
import { permissions } from "../assets/data/Sidebar_data";
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function Layout() {
  return (
    <Box display={'flex'} >
      <SideBar permissions={permissions} />
      <Box marginTop={'5%'} marginLeft={'auto'} marginRight={'auto'} marginBottom={'auto'}>
        <Outlet />
      </Box>

    </Box>
  )
}

export default Layout