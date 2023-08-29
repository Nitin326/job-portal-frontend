import React, {useState, useEffect} from "react";
import {Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import EmployeeAppBar from "./EmployeeAppbar";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();

  const notify = (string) => toast(string);

  const [personalInfo, setPersonalInfo] = useState({
    phone: "",
    location: "",
  });
  const [eductionInfo, setEducationInfo] = useState({
    eduname: "",
    percentage: "",
    course: "",
    duration: "",
  });
  const [workExpInfo, setWorkExpInfo] = useState({});
  const [projectInfo, setProjectInfo] = useState({});

  const handleChangepersonalInfo = (e) => {
    const {name, value} = e.target;
    setPersonalInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeeductionInfo = (e) => {
    const {name, value} = e.target;
    setEducationInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeworkExpInfo = (e) => {
    const {name, value} = e.target;
    setWorkExpInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeprojectInfo = (e) => {
    const {name, value} = e.target;
    setProjectInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:5000/employee/profile", {headers})
        .then((response) => {
          const res = response.data;
          if (res.status === 200) {
            navigate("/employeedashboard");
            alert("Profile Already Created");
          } else {
            navigate("/profile");
          }
        })
        .catch((error) => {
          console.log(" my custom erroe");
        });
    }
  }, []);

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const profiledata = {
        phone: "",
        education: [],
        workExperience: [],
        projects: [],
        location: "",
      };

      profiledata.phone = personalInfo.phone;
      profiledata.location = personalInfo.location;
      profiledata.education.push(eductionInfo);
      profiledata.workExperience.push(workExpInfo);
      profiledata.projects.push(projectInfo);

      axios
        .post(`http://localhost:5000/employee/profile`, profiledata, {headers})
        .then((response) => {
          const res = response.data;
          const message = res.message;
          notify(message);
          setTimeout(() => {
            navigate("/resume");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  return (
    <>
      <div style={{backgroundColor: "#282a36"}}>
        <ToastContainer />
        <Container className="p-5">
          <h4 className="text-center text-light">Create Profile</h4>
          <Form onSubmit={handleSubmitProfile}>
            <Row>
              <Col md={6}>
                <Card
                  className="px-4 m-4"
                  style={{
                    backgroundColor: "#51556887",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Card.Body>
                    <h4 className="fw-bold mb-4 text-center">
                      Personal Information
                    </h4>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Name
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Name"
                        required
                        name="name"
                        value="******"
                        disabled
                      />
                    </Form.Group>
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
                        value="******"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Phone
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Name"
                        required
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChangepersonalInfo}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="text-light">Location</Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="location"
                        required
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChangepersonalInfo}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card
                  className="px-4 m-4"
                  style={{
                    backgroundColor: "#51556887",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Card.Body>
                    <h4 className="fw-bold mb-4 text-center">
                      Educational Information
                    </h4>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Education Name
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Education"
                        required
                        name="eduname"
                        value={eductionInfo.eduname}
                        onChange={handleChangeeductionInfo}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Percentage
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Percentage"
                        required
                        name="percentage"
                        value={eductionInfo.percentage}
                        onChange={handleChangeeductionInfo}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Course
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Course"
                        required
                        name="course"
                        value={eductionInfo.course}
                        onChange={handleChangeeductionInfo}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Duration
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Duration"
                        required
                        name="duration"
                        value={eductionInfo.duration}
                        onChange={handleChangeeductionInfo}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card
                  className="px-4 m-4"
                  style={{
                    backgroundColor: "#51556887",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Card.Body>
                    <h4 className="fw-bold mb-4 text-center">
                      Work-Experience Detail
                    </h4>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Work Experience Name
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Work Experience"
                        required
                        name="workexpname"
                        value={workExpInfo.workexpname}
                        onChange={handleChangeworkExpInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Role
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Role"
                        required
                        name="role"
                        value={workExpInfo.role}
                        onChange={handleChangeworkExpInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Duration
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Duration"
                        required
                        name="duration"
                        value={workExpInfo.duration}
                        onChange={handleChangeworkExpInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Technology
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Technology"
                        required
                        name="technology"
                        value={workExpInfo.technology}
                        onChange={handleChangeworkExpInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Description
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Description"
                        required
                        name="description"
                        value={workExpInfo.description}
                        onChange={handleChangeworkExpInfo}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card
                  className="px-4 m-4"
                  style={{
                    backgroundColor: "#51556887",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Card.Body>
                    <h4 className="fw-bold mb-4 text-center">
                      Project Information
                    </h4>
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Project Name
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Project Name"
                        required
                        name="projectname"
                        value={projectInfo.projectname}
                        onChange={handleChangeprojectInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Duration
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Duration"
                        required
                        name="duration"
                        value={projectInfo.duration}
                        onChange={handleChangeprojectInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        description
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Description"
                        required
                        name="description"
                        value={projectInfo.description}
                        onChange={handleChangeprojectInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Link
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Link"
                        required
                        name="links"
                        value={projectInfo.links}
                        onChange={handleChangeprojectInfo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label className="text-center text-light">
                        Technology
                      </Form.Label>
                      <Form.Control
                        className="form_input"
                        type="text"
                        placeholder="Enter Technology"
                        required
                        name="technology"
                        value={projectInfo.technology}
                        onChange={handleChangeprojectInfo}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mx-auto" md={3}>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Create
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Profile;
