import React, {useState, useEffect} from "react";
import {Navbar, Nav, Button, Container, Modal, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import "../assats/css/employer.css";
import axios from "axios";
import NoPage from "../NoPage";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployerAppbar = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLogin(true);
    }
  },[]);

  const notify = (string) => toast(string);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const [jobdata, setJobData] = useState({
    companyname: "",
    position: "",
    description: "",
    phone: "",
    yearofexp: "",
    technology: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setJobData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post("http://localhost:5000/employeer/job", jobdata, {headers})
        .then((response) => {
          const res = response.data;
          const message = res.message;
          notify(message);
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        })
        .catch((error) => {
          navigate("/*");
        });
      toggleShow();
    }
  };

  // Remove the token and logout
  const removeToken = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

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
              <Nav className="nav_btns">
                <button className="btn_link" onClick={toggleShow}>
                  Create Job
                </button>
                <button className="btn_link" onClick={removeToken}>
                  logout
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      {/* for display the toast message */}
      <ToastContainer />

      {/* Model for create new Job*/}
      <Modal className="modal_container" show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center text-light">
                Company Name
              </Form.Label>
              <Form.Control
                className="form_input"
                type="text"
                placeholder="Enter Company Name"
                required
                name="companyname"
                value={jobdata.companyname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center text-light">
                Position
              </Form.Label>
              <Form.Control
                className="form_input"
                type="text"
                placeholder="Enter Position Name"
                required
                name="position"
                value={jobdata.position}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center text-light">
                Description
              </Form.Label>
              <Form.Control
                className="form_input"
                type="text"
                placeholder="Enter Company Description"
                required
                name="description"
                value={jobdata.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center text-light">Phone</Form.Label>
              <Form.Control
                className="form_input"
                type="text"
                placeholder="Enter Phone Number"
                required
                name="phone"
                value={jobdata.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center text-light">
                Experience
              </Form.Label>
              <Form.Control
                className="form_input"
                type="text"
                placeholder="Enter Experience"
                required
                name="yearofexp"
                value={jobdata.yearofexp}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center text-light">
                Technology
              </Form.Label>
              <Form.Control
                className="form_input"
                type="text"
                placeholder="Enter Technology Name"
                required
                name="technology"
                value={jobdata.technology}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployerAppbar;
