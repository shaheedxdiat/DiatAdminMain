import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { supabase } from "../SupaBase";
import { Button } from "react-bootstrap";
import StatementGenerator from "../functions/StatementGenarator";

const PaymentLog =  (student_id) => {
  const [visibile, setvisibile] = useState(false);
  const [log, setlog] = useState([])
  const handleclick = async () => {
    const { data, error } = await supabase
      .from("payment_log").select("*")
      .eq("payedby", student_id.student_id).order("id")
      
    if (error) {
      console.log(error);
      return
    }
    // console.log("data",data); 
    setlog(data)
    setvisibile(!visibile);
    
  };    
  return (
    <div>
      <button className="mt-4 mb-4"
        onClick={handleclick}
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        {" "}
        <p style={{color:"green"}}>Payment History <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z"/>
</svg> </p>
      </button>
      {visibile ? (
        <>{
           log.length===0? <><p>No payment history</p></>:<>
           {" "}
           <Table striped bordered hover variant="success">
             <thead>
               <tr>
                 <th>#</th>
                 <th >Date</th>
                 <th>Amount</th>
                 <th>Cashier</th>
               </tr>
             </thead>
             <tbody>
               {log?.map((log,index)=><tr key={log.id}>
                 <td>{index+1}</td>
                 <td>{log.created_at.split("T")[0]}</td>
                 <td>{log.amount}</td>
                 <td>{log.cashier}</td>
               </tr>)}
             </tbody>
           </Table> <Button onClick={()=>StatementGenerator(log,student_id.student_id)}>download Statment</Button></>
        }
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PaymentLog;
