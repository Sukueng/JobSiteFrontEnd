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
        <Navbar.Brand href="/" className='me-5' style={{ fontWeight: 'bold', fontSize: '2rem' }}>Job <span className='text-primary'>Portal</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ fontWeight: 'bold',fontSize:'1.2rem',color: isActive('/') }}>Home</Nav.Link>
            
          </Nav>
          <Nav>
            <div className='d-sm-flex justify-content-between'>
           
            <Nav.Link href={localStorage.getItem("uname") != null ? "/" : "/userlogin"} style={{ fontWeight: 'bold',fontSize:'1.2rem',color: isActive('/userlogin') }}>Get Job</Nav.Link>

              <Nav.Link eventKey={2} href={localStorage.getItem("Companyname") != null ? "/companyDashboard" : "/company"} style={{ fontWeight: 'bold',fontSize:'1.2rem' ,color: isActive('/company')}}>Post a Job</Nav.Link>
            </div>
          </Nav>

          {localStorage.getItem("Companyname") != null ? <NavDropdown className='ms-lg-2' style={{ color: 'orange', fontWeight: 'bold' }} title={localStorage.getItem("Companyname")} id="navbarScrollingDropdown">
            <NavDropdown.Item className='text-center' href="#action3" onClick={() => clearlocal()}>Logout</NavDropdown.Item>
            <NavDropdown.Item className='text-center' href="/editprofile" >Edit</NavDropdown.Item>

          </NavDropdown> : ""}

          {localStorage.getItem("uname") != null ? <NavDropdown className='ms-lg-2' style={{ color: 'orange', fontWeight: 'bold' }} title={localStorage.getItem("uname")} id="navbarScrollingDropdown">
            <NavDropdown.Item className='text-center' href="#action3" onClick={() => clearlocal()}>Logout</NavDropdown.Item>
            <NavDropdown.Item className='text-center'  href="/editprofile">Edit</NavDropdown.Item>
          </NavDropdown> : ""}


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;