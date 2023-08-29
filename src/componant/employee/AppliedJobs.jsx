import React, {useState, useEffect} from "react";
import axios from "axios";
import EmployeeAppBar from "./EmployeeAppbar";
import AppliedJobCard from "./appliedJob";
import "../assats/css/employee.css";

const AppliedJobs = () => {
  const [appliedJob, setappliedJob] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:5000/employee/appliedjobs", {headers})
        .then((response) => {
          const res = response.data;
          setappliedJob(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, []);

  return (
    <>
      <EmployeeAppBar />
      {appliedJob.length > 0 ? (
        <div className="card-container">
          {appliedJob.map((val, index) => (
            <div key={index}>
              <AppliedJobCard
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
          <h5 className="text-light text-center">No Applied Job Is Found!</h5>
        </div>
      )}
    </>
  );
};

export default AppliedJobs;
