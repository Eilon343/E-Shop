import React, { useContext } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Store } from '../store';

const Navbar = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  const location = useLocation();
  return (
    <NavBar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <NavBar.Brand>EShop</NavBar.Brand>
        </LinkContainer>
        {location.pathname !== '/' && (
          <LinkContainer to="/">
            <NavBar.Brand>Home</NavBar.Brand>
          </LinkContainer>
        )}
        <Nav className="ms-auto w-50 d-flex justify-content-end">
          <Link to="/cart" className="nav-link">
            <i className="fas fa-shopping-cart"> </i>
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
        </Nav>
      </Container>
    </NavBar>
  );
};

export default Navbar;
