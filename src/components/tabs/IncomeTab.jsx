


import React, { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import expensesvg from "../../assests/images/income.svg";
import "../../assests/styles/ExpenseChart.css";

// import LedgerLog from "./LedgerLog";
import { supabase } from "../../SupaBase";


const IncomeTab = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState();
  const [invoiceNo, setInvoiceNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Confirm the entry");
    if (confirm) {
      const { data, error } = await supabase
        .from("expense_chart")
        .insert([
          {
            amount: Math.abs(amount),
            description: description,
            invoice_number: invoiceNo,
            enteredby: localStorage.getItem("admin"),
          },
        ])
        .select("*");

      setAmount("");
      setDescription("");
      setInvoiceNo("");

      if (error) {
        alert("Error in adding expense");
        console.log(error);
      }

      setData(data);
    }
  };

  return (
    <div >
      <h5 style={{position:"absolute", left:"25px"}}>Income Tab</h5>

      <div className="firstexpdiv"> 
        
        <img src={expensesvg} height={350} width={350} alt="" />
        <div className="insightDiv">
          <Form onSubmit={handleSubmit} className="Formdiv">
            <h6>Add Bill</h6>
            <div className="inputandlable" as={Row} controlId="validationCustom01">
              <p>Amount : </p>
              <Form.Control
                required
                type="text"
                value={amount}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.match(/^\d+$/)) {
                    setAmount(value);
                  } else {
                    setAmount("");
                  }
                }}
              />
            </div>
            <div className="inputandlable" as={Row} controlId="validationCustom01">
              <p>Description : </p>
              <Form.Control
                style={{ height: "62px" }}
                required
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="inputandlable" as={Row} controlId="validationCustom01">
              <p>Invoice Number : </p>
              <Form.Control
                type="text"
                value={invoiceNo}
                onChange={(e) => {
                  setInvoiceNo(e.target.value);
                }}
              />
            </div>
            <Button type="submit">Add Bill</Button>
          </Form>
        </div>
      </div>
      <div className="px-5">
        <hr />
      </div>

      <div className="secexpdiv">
        <div>
          {/* <LedgerLog data={data} theme="success" /> */}
        </div>
      </div>
    </div>
  );
};

export default IncomeTab;    

