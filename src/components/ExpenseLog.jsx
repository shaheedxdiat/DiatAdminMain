import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { supabase } from "../SupaBase";

const ExpenseLog = (data) => {
 

  const [log, setlog] = useState([]);
  const [income, setincome] = useState();
  const [expense, setexpense] = useState()
  console.log("income", income);
  useEffect(() => {
    const fetchexpense = async () => {
      const { data, error } = await supabase.from("expense_chart").select("*");

      if (error) {
        console.log("expense error",error);
        return;
      }
      console.log("insight data", data);
      setlog(data);
      const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
  
      // Update the state with the total amount
    //   setTotalIncome(totalAmount);
    setexpense(totalAmount);
      // setvisibile(!visibile);
    };
    fetchexpense();
  }, [data]);

  useEffect(() => {
    const fetchincome = async () => {
      const { data, error } = await supabase
        .from("payment_log")
        .select('amount');
  
      if (error) {
        console.error("income error:", error);
        return;
      }
  
      // Calculate the sum of amounts
      const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
  
      // Update the state with the total amount
    //   setTotalIncome(totalAmount);
      setincome(totalAmount);
    };
  
    fetchincome();
  }, []);
  



  return (
    <div className="tablediv">
      
 
          <div className="w-100 d-flex g-5">
            <div className="d-flex">
              <p style={{color:"green"}} >Total Recieved : </p> <p style={{color:"green"}}>{income}</p>
            </div>
            <div className="d-flex">
              <p style={{color:"tomato"}}>Total Spended : </p> <p style={{color:"tomato"}}>{expense}</p>
            </div>
            <div className="d-flex">
              <p style={{color:""}}>Expected Balance : </p> <p style={{color:""}}>{parseInt(income)-parseInt(expense)}</p>
            </div>
          </div>
          <Table  striped bordered hover variant="dark"> 
          
            <thead>
            <caption>Expenses:-</caption>
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
              {log?.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{log.created_at.split("T")[0]}</td>
                  <td>{log.amount}</td>
                  <td>{log.description}</td>
                  <td>{log.invoice_number?log.invoice_number:"nill"}</td>
                  <td>{log.enteredby}</td>
                </tr>
              ))}
            </tbody>
          </Table>

    </div>
  );
};

export default ExpenseLog;
