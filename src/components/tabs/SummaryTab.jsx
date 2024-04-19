// SummaryTab.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../SupaBase";
import { Form  } from "react-bootstrap";

const SummaryTab = () => {
  const [totalExpense, settotalExpense] = useState();
  const [totalIncome, settotalIncome] = useState();
  const [totalFee, settotalFee] = useState();
 
  useEffect(() => {
    const getTotal = async (tablename, tableRow) => {
      const { data, error } = await supabase
        .from(`${tablename}`)
        .select(`${tableRow}`);
      if (error) {
        console.log(error);
        return error;
      }
      const totalAmount = data?.reduce((acc, curr) => acc + curr.amount, 0);
      return totalAmount;
    };

    if (!totalExpense || !totalIncome) {
     
      getTotal("other_income", "amount").then((total) => settotalIncome(total)); 
      getTotal("expense_chart", "amount").then((total) => settotalExpense(total));
      getTotal("payment_log", "amount").then((total) => settotalFee(total));

    }
  }, [totalExpense,totalIncome]);

  return (
    <div>
      {/* <div><h4
        style={{
          position: "absolute",
          left: "30px",
          marginTop: "10px",
          color: "rgb(200,200,200)",
          textShadow: "1px 2px 5px rgb(210,210,210)",
        }}
      >
        SUMMARY TAB
      </h4></div> */}

      <div className="">
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3 d-flex">
            <Form.Label className="w-25 " htmlFor="disabledTextInput">
              Total Income
            </Form.Label>
            <Form.Control
              value={totalIncome + totalFee}
              placeholder="Disabled input"
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex">
            <Form.Label className="w-25" htmlFor="disabledTextInput">
              Total Expense
            </Form.Label>
            <Form.Control value={totalExpense} placeholder="Disabled input" />
          </Form.Group>
          <Form.Group className="mb-3 d-flex">
            <Form.Label className="w-25 " htmlFor="disabledTextInput">
              Balance
            </Form.Label>
            <Form.Control
              value={(totalIncome+totalFee) - totalExpense}
              placeholder="Disabled input"
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SummaryTab;
