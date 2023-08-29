import React, {useState} from "react";
import "../componant/assats/css/form.css";
import {Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './assats/css/toast.css';

const UserRegistraton = () => {
  const navigate = useNavigate();
  const notify = (string) => toast(string);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSignupData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user/signup", signupData)
      .then((response) => {
        const res = response.data;
        notify(res.message);
        setSignupData({
          name: "",
          email: "",
          role: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div style={{backgroundColor: "#282a36"}}>
      <ToastContainer />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card
              className="px-4"
              style={{
                backgroundColor: "#51556887",
                border: "none",
                color: "white",
              }}
            >
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h4 className="fw-bold mb-2 text-center">Sign Up</h4>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center text-light">
                          Name
                        </Form.Label>
                        <Form.Control
                          name="name"
                          className="form_input"
                          type="text"
                          placeholder="Enter Name"
                          required
                          value={signupData.name}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center text-light">
                          Email address
                        </Form.Label>
                        <Form.Control
                          name="email"
                          className="form_input"
                          type="email"
                          placeholder="Enter email"
                          required
                          value={signupData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Role">
                        <Form.Label className="text-center text-light">
                          Role
                        </Form.Label>
                        <Form.Select
                          className="form_input"
                          aria-label="Default select example"
                          name="role"
                          onChange={handleChange}
                        >
                          <option style={{display: "none"}}>
                            Select user Role
                          </option>
                          <option value="employer">employer</option>
                          <option value="employee">employee</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="text-light">Password</Form.Label>
                        <Form.Control
                          name="password"
                          className="form_input"
                          type="password"
                          placeholder="Password"
                          required
                          value={signupData.password}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign Up
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account ?
                        <Link to="/login" className="text-light fw-bold m-2">
                          LogIn
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserRegistraton;
