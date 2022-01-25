import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
//import { NavLink } from 'react-router-dom'
//import "./NavBar.css"

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/heroes">List</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;