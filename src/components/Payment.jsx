import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { supabase } from "../SupaBase";

const Payment = ({ student_id, due, setreloader }) => {
  const [admin, setadmin] = useState("");
  const [amount, setamount] = useState(0);
  const [remark, setremark] = useState("Fee Installment");

  console.log("amount", amount);

  useEffect(() => {
    const getAdmin = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("erroe:", error);
      }
      setadmin(data.user?.email);
    };
    getAdmin();
  }, [student_id]);

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!amount) {
      alert("inputs requuired");
      return;
    }
    console.log(amount, admin, student_id);
    const { data, error } = await supabase
      .from("payment_log")
      .insert([
        {
          payedby: student_id,
          amount: parseInt(amount),
          cashier: admin,
          remark:remark
        },
      ])
      .select("*");

    if (error) {
      console.log("error in adding payment", error);
      return;
    }
    console.log("payment log updated data", data);

    const { data: data1, error: error1 } = await supabase
      .from("students")
      .update({ fee_due: due - amount })
      .eq("student_id", student_id)
      .select("fee_due");
    if (error) {
      console.log("error updating due", error1);
      return;
    }
    console.log("due updated data", data1);

    setreloader(true);
    handleClose();
    return;
  };

  // console.log(student_id);
  // console.log(due);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Payment
      </Button>

      <Modal
        style={{ marginTop: "150px"  }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title style={{ color: "green" }}>
            Fee Payment{" "}
            <div
              style={{
                display: "flex",
                gap: "25px",
                color: "gray",
                fontSize: "16px",
              }}
            >
              <Form.Label style={{ marginTop: "10px" }}>Pending : </Form.Label>
              <Form.Label style={{ marginTop: "10px" }}>{due}</Form.Label>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "17px", fontWeight: "500" }}>
          <Form onSubmit={handlePayment}>
            <div style={{ display: "flex" }}>
              <Form.Label style={{ marginTop: "10px" }}>
                paying Amount
              </Form.Label>
              <Form.Control
                style={{ color: "orangered",fontSize:"20px" }}
                required
                onChange={(e) => {
                  setamount(e.target.value);
                }}
                type="number"
                placeholder="Rs."
              />
            </div>
            <div style={{ display: "flex", gap: "31px", marginTop: "10px" }}>
              <Form.Label style={{ marginTop: "10px" }}>Remark</Form.Label>
              <Form.Control
                value={remark}
                onChange={(e) => {
                  setremark(e.target.value);
                }}
                defaultValue={"Fee Installment "}
                type="text"
              />
            </div>
            <hr />
            <div className="d-flex justify-content-end px-2 gap-3">
              <Button variant="outline-secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Recieved
              </Button>
            </div>
          </Form>
          {student_id.student_id}
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default Payment;
