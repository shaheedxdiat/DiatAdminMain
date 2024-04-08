import React, { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { supabase } from "../../SupaBase";

import expensesvg from "../../assests/images/income.svg";
import LogTable from "./LogTable";

const IncomeTab = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [income, setincome] = useState(0);
  const [count1, setcount1] = useState(0);


  const fetchIncome = async () => {
    const { data, error } = await supabase
      .from("other_income")
      .select("amount,date,description,cashier");
    setcount1(count1 + 1);
    if (error) {
      console.log("error in fetching income", error);
      if (error.code==="") {
        alert("Check your internet Connection")
      }
      return;
    }
    setData(data);

    const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
    setincome(totalAmount);
   
  };
  if (data.length === 0&&count1<5) {

  
   fetchIncome();
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Confirm the entry");
    if (confirm) {
      const { _, error } = await supabase.from("other_income").insert([
        {
          amount: Math.abs(amount),
          description: description,
          cashier: localStorage.getItem("admin"),
        },
      ]);
      console.log(_);
      fetchIncome();
      setAmount("");
      setDescription("");
    

      if (error) {
        alert("Error in adding expense");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h4 style={{ position: "absolute", left: "30px", marginTop:"10px" ,color:"rgb(200,200,200)" ,textShadow:"1px 2px 5px rgb(210,210,210)"}}>INCOME TAB</h4>

      <div className="firstexpdiv">
        <img className="mt-2"   src={expensesvg} height={350} width={350} alt="" />
        <div className="insightDiv">
          <Form onSubmit={handleSubmit} className="Formdiv">
            <h6>Add Income</h6>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Amount </p>
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
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Description</p>
             
              
              <Form.Control
            
                required
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
         
          

            </div>
            
            <Button variant="success" type="submit">Enter</Button>
          </Form>
        </div>
      </div>
      <div className="px-5">
        <hr />
      </div>

      <div className="secexpdiv">
        <div>
          <LogTable data={data} total={income} theme={"success"} heading={"INCOME_LOG"} title={"INCOME_LOG"} color={"green"} />
        </div>
      </div>
    </div>
  );
};

export default IncomeTab;
