import React, {useState, useEffect} from "react";
import "../assats/css/employer.css";
import {useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import {Card, Col, Row, Modal, Form, Button} from "react-bootstrap";
import CardImg from "../assats/card.png";
import BackArrow from "../assats/back-arrow.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployerJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedJob = location.state;

  const notify = (string) => toast(string);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const [jobdata, setJobData] = useState({
    companyname: receivedJob.companyname,
    position: receivedJob.position,
    description: receivedJob.description,
    phone: receivedJob.phone,
    yearofexp: receivedJob.yearofexp,
    technology: receivedJob.technology,
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setJobData((prevFormData) => ({
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
      const id = receivedJob.id;
      axios
        .get(`http://localhost:5000/employeer/job/${id}`, {headers})
        .then((response) => {
          const res = response.data;
          setJobData(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
    // eslint-disable-next-line
  }, []);

  const handleUpdateJob = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const id = receivedJob.id;
      axios
        .patch(`http://localhost:5000/employeer/job/${id}`, jobdata, {headers})
        .then((response) => {
          const res = response.data;
          notify(res.message);
          setJobData(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
      toggleShow();
    }
  };

  const handleStatusShow = (event) => {
    const id = event.currentTarget.id;
    navigate("/jobstatus", {state: id});
  };

  return (
    <>
      <div className="m-5">
        <Link to="/employerdashboard" className="text-light">
          <img
            className="m-2"
            alt="Job_image"
            src={BackArrow}
            width="20px"
            height="20px"
          />
          Back
        </Link>
      </div>
      <ToastContainer />
      <Card className="mb-3 emp_job_card">
        <Row className="g-0">
          <Col md={4}>
            <div className="job_card_img">
              <Card.Img src={CardImg} />
            </div>
          </Col>
          <Col md={8}>
            <Card.Body className="job_card_body">
              <Card.Title>{jobdata.companyname}</Card.Title>
              <Card.Text>{jobdata.position}</Card.Text>
              <Card.Text>{jobdata.description}</Card.Text>
              <div className="card_btns">
                <button className="btn_link" onClick={toggleShow}>
                  Edit Job
                </button>
                <button
                  className="btn_link"
                  id={jobdata.id}
                  onClick={handleStatusShow}
                >
                  View Application
                </button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Modal for Update the Job*/}
      <Modal className="modal_container" show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Update Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUpdateJob(e)}>
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
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
