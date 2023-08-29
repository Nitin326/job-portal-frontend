import React, {useEffect, useState} from "react";
import "../assats/css/employer.css";
import EmployerAppBar from "./EmployerAppbar";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployerDashboard() {

  const navigate = useNavigate();

  const notify = (string) => toast(string);

  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:5000/employeer/alljob", {headers})
        .then((response) => {
          const res = response.data;
          setJobs(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, []);

  // Delete the Job
  const handleJobDelete = (e) => {
    const token = localStorage.getItem("authToken");
    const id = e.currentTarget.id;
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(`http://localhost:5000/employeer/job/${id}`, {headers})
        .then((response) => {
          const res = response.data;
          const message = res.message;
          console.log(message);
          notify(message);
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  // function for view the job details
  const handleViewJob = (e) => {
    const token = localStorage.getItem("authToken");
    const id = e.currentTarget.id;
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`http://localhost:5000/employeer/job/${id}`, {headers})
        .then((response) => {
          const res = response.data;
          const jobToSend = res.data;
          navigate("/jobview", {state: jobToSend});
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  return (
    <>
      <div className="dashboard">
        <EmployerAppBar />
        <ToastContainer />
        {Jobs.length > 0 ? (
          <div>
            <h5 className="text-center text-light m-5">Jobs Created by Employer</h5>
            <Table className="jobs_table text-center" variant="dark">
              <thead className="jobs_table_head">
                <tr>
                  <th>Company Name</th>
                  <th>Position</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {Jobs.map((job, index) => {
                  return (
                    <tr key={index}>
                      <td>{job.companyname}</td>
                      <td>{job.position}</td>
                      <td>
                        <button
                          className="btn_link"
                          id={job.id}
                          onClick={handleJobDelete}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn_link"
                          id={job.id}
                          onClick={handleViewJob}
                        >
                          View
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
            <h4> No Job Created by Employer! </h4>
          </div>
        )}
      </div>
    </>
  );
}

export default EmployerDashboard;
