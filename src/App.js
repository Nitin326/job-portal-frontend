import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./componant/Home";
import UserRegistraton from "./componant/UserRegistraton";
import UserLogin from "./componant/UserLogin";
import NoPage from "./componant/NoPage";
import EmployerDashboard from "./componant/Employer/EmployerDashboard";
import EmployerJob from "./componant/Employer/EmployerJob";
import EmployeeDash from "./componant/employee/EmployeeDash";
import AppliedJobs from "./componant/employee/AppliedJobs";
import EmpProfile from "./componant/employee/EmpProfile";
import JobStatus from "./componant/Employer/JobStatus";
import Profile from "./componant/employee/profile";
import Resume from "./componant/employee/Resume";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<UserRegistraton />} />
            <Route exact path="/login" element={<UserLogin />} />
            <Route exact path="/employerdashboard" element={<EmployerDashboard />} />
            <Route exact path="/jobview" element={<EmployerJob />} />
            <Route exact path="/employeedashboard" element={<EmployeeDash />} />
            <Route exact path="/appliedjobs" element={<AppliedJobs />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/edit-profile" element={<EmpProfile />} />
            <Route exact path="/resume" element={<Resume />} />
            <Route exact path="/jobstatus" element={<JobStatus />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
