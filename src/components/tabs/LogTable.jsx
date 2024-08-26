import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { format } from 'date-fns'; // Import date-fns format function
import StatementGenerator from "../../functions/StatementGenarator";
import Loader from "../Loader";

const LogTable = ({ data, theme, title, currentPage, itemsPerPage }) => {
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
        {/* Other controls or headers can be here */}
      </div>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <Table striped bordered hover variant={theme}>
          <thead>
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
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>{" "}
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {column === 'date' ? format(new Date(log[column]), 'dd-MM-yyyy HH:mm') : log[column]} {/* Format date */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {data.length === 0 ? (
        <></>
      ) : (
        <StatementGenerator logs={data} heading={title} />
      )}
    </div>
  );
};

export default LogTable;
