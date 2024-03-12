import React, { useState } from "react";
import { Button, Modal, Form,  } from "react-bootstrap";

const Payment = ({student_id,due}) => {
  console.log(student_id);
  console.log(due);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Payment
      </Button>

      <Modal
        style={{ marginTop: "200px" }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Fee Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize:"17px",fontWeight:"500"}}>
          <div style={{display:"flex", gap:"25px"}}>
          <Form.Label style={{ marginTop: "10px" }}>Pending : </Form.Label>
          <Form.Label style={{ marginTop: "10px" }}>{due}</Form.Label>

          </div>
          <Form>
            <div style={{display:"flex" }}>
            <Form.Label style={{ marginTop: "10px" }}>
                paying Amount
              </Form.Label>
              <Form.Control style={{color:"green"}} required type="number" placeholder="Rs." />
         
            </div>
          </Form>
          {student_id.student_id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success">PayNow</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payment;
