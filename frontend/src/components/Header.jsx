import React from 'react';
import { Badge, Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { Link, Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success('Logout successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect className="py-3 shadow">
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <Image
              src={logo}
              alt="Shop-House Logo"
              roundedCircle
              height="100"
              className="me-2"
            />
            <span className="fw-bold fs-5 text-white">Shop-House</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex gap-3 align-items-center">

              {/* Cart */}
              <Link to="/cart" className="text-white position-relative d-flex align-items-center gap-1">
                <FaShoppingCart size={18} />
                <span className="fs-6">Cart</span>
                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg="success"
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 6px',
                      borderRadius: '50%',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Link>

              {/* Auth Options */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" className="text-white">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register" className="text-white fs-6">
                    <FaUser className="me-1" size={18} /> Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className="btn btn-outline-light px-3 py-1 rounded">
                    <FaUser className="me-1" size={18} /> Log In
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;