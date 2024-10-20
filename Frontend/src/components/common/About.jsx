import React from 'react'
import { Container, Nav, Navbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import p1 from '../../Images/blogg1.jpeg'

const About = () => {

   return (
      <div>
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

         <Container>
            <div className='about-content'>
               <div className="left-content">
                  <h3 style={{color:"black"}}>PostPro</h3>
                  <p style={{color:"white"}}>Post Pro is a user-friendly blogging platform designed for everyone, whether you're a beginner or an experienced writer. You can easily share your blogs and track how many people are reading them and like them. It’s a great way to share your ideas and connect with others online!</p>
                  <Button className='m-2' variant='outline-warning' size='lg'><Link to={'/register'} style={{ color: 'black', textDecoration: 'none' }}>Learn More!</Link></Button>

               </div>
               <div className="right-content swing">
                  <img src={p1} alt="flim" />
               </div>
            </div>
            <div className='about-content'>
               <div className="right-content swing">
                  <img src={p1} alt="flim" />
               </div>
               <div className="left-content">
                  <h3 style={{color:"black"}}>Contact Us:</h3>
                  <p style={{color:"white"}}>Email: PostPro@gmail.com <br></br>Ph no: 777-888-9999-333 <br></br>Address: AndhraPradesh,India</p>
                  <Button className='m-2' variant='outline-warning' size='lg'><Link to={'/register'} style={{ color: 'black', textDecoration: 'none' }}>Learn More!</Link></Button>

               </div>

            </div>


         </Container>
      </div>
   )
}

export default About
