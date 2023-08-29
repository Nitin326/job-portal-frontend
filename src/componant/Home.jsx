import React from "react";
import "./assats/css/Home.css";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home_container">
        <div className="custom_btn">
          <Link to="/signup">
            <Button className="m-1" variant="primary">
              Signup
            </Button>
          </Link>
          <Link to="/login">
            <Button className="m-1" variant="primary">
              Login 
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
