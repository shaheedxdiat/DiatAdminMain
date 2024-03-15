import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import lxlogo from "../assests/images/DIAT_20240307_213038-removebg-preview.png";
import AdminTitle from "../components/AdminTitle";


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
    <AdminTitle/>
      <div
        style={{
          width: "100%",
          padding: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={lxlogo} alt="" height={120}/>
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
            style={{border:"2px solid rgb(71, 99, 255"}}
              placeholder="Student id"
              aria-describedby="basic-addon2"
              // value={studentId}
              defaultValue={c_id}
              onChange={handleSearchInput}
              onKeyPress={(e) => {
                e.key === "Enter" && handleSearchClick();
              }}
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
        <Button variant="primary" style={{padding:"10px 100px"}} onClick={handleNewRegistrationclick}>
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
        <Button variant="primary" style={{padding:"10px 121px"}} onClick={()=>{navigate(`/course/${c_id}/list`)}}>
          Student List{" "}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z"/>
</svg>
        </Button>
      </div>
    </div>
  );
};

export default CourseOpt;
