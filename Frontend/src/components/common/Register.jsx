import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!data?.name || !data?.email || !data?.password) return alert("Please fill all fields");
    else {
      axios.post('http://localhost:8001/api/user/register', data)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message)
           
            navigate('/login')

          } 
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><h2>PostPro</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
              <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>Home</Link>
              <Link to={'/about'} style={{ color: 'black', textDecoration: 'none' }}>About</Link>
              <Link to={'/login'} style={{ color: 'black', textDecoration: 'none' }}>Login</Link>
              <Link to={'/register'} style={{ color: 'black', textDecoration: 'none' }}>Register</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container component="main" >
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ width: '200px' }}
              >
                Sign Up
              </Button>
            </Box>
            <Grid container>
              <Grid item style={{color:"white"}}>Have an account?
                <Link style={{ color: "blue" }} to={'/login'} variant="body2">
                  {" Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Register
