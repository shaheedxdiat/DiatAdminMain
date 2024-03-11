import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const CourseOpt = () => {
  const navigate = useNavigate();
  const { c_id } = useParams();
  const [studentId, setStudentId] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleNewRegistrationclick = () => {
    navigate(`/course/${c_id}/register`);
  };

  const handleSearchInput = (e) => {
    setShowWarning(false);
    setStudentId(e.target.value);
  };

  const handleSearchClick = () => {
    if (studentId.trim() === "") {
      setShowWarning(true);
    } else {
      navigate(`/course/${c_id}/student/${studentId}`);
    }
  };

 

  return (
    <div>
    <NavBar/>
      <div
        style={{
          width: "100%",
          padding: "40px",
          display: "flex",
          justifyContent: "start",
        }}
      >
        
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "",
          gap: "25px",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div style={{ maxWidth: "350px" }}>
          <InputGroup size="lg" className="mb-3">
            <Form.Control
              placeholder="Student id"
              aria-describedby="basic-addon2"
              // value={studentId}
              defaultValue={c_id}
              onChange={handleSearchInput}
            />
            <Button
              variant="primary"
              id="button-addon2"
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </InputGroup>
          {showWarning && (
            <p style={{ color: "red" }}>Please enter a student id for search</p>
          )}
        </div>
        <Button variant="success" onClick={handleNewRegistrationclick}>
          New Registration{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-person-plus-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            <path
              fillRule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default CourseOpt;
