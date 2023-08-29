import React from "react";
import CardImg from "../assats/card.png";
import {Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import "../assats/css/employee.css";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppliedJobCard(props) {
  const notify = (string) => toast(string);

  const handleStatusCheck = (event) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const jobid = event.target.id;
      axios
        .get(`http://localhost:5000/employee/jobstatus/${jobid}`, {headers})
        .then((response) => {
          const res = response.data;
          const message = res.message;
          notify(message);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  return (
    <>
      <div style={{maxWidth:'100%',padding:'20px'}}>
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
                <div className="card_btns">
                  <button
                    className="btn_link"
                    id={props.jobId}
                    onClick={handleStatusCheck}
                  >
                    View Application Status
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

export default AppliedJobCard;
