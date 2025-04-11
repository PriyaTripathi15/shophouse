import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaHome, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-auto"> {/* ✅ mt-auto se niche chipkaya */}
      <Container>
        <Row className="gy-4">
          {/* Shop-House Info */}
          <Col md={4} className="text-center text-md-start">
            <Link to="/" className="d-flex align-items-center justify-content-center justify-content-md-start">
             <FaHome/>
              <span className="fw-bold fs-5">Shop-House</span>
            </Link>
            <p className="mt-2 text-secondary">Shop for Family</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="text-center">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column align-items-center gap-2"> 
              <li>
                <Link 
                  to="/" 
                  className="text-secondary text-decoration-none" 
                  style={{
                    fontSize: '16px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="text-secondary text-decoration-none"
                  style={{
                    fontSize: '16px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-secondary text-decoration-none"
                  style={{
                    fontSize: '16px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                >
                  Login
                </Link>
              </li>
            </ul>
          </Col>

          {/* Social Media */}
          <Col md={4} className="text-center text-md-end">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="#" className="text-secondary">
                <FaFacebook size={24} />
              </Link>
              <Link to="#" className="text-secondary">
                <FaInstagram size={24} />
              </Link>
              <Link to="#" className="text-secondary">
                <FaTwitter size={24} />
              </Link>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="mt-4">
          <Col className="text-center text-secondary">
            &copy; {currentYear} Shop-House. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
