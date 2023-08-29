import React, {useState, useEffect} from "react";
import EmployeeAppBar from "./EmployeeAppbar";
import axios from "axios";
import JobCard from "./job-card";
import "../assats/css/employee.css";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeDash = () => {
  const [AllJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:5000/employee/alljobs", {headers})
        .then((response) => {
          const resp = response.data;
          const res = resp.data;
          setAllJobs(res);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, []);

  return (
    <>
      <EmployeeAppBar />
      <ToastContainer/>
      {AllJobs.length > 0 ? (
        <div className="card-container">
          {AllJobs.map((val, index) => (
            <div key={index}>
              <JobCard
                companyname={val.companyname}
                email={val.email}
                description={val.description}
                position={val.position}
                yearofexp={val.yearofexp}
                technology={val.technology}
                jobId={val.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="m-5">
          <h4 className="text-light text-center">No Jobs Found!</h4>
        </div>
      )}
    </>
  );
};

export default EmployeeDash;
