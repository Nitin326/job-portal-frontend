import React, {useState} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const notify = (string) => toast(string);

  const navigate = useNavigate()

  const [file, setFile] = useState();

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);

      axios
        .post(`http://localhost:5000/employee/resume`, formData, {headers})
        .then((response) => {
          const res = response.data;
          const message = res.message;
          notify(message)
          setTimeout(() => {
            navigate('/employeedashboard')
          })
        },2000)
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="d-grid"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form className="m-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Control
              className="form_input"
              type="file"
              placeholder="Enter Resume"
              required
              name="file"
              onChange={onFileChange}
              style={{colo:'white'}}
            />
          </Form.Group>
          <Button className="m-auto" variant="primary" type="submit">
            upload
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Resume;
