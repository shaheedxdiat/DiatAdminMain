import React, { useEffect, useState } from "react";
import { supabase } from "../SupaBase";
import {  useNavigate } from "react-router-dom";

import { Form,  Row, Col,  Button,Modal } from "react-bootstrap";
import logo from "../assests/images/DIAT_LOGO_1.png";
import lxlogo from "../assests/images/DIAT_20240307_213038-removebg-preview.png";
import AdminTitle from "../components/AdminTitle";


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
  
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
       
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
      })

      return () => subscription.unsubscribe()
    }, [])

    const handleAdminClick=()=>{
      navigate("/insight")
    }


  return (
    <div style={{height:"100vh",width:"100%",overflow:"hidden" }}>
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
            supabase.auth.signOut();
            localStorage.removeItem("admin")

          }}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{width:"100px"}}></div>
         
     
      {/* <img src={logo} height="80px" alt="" /> */}
      <Button variant="danger"
   
        onClick={handleShow}
      >
        Logout
      </Button>
    </div>
    <AdminTitle/>
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
          <img src={lxlogo} alt="" width={"250px"} />
        </Col>
        <Col md={4} xs={6}>
          <Form.Select
            onChange={(e) => {
              setselectedCourse(e.target.value);
              setShowWarning(false); 
            }}
            aria-label="Default select example"
            style={{ maxWidth: "300px" }}
          >
            <option> Select a Course </option>
            {course?.map((course) => (
              <option key={course.courses_id} value={course.courses_id}>
                {course.course_name}
              </option>
            ))}
          </Form.Select>
          {showWarning && (
            <p style={{ color: "red" }}>Please Select a Course.</p>
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
          <Button variant="secondary" style={{position:"fixed", bottom:"40px" ,left:"40px" ,fontSize:"18px"}} onClick={handleAdminClick}>Admin</Button>
          {/* <a style={{position:"fixed", bottom:"40px" ,left:"40px" ,fontSize:"20px"}} href="/insight"> Admin</a> */}
        </Col>
      </Row>
    </div>
  ); 
};

export default SelectCourse;
