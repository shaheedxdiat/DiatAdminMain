import React, { useEffect, useState } from "react";
import "../assests/styles/NavBar.css";
import logo from "../assests/images/DIAT_LOGO_1.png";
import { Button, Modal } from "react-bootstrap";
import { supabase } from "../SupaBase";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlebackClick = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate("/course");
  };

  return (
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
          <Button
            variant="danger"
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <div><button
        className="NavBackBtn"
        onClick={handlebackClick}
        style={{ border: "none",  padding:"0px 12px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="36"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
        Back
      </button>
      <button
          className="NavBackBtn"
          onClick={handleHomeClick}
          style={{
            border: "none",
            // color: "wheat",
            padding:"12px"
          //  width:"1"
          }}
        >
          Home
        </button>
        
        </div>
      <img src={logo} height="80px" alt="" />
      {/* <h6 style={{ color: "gray" }}>name</h6> */}
      <div>


        <Button
          variant="danger"
          // onClick={async () => {
          //   supabase.auth.signOut();console.log("logout clicked");;
          // }}
          onClick={handleShow}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
