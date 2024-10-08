import React, { useEffect, useState } from "react";
import "../assests/styles/NavBar.css";
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
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              supabase.auth.signOut();
              localStorage.removeItem("admin")
            
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <div><button
        className="NavBackBtn"
        onClick={handlebackClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
          onClick={handleHomeClick}        >
          Home
        </button>
        
        </div>
     
      <div>


        <Button
          variant="danger"
          onClick={handleShow}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
