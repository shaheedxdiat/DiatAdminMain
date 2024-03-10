import React, { useEffect, useState } from "react";
import { supabase } from "../SupaBase";
import {  useNavigate } from "react-router-dom";

import { Form,  Row, Col,  Button,Modal } from "react-bootstrap";
import logo from "../assests/images/DIAT_20240307_213038-removebg-preview.png";
// import NavBar from "../components/NavBar";

const SelectCourse = () => {
  const [course, setcourse] = useState([]);
  const [selectedCourse, setselectedCourse] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCourses = async () => {
      let { data: courses, error } = await supabase.from("courses").select("*");
      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }
      setcourse(courses);
    };

    getCourses();
  }, []);

  const handleNextClick = () => {
    if (selectedCourse === ""||selectedCourse==="Select a course") {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      navigate(`/course/${selectedCourse}`);
    }
  };

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // const [session, setSession] = useState(null)

  

    const handlebackClick=()=>{
      navigate(-1)
    }
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        // setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        // setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])


  return (
    <div>
      <div className="nav_container">

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo,Confirm Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{
            supabase.auth.signOut()
          }}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <button disabled className="NavBackBtn" onClick={handlebackClick} ><svg xmlns="http://www.w3.org/2000/svg" width="26" height="36" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>
 Back</button>
      <img src={logo} height="50px" alt="" />
      {/* <h6 style={{ color: "gray" }}>name</h6> */}
      <Button variant="danger"
        // onClick={async () => {
        //   supabase.auth.signOut();console.log("logout clicked");;
        // }}
        onClick={handleShow}
      >
        Logout
      </Button>
    </div>
      <Row
        style={{
          borderRadius: "15px",
          justifyContent: "center",
          alignItems: "center",
          padding: "150px 10px 30px 10px",
          gap: "50px",
        }}
      >
        <Col
          md={4}
          xs={6}
          style={{
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="" width={"250px"} />
        </Col>
        <Col md={4} xs={6}>
          <Form.Select
            onChange={(e) => {
              setselectedCourse(e.target.value);
              setShowWarning(false); // Hide warning when selecting an option
            }}
            aria-label="Default select example"
            style={{ maxWidth: "300px" }}
          >
            <option> Select a course </option>
            {course?.map((course) => (
              <option key={course.courses_id} value={course.courses_id}>
                {course.course_name}
              </option>
            ))}
          </Form.Select>
          {showWarning && (
            <p style={{ color: "red" }}>Please select a course.</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleNextClick}>
            Next{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SelectCourse;
