import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import StatementGenerator from "../../functions/StatementGenarator";
import Loader from "../Loader";

const LogTable = ({ data ,theme,title}) => {
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
        {/* <div className="d-flex">
          <p className="danger" style={{ color:color}}>{heading} </p>
          <p style={{ color: color }}>{total}</p>
        </div> */}
      </div>
      {data.length===0?<><Loader/></>:<Table striped bordered hover variant={theme}>
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
              <td>{index + 1}</td> {/* Dynamically generate S.No */}
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{log[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      
      }
      
      <StatementGenerator  logs={data} heading={title}/>
    </div>
  ); 
};

export default LogTable;
