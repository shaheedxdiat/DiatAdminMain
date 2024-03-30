import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import StatementGenerator from "../../functions/StatementGenarator";

const ExpenseLog = ({ data, total }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const firstEntry = data[0];
      const columns = Object.keys(firstEntry);
      setColumns(columns);
    }
  }, [data]);

  return (
    <div className="tablediv">
      <div className="w-100 d-flex g-5">
        <div className="d-flex">
          <p style={{ color: "tomato" }}>Total Spent: </p>{" "}
          <p style={{ color: "tomato" }}>{total}</p>
        </div>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <caption>Expenses:-</caption>
          <tr>
            <th>S.No</th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((log, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Dynamically generate S.No */}
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{log[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <button
        onClick={() => StatementGenerator(data, "OTHER INCOME STATEMENT", null)}
      >
        PDF
      </button>
    </div>
  );
};

export default ExpenseLog;
