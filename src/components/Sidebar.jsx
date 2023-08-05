import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import styles from '../styles/sidebar.module.scss';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import LogutIc
import {
  ListItemButton, List, Toolbar, Divider, Drawer, Box, Typography,
  IconButton, ListItem, ListItemIcon, ListItemText, Button, Menu, MenuItem
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { handleSelected } from '../store/slicers/sidebarSelector';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import jwtDecode from 'jwt-decode';
import { isAuth } from '../utils/isAuth';
import { AccountCircle, Assignment, Face, QuestionAnswer } from '@mui/icons-material';
import { getUserDetails } from '../store/slicers/userDetails';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



function SideBar() {


  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selected = useSelector(state => state.reducer.sidebarSelector.selected)
  const [logoutDialog, setLogoutDialog] = useState(false)
  const [user, setuser] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handlelogoutDialogOpen = () => {
    setLogoutDialog(true);
  };

  const handlelogoutDialogClose = () => {
    setLogoutDialog(false);
  };


  useEffect(() => {
    let isMounted = true
    const token = isAuth()

    if (isMounted) {
      dispatch(handleSelected(location.pathname.split('/')[1]))
      if (token) {
        dispatch(getUserDetails(jwtDecode(token)))
        setuser(jwtDecode(token))
      }
    }
    return () => {
      isMounted = false
    }
  }, [dispatch, location])


  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (


    <>

      <Box className={styles.mainDiv} sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Box
              width={'100%'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Box
                display={'flex'}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Mentor Management
                </Typography>
              </Box>

              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {user?.role !== 'Super Admin' && <MenuItem onClick={() => { handleMenuClose(); navigate('/profile') }} disableRipple> <Face />Profile</MenuItem>}
                  <MenuItem onClick={() => { handleMenuClose(); handlelogoutDialogOpen() }} disableRipple><LogoutIcon /> Logout</MenuItem>
                </Menu>
              </div>


            </Box>

          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography fontWeight={'bold'} variant='h6'>Navigation Menu</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>

            {(user?.permissions?.includes('mentors') || user?.role === 'Super Admin') && <Link to="/mentors">
              <ListItem component="div">
                <ListItemButton selected={selected === 'mentors'}>
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mentors" />
                </ListItemButton>
              </ListItem>
            </Link>
            }

            {(user?.permissions?.includes('students') || user?.role === 'Super Admin') && <Link to="/students">
              <ListItem component="div">
                <ListItemButton selected={selected === 'students'}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Students'} />
                </ListItemButton>
              </ListItem>
            </Link>
            }
            
            {(user?.permissions?.includes('inquiries') || user?.role === 'Super Admin') && <Link to="/inquiries">
              <ListItem component="div">
                <ListItemButton selected={selected === 'inquiries'}>
                  <ListItemIcon>
                    <ContactPhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Inquiries'} />
                </ListItemButton>
              </ListItem>
            </Link>
            }

            {(user?.permissions?.includes('batches') || user?.role === 'Super Admin') && <Link to="/batches">
              <ListItem component="div">
                <ListItemButton selected={selected === 'batches'}>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Batches'} />
                </ListItemButton>
              </ListItem>
            </Link>
            }

           <Link to="/courses">
              <ListItem component="div">
                <ListItemButton selected={selected === 'courses'}>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Courses'} />
                </ListItemButton>
              </ListItem>
            </Link>
            


            {user?.role === 'students' && <Link to="/profile">
              <ListItem component="div">
                <ListItemButton selected={selected === 'profile'}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary={'Profile'} />
                </ListItemButton>
              </ListItem>
            </Link>}

            <Link to="/assignments">
              <ListItem component="div">
                <ListItemButton selected={selected === 'assignments'}>
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  <ListItemText primary={'Assignments'} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/q&a">
              <ListItem component="div">
                <ListItemButton selected={selected === 'q&a'}>
                  <ListItemIcon>
                    <QuestionAnswer />
                  </ListItemIcon>
                  <ListItemText primary={'Q&A Section'} />
                </ListItemButton>
              </ListItem>
            </Link>


          </List>
        </Drawer>
        <Main open={open}>
        </Main>
      </Box>


      <Dialog
        open={logoutDialog}
        onClose={handlelogoutDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to Logout`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handlelogoutDialogClose}>Cancel</Button>
          <Button onClick={logout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>


    </>

  )
}
export default React.memo(SideBar)