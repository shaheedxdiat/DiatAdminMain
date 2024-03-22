import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { supabase } from "../SupaBase";
import generateINVOICE from "../functions/INVOIVEGenarator";

const Payment = ({ student_id, due, setreloader }) => {
  const [admin, setadmin] = useState("");
  const [amount, setamount] = useState();
  const [remark, setremark] = useState("Fee Installment");
  const [showConfirm, setshowConfirm] = useState(false);
  const [unvalid, setunvalid] = useState(false);
  const [passcode, setpasscode] = useState("")
 
  useEffect(() => {
    const getAdmin = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("error:", error);
      }
      setadmin(data.user?.email);
    };
    getAdmin();
  }, [student_id]);

  // ----------------------------------------------------------


  const verifypasscode=()=>{
      if (passcode===process.env.REACT_APP_PASS_CODE) {
        handlePayment()
      }
      else{
        setunvalid(true);
        setTimeout(() => {
          setshowConfirm(false);
          setShow(false);
          setunvalid(false);
          setamount(null)
          setpasscode("")
          alert("payment canceled")
        }, 1000);
      }
  }



  const handlePayment = async () => {
    if (!amount || amount > due) {
      setunvalid(true);

      setTimeout(() => {
        setshowConfirm(false);
        setShow(false);
        setunvalid(false);
        setamount(null)

      }, 1000);

      return;
    }
    const { data: payment_data, error } = await supabase
      .from("payment_log")
      .insert([
        {
          payedby: student_id,
          amount: Math.abs(amount),
          cashier: admin,
          remark: remark,
        },
      ])
      .select("*");
      setamount(null)

    if (error) {
      console.log("error in adding payment", error);
      return;
    }


    const { data: student_data, error: error1 } = await supabase
      .from("students")
      .update({ fee_due: due - amount })
      .eq("student_id", student_id)
      .select("*");
    if (error) {
      console.log("error updating due", error1);
      return;
    }
    generateINVOICE(payment_data, student_data);
    setreloader(true);
    handleClose();
    if (due - amount === 0) {
      const { data, error } = await supabase
        .from("students")
        .update({ payment_completed: true })
        .eq("student_id", student_id)
        .select("student_id,payment_completed");

      if (error) {
        console.log(error);
      }
      console.log(data[0]);
      alert("Payment_completed");
    }
    return;
  };
  // ---------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    setshowConfirm(true);
  };

  // ----------------------------------------------------------
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setamount(null)
    setpasscode(null)
    setShow(false);
    setshowConfirm(false);
  };
  const handleShow = () => setShow(true);
  return (
    <div>
      {/* <button onClick={handlePayment}>bill</button> */}
      <Button variant="success" onClick={handleShow}>
        Payment
      </Button>
      

      <Modal
        style={{ marginTop: "150px" }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >

        
        <Modal.Header>
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
          {/* <Form onSubmit={handlePayment}> */}
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
              <Form.Label style={{ marginTop: "10px" }}>
                Paying Amount
              </Form.Label>
              <Form.Control
                style={{ color: "orangered", fontSize: "20px" }}
                required
                value={amount} 
                onChange={(e) => {
                  let value = e.target.value;
                  if (value < due+1 && value.match(/^\d+$/)) {
                    setamount(value);
                  } else {
                    setamount("");
                  }
                }}
                type="text"
                placeholder="₹ "
              />
            </div>
           
            <div style={{ display: "flex", gap: "31px", marginTop: "10px" }}>
              <Form.Label style={{ marginTop: "10px" }}>Remark</Form.Label>
              <Form.Control
                value={remark}
                onChange={(e) => {
                  setremark(e.target.value);
                }}
                
                type="text"
              />
            </div>

           {showConfirm&& <div style={{ display: "flex", gap: "21px", marginTop: "10px" }}>
              <Form.Label style={{ marginTop: "10px" }}>Pass Code</Form.Label>
              <Form.Control
              autoComplete="off" 
                value={passcode}
                onChange={(e) => {
                  setpasscode(e.target.value);
                }}
                placeholder="Enter the passcode for verification"
                type="password"
              />
            </div>}
            {unvalid && (
              <p style={{ color: "tomato", paddingLeft: "100px" }}>
                Incorrect Pass Code
              </p>
            )}
            <hr />
            <div className="d-flex justify-content-end px-2 gap-3">
              <Button variant="outline-secondary" onClick={handleClose}>
                Cancel
              </Button>
              {!showConfirm ? (
                <Button variant="success" type="submit">
                  Recieved
                </Button>
              ) : (
                <Button variant="danger" onClick={verifypasscode}>
                  Confirm And Get Invoice
                </Button>
              )}
            </div>
          </Form>
          {student_id.student_id}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Payment;
