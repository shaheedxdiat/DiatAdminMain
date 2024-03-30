import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { supabase } from "../../SupaBase";
import StatementGenerator from "../../functions/StatementGenarator";

const ExpenseLog = ({data,expense}) => {
  

  // const fetchincome = async () => {
  //   const { data, error } = await supabase
  //     .from("payment_log")
  //     .select('amount');

  //   if (error) {
  //     console.error("income error:", error);
  //     return;
  //   }

  //   const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);

  //   setincome(totalAmount);
  // };

  // fetchincome();

  return (
    <div className="tablediv">
      <div className="w-100 d-flex g-5">
        
        <div className="d-flex">
          <p style={{ color: "tomato" }}>Total Spended : </p>{" "}
          <p style={{ color: "tomato" }}>{expense}</p>
        </div>
       
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          {/* <title>Expenses:-</title> */}
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Discrption</th>
            <th>Invoice No</th>
            <th>entered By</th>
          </tr>
        </thead> 
        <tbody>
          {data?.map((log, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{log.date.split("T")[0]}</td>
              <td>{log.amount}</td>
              <td>{log.description}</td>
              <td>{log.invoice_number ? log.invoice_number : "nill"}</td>
              <td>{log.enteredby.split("@")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={()=>StatementGenerator(data,"EXPENSE STATEMENT",null)}>pdf</button>
      {/* <StatementGenerator/> */}
      {/* <button onDoubleClick={()=>alert("pdf")}>pdf</button> */}
    </div>
  );
};

export default ExpenseLog;
