import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation, Link} from "react-router-dom";
import {Table, Modal} from "react-bootstrap";
import BackArrow from "../assats/back-arrow.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mypdf from "../assats/nitin.pdf";

const JobStatus = () => {
  const location = useLocation();
  const receivedJobId = location.state;
  const notify = (string) => toast(string);

  const [jobStatus, setJobStatus] = useState([]);

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const id = receivedJobId;
      axios
        .get(`http://localhost:5000/employeer/job/status/${id}`, {headers})
        .then((response) => {
          const res = response.data;
          setJobStatus(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
    // eslint-disable-next-line
  }, []);

  const handleAcceptStatus = (e) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const jobId = receivedJobId;
      const empId = e.target.id;
      console.log("JobId", jobId);
      console.log("Empid", empId);
      const data = {
        jobId: jobId,
        empId: empId,
      };
      axios
        .post(
          `http://localhost:5000/employeer/job/accept/${jobId}/${empId}`,
          {params: data},
          {
            headers,
          }
        )
        .then((response) => {
          const res = response.data;
          console.log(res);
          const message = res.message;
          notify(message);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  const[resumeData, setResumeData] = useState({
    empName:'',
    fileName:''
  })
  
  const handleShowResume = (e) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const id = e.target.id;
      axios
        .get(`http://localhost:5000/employeer/resume/${id}`, {headers})
        .then((response) => {
          const res = response.data;
          const resumeanme = res.data;
          setResumeData({
            empName : res.name,
            fileName : resumeanme.resume
          })
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }

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

      <div className="dashboard">
        <ToastContainer />
        {jobStatus.length > 0 ? (
          <div>
            <h5 className="text-center text-light m-5">
              Applicants for this Job
            </h5>
            <Table className="jobs_table text-center" variant="dark">
              <thead className="jobs_table_head">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Resume</th>
                  <th>Proposal</th>
                </tr>
              </thead>
              <tbody>
                {jobStatus.map((emp, index) => {
                  return (
                    <tr key={index}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>
                        <button
                          className="btn_link"
                          id={emp.id}
                          onClick={(e) => {toggleShow(e);handleShowResume(e)}}
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn_link"
                          id={emp.id}
                          onClick={handleAcceptStatus}
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="no_job_text">
            <h4> No Applicants for Job Found! </h4>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        size="lg"
        className="my-modal"
        show={show}
        onHide={toggleShow}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Resume - {resumeData.empName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            title="My_Resume"
            src = {mypdf}
            width="100%"
            className="my-frame"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobStatus;
