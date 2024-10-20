import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Login = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({
      email: '',
      password: '',
      role: 'user', // Default role set to user
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleRoleChange = (e) => {
      setData({ ...data, role: e.target.value }); // Set the role as user or admin
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!data.email || !data.password) {
         return alert('Please fill all fields');
      }

      // Determine the API endpoint based on the selected role
      const apiUrl = data.role === 'admin'
         ? 'http://localhost:8001/api/admin/login'
         : 'http://localhost:8001/api/user/login';

      axios.post(apiUrl, data)
         .then((res) => {
            if (res.data.token) {
               alert(res.data.message);

               // Store token and user data
               localStorage.setItem('token', res.data.token);
               localStorage.setItem('user', JSON.stringify(res.data.userData));

               // Redirect based on role
               if (data.role === 'admin') {
                  navigate('/adminhome');
               } else {
                  navigate('/userhome');
               }

               setTimeout(() => {
                  window.location.reload();
               }, 1000);
            } else {
               alert(res.data.message);
            }
         })
         .catch((err) => {
            if (err.response && err.response.status === 401) {
               alert("Login failed. Please check your credentials.");
            }
            navigate("/login");
         });
   };

   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>PostPro</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
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
            <Box sx={{ marginTop: 8, marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <Typography component="h1" variant="h5" style={{color:"black"}}>
                  Sign In
               </Typography>
               <Box component="form" onSubmit={handleSubmit} noValidate>
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

                  {/* Dropdown to select the role */}
                  <Box mt={2}>
                     <label>Select Role :</label>
                     <select value={data.role} onChange={handleRoleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                     </select>
                  </Box>

                  <Box mt={2}>
                     <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} style={{ width: '200px' }}>
                        Sign In
                     </Button>
                  </Box>

                  <Grid container>
                  <Grid item style={{color:"white"}}>forgot password?
                        <Link style={{ color: "red" }} to={'/forgotpassword'} variant="body2">
                           {" Click here"}
                        </Link>
                     </Grid>
                     <Grid item style={{color:"white"}}>Have an account?
                        <Link style={{ color: "blue" }} to={'/register'} variant="body2">
                           {" Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </>
   );
};

export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Navbar from 'react-bootstrap/Navbar';
// import { Container, Nav } from 'react-bootstrap';

// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';

// const Login = () => {
//    const navigate = useNavigate();
//    const [data, setData] = useState({
//       email: '',
//       password: '',
//       type: '' // Add type to store the user type (admin/user)
//    });

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setData({ ...data, [name]: value });
//    };

//    const handleSubmit = (e) => {
//       e.preventDefault();

//       if (!data?.email || !data?.password) {
//          return alert('Please fill all fields');
//       } else {
//          axios.post('http://localhost:8001/api/user/login', data)
//             .then((res) => {
//                if (res.data.success) {
//                   alert(res.data.message);

//                   localStorage.setItem('token', res.data.token);
//                   localStorage.setItem('user', JSON.stringify(res.data.userData));

//                   // Check user type and navigate accordingly
//                   const userType = res.data.userData.type;
//                   if (userType === 'admin') {
//                      navigate('/adminhome');
//                   } else {
//                      navigate('/userhome');
//                   }

//                   setTimeout(() => {
//                      window.location.reload();
//                   }, 1000);
//                } else {
//                   alert(res.data.message);
//                }
//             })
//             .catch((err) => {
//                if (err.response && err.response.status === 401) {
//                   alert("User doesn't exist");
//                }
//                navigate('/login');
//             });
//       }
//    };

//    return (
//       <>
//          <Navbar expand="lg" className="bg-body-tertiary">
//             <Container fluid>
//                <Navbar.Brand><h2>EasyPost</h2></Navbar.Brand>
//                <Navbar.Toggle aria-controls="navbarScroll" />
//                <Navbar.Collapse id="navbarScroll">
//                   <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
//                   <Nav>
//                      <Link to={'/'}>Home</Link>
//                      <Link to={'/about'}>About</Link>
//                      <Link to={'/login'}>Login</Link>
//                      <Link to={'/register'}>Register</Link>
//                   </Nav>
//                </Navbar.Collapse>
//             </Container>
//          </Navbar>

//          <Container component="main" >
//             <Box sx={{ marginTop: 8, marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                <Typography component="h1" variant="h5">
//                   Sign In
//                </Typography>
//                <Box component="form" onSubmit={handleSubmit} noValidate>
//                   <TextField
//                      margin="normal"
//                      fullWidth
//                      id="email"
//                      label="Email Address"
//                      name="email"
//                      value={data.email}
//                      onChange={handleChange}
//                      autoComplete="email"
//                      autoFocus
//                   />
//                   <TextField
//                      margin="normal"
//                      fullWidth
//                      name="password"
//                      value={data.password}
//                      onChange={handleChange}
//                      label="Password"
//                      type="password"
//                      id="password"
//                      autoComplete="current-password"
//                   />
//                   <Box mt={2}>
//                      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} style={{ width: '200px' }}>
//                         Sign In
//                      </Button>
//                   </Box>
//                   <Grid container>
//                      <Grid item>
//                         <Link style={{ color: 'red' }} to={'/forgotpassword'} variant="body2">
//                            Forgot password?
//                         </Link>
//                      </Grid>
//                      <Grid item>
//                         <Link style={{ color: 'blue' }} to={'/register'} variant="body2">
//                            {"Sign Up"}
//                         </Link>
//                      </Grid>
//                   </Grid>
//                </Box>
//             </Box>
//          </Container>
//       </>
//    );
// };

// export default Login;

// // import React, { useState } from 'react'
// // import { Link, useNavigate } from 'react-router-dom';
// // import Navbar from 'react-bootstrap/Navbar';
// // import { Container, Nav } from 'react-bootstrap';

// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import Grid from '@mui/material/Grid';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import axios from 'axios';

// // const Login = () => {
// //    const navigate = useNavigate()
// //    const [data, setData] = useState({
// //       name: "",
// //       email: "",
// //       password: "",
// //       type: ""
// //    })

// //    const handleChange = (e) => {
// //       const { name, value } = e.target;
// //       setData({ ...data, [name]: value });
// //    };

// //    const handleSubmit = (e) => {
// //       e.preventDefault();

// //       if (!data?.email || !data?.password) {
// //          return alert("Please fill all fields");
// //       } else {
// //          axios.post('http://localhost:8001/api/user/login', data)
// //             .then((res) => {
// //                if (res.data.success) {
// //                   alert(res.data.message)

// //                   localStorage.setItem("token", res.data.token);
// //                   localStorage.setItem("user", JSON.stringify(res.data.userData));
// //                   navigate('/userhome')
// //                   setTimeout(() => {
// //                      window.location.reload()
// //                   }, 1000)
// //                } else {
// //                   alert(res.data.message)
// //                }
// //             })
// //             .catch((err) => {
// //                if (err.response && err.response.status === 401) {
// //                   alert("User doesn't exist");
// //                }
// //                navigate("/login");
// //             });
// //       }
// //    };

// //    return (
// //       <>
// //          <Navbar expand="lg" className="bg-body-tertiary">
// //             <Container fluid>
// //                <Navbar.Brand><h2>EasyPost</h2></Navbar.Brand>
// //                <Navbar.Toggle aria-controls="navbarScroll" />
// //                <Navbar.Collapse id="navbarScroll">
// //                   <Nav
// //                      className="me-auto my-2 my-lg-0"
// //                      style={{ maxHeight: '100px' }}
// //                      navbarScroll
// //                   >
// //                   </Nav>
// //                   <Nav>
// //                      <Link to={'/'}>Home</Link>
// //                      <Link to={'/about'}>About</Link>
// //                      <Link to={'/login'}>Login</Link>
// //                      <Link to={'/register'}>Register</Link>
// //                   </Nav>

// //                </Navbar.Collapse>
// //             </Container>
// //          </Navbar>


// //          <Container component="main" >
// //             <Box
// //                sx={{
// //                   marginTop: 8,
// //                   marginBottom: 4,
// //                   display: 'flex',
// //                   flexDirection: 'column',
// //                   alignItems: 'center',
// //                }}
// //             >
               
// //                <Typography component="h1" variant="h5">
// //                   Sign In
// //                </Typography>
// //                <Box component="form" onSubmit={handleSubmit} noValidate>

// //                   <TextField
// //                      margin="normal"
// //                      fullWidth
// //                      id="email"
// //                      label="Email Address"
// //                      name="email"
// //                      value={data.email}
// //                      onChange={handleChange}
// //                      autoComplete="email"
// //                      autoFocus
// //                   />
// //                   <TextField
// //                      margin="normal"
// //                      fullWidth
// //                      name="password"
// //                      value={data.password}
// //                      onChange={handleChange}
// //                      label="Password"
// //                      type="password"
// //                      id="password"
// //                      autoComplete="current-password"
// //                   />
// //                   <Box mt={2}>
// //                      <Button
// //                         type="submit"
// //                         variant="contained"
// //                         sx={{ mt: 3, mb: 2 }}
// //                         style={{ width: '200px' }}
// //                      >
// //                         Sign Up
// //                      </Button>
// //                   </Box>
// //                   <Grid container>
// //                      <Grid item>forgot password?
// //                         <Link style={{ color: "red" }} to={'/forgotpassword'} variant="body2">
// //                            {" Click here"}
// //                         </Link>
// //                      </Grid>
// //                      <Grid item>Have an account?
// //                         <Link style={{ color: "blue" }} to={'/register'} variant="body2">
// //                            {" Sign Up"}
// //                         </Link>
// //                      </Grid>
// //                   </Grid>
// //                </Box>
// //             </Box>
// //          </Container>
// //       </>
// //    )
// // }

// // export default Login

