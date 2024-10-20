import React from 'react';
import AllUsers from './AllUsers';
import AllBlogs from '../admin/AllBlogs';
import {Typography,  Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const AdminHome = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Navigate back to login page
        navigate('/login');
     };
  
   return (
      <Container>
         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" gutterBottom style={{color:"white"}}>
               Admin Dashboard
            </Typography>
            {/* Logout Button */}
            {/* <Button variant="contained" color="secondary" onClick={handleLogout}> */}
            <Button onClick={handleLogout} size='sm' variant='outline-danger'>Log Out</Button >

               {/* Logout
            </Button> */}
         </Box>

         {/* Section for managing users */}
         <Typography variant="h4" gutterBottom style={{color:"black"}}>
            Manage Users
         </Typography>
         <AllUsers />

         {/* Section for managing blogs */}
         <Typography variant="h4" gutterBottom style={{color:"black"}}>
            Manage Blogs
         </Typography>
         <AllBlogs />
      </Container>
   );
};

export default AdminHome;
