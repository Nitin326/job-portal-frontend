import React, {useState} from "react";
import "../componant/assats/css/form.css";
import {Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const navigate = useNavigate();

  // tostify alert for successful login
  const notify = (string) => toast(string);

  // user login data state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", loginData)
      .then((response) => {
        const res = response.data;
        const message = res.message;
        setLoginData({
          email: "",
          password: "",
        });
        notify(message);
        const token = res.token;
        localStorage.setItem("authToken", token); // store the token in localStorage
        const decode = jwt_decode(token); // token decode to get the role
        if (decode.role === "employee") {
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else if (decode.role === "employer") {
          setTimeout(() => {
            navigate("/employerdashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  return (
    <>
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
                    <h4 className="fw-bold mb-2 text-center">Log In</h4>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center text-light">
                            Email address
                          </Form.Label>
                          <Form.Control
                            className="form_input"
                            type="email"
                            placeholder="Enter email"
                            required
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label className="text-light">
                            Password
                          </Form.Label>
                          <Form.Control
                            className="form_input"
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        ></Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            LogIn
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Not have an account ?
                          <Link to="/signup" className="text-light fw-bold m-2">
                            SignUp
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
    </>
  );
};

export default UserLogin;
