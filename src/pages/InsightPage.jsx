import React, { useState } from "react";
import AdminTitle from "../components/AdminTitle";
import { Form, Row, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import authsvg from "../assests/images/12704375_5052871.svg";
import "../assests/styles/ExpenseChart.css";
import ExpenseLog from "../components/ExpenseLog";
import { supabase } from "../SupaBase";

const InsightPage = () => {
  const [amount, setamount] = useState("");
  const [description, setdescription] = useState("");
  const [data, setdata] = useState();
  const [invoiceno, setinvoiceno] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Confirm the entry");
    if (confirm) {
      const { data, error } = await supabase
        .from("expense_chart")
        .insert([
          {
            amount: Math.abs(amount),
            description: description,
            invoice_number: invoiceno,
            enteredby: localStorage.getItem("admin"),
          },
        ])
        .select("*");
        setamount("")
        setdescription("")
        setinvoiceno("")
      if (error) {
        alert("error in adding expense");
        console.log(error);
      }
      setdata(data);
      // console.log(data);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="subNav">
        <p>Diat</p>
        <div></div>
        <p>Insight</p>
      </div>

      <div className="firstexpdiv">
        <img src={authsvg} height={350} alt="" />
        <div className="insightDiv">
          <Form onSubmit={handlesubmit} className="Formdiv">
            <h6>Add Bill</h6>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Amount : </p>
              <Form.Control
                required
                type="text"
                value={amount}
                onChange={(e) => {
                  let value = e.target.value;
                  if ( value.match(/^\d+$/)) {
                    setamount(value);
                  } else {
                    setamount("");
                  }
                }}
              />
            </div>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Description : </p>
              <Form.Control
                style={{ height: "62px" }}
                required
                type="text"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </div>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Invoice Number : </p>
              <Form.Control
                
                type="text"
                value={invoiceno}
                onChange={(e) => {
                  setinvoiceno(e.target.value);
                }}
              />
            </div>
            <Button type="submit">Add Bill</Button>
          </Form>
        </div>
      </div>
      <div className="px-5">
        {" "}
        <hr />
      </div>

      <div className="secexpdiv">
        <div>
        <div className="subNav justify-content-center">
     
        
        <p>Insight</p>
      </div>
          <ExpenseLog data={data} />
        </div>
        <div></div>
      </div>
      <AdminTitle />
    </div>
  );
};

export default InsightPage;
