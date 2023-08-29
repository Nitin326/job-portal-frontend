import React from "react";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import CardImg from "../assats/card.png";
import "../assats/css/employee.css";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobCard(props) {
  const notify = (string) => toast(string);

  const handleApplyJob = (event) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const id = event.target.id;
      console.log(id);
      axios
        .post(
          `http://localhost:5000/employee/apply/${id}`,
          {params: id},
          {headers}
        )
        .then((response) => {
          const res = response.data;
          console.log(res)
          const message = res.message;
          notify(message);
        })
        .catch((err) => {
          console.log("private error message");
          console.error(err);
        });
    }
  };

  return (
    <>
      <div style={{maxWidth:'100%', padding:'20px'}}>
        <ToastContainer />
        <Card className="mb-3 job_card">
          <Row className="g-0">
            <Col md={4}>
              <div className="job_card_img">
                <Card.Img src={CardImg} alt="Job_image" />
              </div>
            </Col>
            <Col md={8}>
              <Card.Body className="job_card_body">
                <Card.Title>{props.companyname}</Card.Title>
                <Card.Text>{props.position}</Card.Text>
                <Card.Text>{props.email}</Card.Text>
                <Card.Text>{props.jobId}</Card.Text>
                <div className="card_btns">
                  <button
                    className="btn_link"
                    id={props.jobId}
                    onClick={handleApplyJob}
                  >
                    Apply for the Job
                  </button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default JobCard;
