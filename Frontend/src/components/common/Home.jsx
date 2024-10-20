import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import Home2 from '../user/Home'
const Home = () => {
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

         <div id='home-container' className='first-container front'>
            <div className="content-home">
               <p>"Unleash Your Creativity and Connect with the World <br /> Start Blogging with Post Pro Today!"</p>
               <Button className='m-2' variant='outline-warning' size='lg'><Link to={'/register'} style={{ color: 'black', textDecoration: 'none' }}>Post Blog Now!</Link></Button>
            </div>
         </div>

         <Container className="">
            <h2 className="text-center my-4" style={{color:"black",textDecoration:"underline"}}>Blogs to Show</h2>
            <div>
               <Home2 />
            </div>
         </Container>
      </>
   )
}

export default Home