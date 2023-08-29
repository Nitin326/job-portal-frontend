import {Nav, Container, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import "../assats/css/employee.css";
import {useState, useEffect} from "react";
import NoPage from "../NoPage";

function EmployeeAppBar() {
  const navigation = useNavigate();

  const [login, setLogin] = useState(false);

  const removeToken = () => {
    localStorage.removeItem("authToken");
    navigation("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLogin(true);
    }
  },[]);

  return (
    <>
      {login && (
        <Navbar
          collapseOnSelect
          expand="lg"
          className="bg-body-tertiary"
          bg="dark"
          data-bs-theme="dark"
        >
          <Container>
            <Navbar.Brand>
              <Link className="brand_name" to="/">
                Art2Hire
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav_links">
                <Link className="links" to="/employeedashboard">
                  All Jobs
                </Link>
                <Link className="links" to="/edit-profile">
                  Update Profile
                </Link>
                <Link className="links" to="/appliedjobs">
                  Applied Jobs
                </Link>
                <button className="btn_link" onClick={removeToken}>
                  logout
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}
export default EmployeeAppBar;
