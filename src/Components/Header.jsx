import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();


  const isActive = (path) => {
    return location.pathname === path ? 'red' : 'black';
  };

  const clearlocal = () => {
    localStorage.removeItem("Companyname")
    localStorage.removeItem("_id")
    localStorage.removeItem("uname")
    localStorage.removeItem("uemail")
    localStorage.removeItem("type")
    navigate("/")
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className='me-5' style={{ fontWeight: 'bold', fontSize: '2rem' }}>Job <span className='text-primary'>Portal</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: isActive('/') }}>Home</Nav.Link>
          </Nav>
          <Nav>
            <div className='d-sm-flex justify-content-between'>
              <Nav.Link as={Link} to={localStorage.getItem("uname") != null ? "/" : "/userlogin"} style={{ fontWeight: 'bold', fontSize: '1.2rem', color: isActive('/userlogin') }}>Get Job</Nav.Link>
              <Nav.Link as={Link} to={localStorage.getItem("Companyname") != null ? "/companyDashboard" : "/company"} style={{ fontWeight: 'bold', fontSize: '1.2rem', color: isActive('/company') }}>Post a Job</Nav.Link>
            </div>
          </Nav>
          {localStorage.getItem("Companyname") != null ? 
            <NavDropdown className='ms-lg-2' style={{ color: 'orange', fontWeight: 'bold' }} title={localStorage.getItem("Companyname")} id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/" className='text-center' onClick={() => clearlocal()}>Logout</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/editprofile" className='text-center'>Edit</NavDropdown.Item>
            </NavDropdown> 
            : ""
          }
          {localStorage.getItem("uname") != null ? 
            <NavDropdown className='ms-lg-2' style={{ color: 'orange', fontWeight: 'bold' }} title={localStorage.getItem("uname")} id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/" className='text-center' onClick={() => clearlocal()}>Logout</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/editprofile" className='text-center'>Edit</NavDropdown.Item>
            </NavDropdown> 
            : ""
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;