
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './App.css'; // Optional: use a separate CSS file
import {
  AppBar, Box, Button, CssBaseline, Drawer, IconButton,
  Toolbar, Typography, Avatar, List, ListItem, ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Toggle} from './store/Reducers/CounterReducer'
import {fetchSidebarlinks} from "./store/Reducers/NavlinkReducer"

const Layout = () => {
   const userData = useSelector((state) => state.AuthUserReducer.data)
   const sidebarWidth = useSelector((state) => state.sidebar.value)
   const dispatch = useDispatch()
   const {data,isLoading} = useSelector((state)=> state.fetchSidebarReducer)
   const AuthUser = useSelector((state)=> state.AuthUserReducer)

   const navigate = useNavigate()
  //  console.log({AuthUser})
    useEffect(() => {
      if(userData.email != undefined) dispatch(fetchSidebarlinks(userData.email))
       
    }, [AuthUser])
    

    const UserLogOut = async() =>{
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/logout`,
          { withCredentials: true }
        );
  
        if (response.status === 200) {
          navigate(`/LoginToNotes`);
        }
      } catch (error) {
        console.error(error);
      }
    }



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
      if(e.target.id == 'Logout'){
        UserLogOut()
      }
      setAnchorEl(null);
    };

useEffect(() => {
  if ( !AuthUser.data.success) return <Navigate to="/LoginToNotes" />;
}, [AuthUser.data.success])


  // if (AuthUser.isLoading) return <div>Loading...</div>;
  //  if ( !AuthUser.data.success) return <Navigate to="/LoginToNotes" />;

    return (
      <>
       <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={() => dispatch(Toggle())}>
            ☰
          </Button>

          <Typography variant="h6" noWrap style={{
             fontSize: '22px',
             fontWeight: 'bold',
             color: 'white',
             textDecoration: 'none',
          }}>
          📝 MyNotesApp
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="inherit"
              endIcon={<PublishIcon />}
              onClick={() => navigate('/CreateNotes')}
            >
              Create
            </Button>

            <Avatar alt="User" sx={{ cursor: 'pointer' }} onClick={handleClick} />

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My Account</MenuItem>
              <MenuItem onClick={handleClose} id='Logout'>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Layout Container */}
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: `${sidebarWidth}px`,
            height: '100vh',
            position: 'fixed',
            top: '64px',
            left: 0,
            borderRight: '1px solid #ccc',
            overflowY: 'auto',
            backgroundColor: '#f9f9f9',
          }}
        >
          {isLoading
            ? 'Loading...'
            : data.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    padding: '10px 14px',
                    backgroundColor: window.location.pathname.includes(item.notes_id)
                      ? '#efebe5'
                      : '#f9f9f9',
                    borderRadius: '11px',
                    margin: '8px',
                    '&:hover': {
                      backgroundColor: '#ececec',
                    },
                  }}
                  onClick={() => navigate(`/readNotes/${item.notes_id}`)}
                >
                  <ListItemText primary={item.title} />
                  <Typography variant="caption" display="block">
                    {item.des}
                  </Typography>
                </Box>
              ))}
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            marginLeft: `${sidebarWidth}px`,
            marginTop: '64px',
            padding: '24px',
            width: `calc(100vw - ${sidebarWidth}px)`,
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          <Outlet />
        </Box>
      </Box>
      </>
    );
}

export default Layout