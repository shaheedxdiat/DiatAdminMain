import React, { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CourseOpt = () => {
  const navigate = useNavigate();
  const { c_id } = useParams();
  const [studentId, setStudentId] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleNewRegistrationclick = () => {
    navigate(`/course/${c_id}/register`);
  };

  const handleSearchInput=(e)=>{
    setShowWarning(false)
      setStudentId(e.target.value)
  }

  const handleSearchClick = () => {
    if (studentId.trim() === '') {
      setShowWarning(true);
    } else {

      navigate(`/student/${studentId}`)
       }
  };

  const handlebackClick = () => {
    navigate(`/course`);
  };

  return (
  
<div>
<div
        style={{
          width: "100%",
          padding: "40px",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Button variant="outline-primary" onClick={handlebackClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>{" "}
          Back
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '25px', alignItems: 'center', height: '80vh' }}>
      <div style={{ maxWidth: '350px' }}>
        <InputGroup size="lg" className="mb-3">
          <Form.Control
            placeholder="Student id"
            aria-describedby="basic-addon2"
            value={studentId}
            onChange={handleSearchInput}
          />
          <Button variant="primary" id="button-addon2" onClick={handleSearchClick}>
            Search
          </Button>
        </InputGroup>
        {showWarning && <p style={{ color: 'red' }}>Please enter a student id for search</p>}
      </div>
      <Button variant="success" onClick={handleNewRegistrationclick}>
        New Registration <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
</svg>
      </Button>
      
    </div>
</div>

   
  );
};

export default CourseOpt;
