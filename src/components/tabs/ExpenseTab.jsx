import React, { useEffect, useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { supabase } from "../../SupaBase";

import expensesvg from "../../assests/images/expense.svg";
import LogTable from "./LogTable";

const ExpenseTab = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [data, setData] = useState([]);
  const [expense, setexpense] = useState(0);

  const fetchexpense = async () => {
    console.log("fetching expense");
    const { data, error } = await supabase
      .from("expense_chart")
      .select("amount,date,description,invoice_number,cashier");

    if (error) {
      console.log("expense fetch error", error);
      return;
    }
    setData(data);
    const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
    setexpense(totalAmount);
  };

  useEffect(() => {
    fetchexpense();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Confirm the entry");
    if (confirm) {
      const { _, error } = await supabase.from("expense_chart").insert([
        {
          amount: Math.abs(amount),
          description: description,
          invoice_number: invoiceNo,
          cashier: localStorage.getItem("admin"),
        },
      ]);
      console.log(_);
      fetchexpense();
      setAmount("");
      setDescription("");
      setInvoiceNo("");

      if (error) {
        alert("Error in adding expense");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h4
        style={{
          position: "absolute",
          left: "30px",
          marginTop: "10px",
          color: "rgb(200,200,200)",
          textShadow: "1px 2px 5px rgb(210,210,210)",
        }}
      >
        EXPENSE TAB
      </h4>

      <div className="firstexpdiv">
        <img
          className="mt-2"
          src={expensesvg}
          height={350}
          width={350}
          alt=""
        />
        <div className="insightDiv">
          <Form onSubmit={handleSubmit} className="Formdiv">
            <h6>Add Bill</h6>
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
              <p>Description </p>
              <Form.Select
                required
                onChange={(e) => setDescription(e.target.value)}
              >
                <option>Select</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Internet Bill">Internet Bill</option>
                <option value="Room rent">Room rent</option>
                <option value="Salary">Salary</option>
                <option value="Class room maintenance">
                  Class room maintenance
                </option>
                <option value="Travel expense">Travel expense</option>
                <option value="Purchase">Purchase</option>
              </Form.Select>
              <Form.Control
                required
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Invoice No </p>
              <Form.Control
                type="text"
                value={invoiceNo}
                onChange={(e) => {
                  setInvoiceNo(e.target.value);
                }}
              />
            </div>
            <Button variant="danger" type="submit">
              Add Bill
            </Button>
          </Form>
        </div>
      </div>
      <div className="px-5">
        <hr />
      </div>

      <div className="secexpdiv">
        <div>
          <LogTable
            data={data}
            total={expense}
            theme={""}
            title={"EXPENSE_LOG"}
            color={"red"}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTab;
