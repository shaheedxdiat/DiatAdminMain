import React, { useState } from "react";
import { supabase } from "../SupaBase";
import { Container, Button, Form, Row, Col } from "react-bootstrap";


const AdminLogin = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const SubmitLogin= async()=>{
      
let { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  })
  console.log("attempt to login",data, error )
  
    }
  console.log("supaBasee",supabase);
  return (
   <div style={{display:"flex", height:"100vh", alignItems:"center"}}>
     <Container>
      <Row>
        <Col md={4}>
          {" "}
          <img src="" alt="diat logo" height={400} />
        </Col>
        <Col md={6}>
          {" "}
          <div
           
          >
            <Form  style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}><Form.Control
              style={{ maxWidth: "250px" }}
              required
              type="text"
              placeholder="User name"
              onChange={(e)=>{setusername(e.target.value)}}
            />
            <Form.Control
              style={{ maxWidth: "250px" }}
              required
              type="password"
              placeholder="password"
              onChange={(e)=>{setpassword(e.target.value)}}
            />
            <Button onClick={SubmitLogin}>LOGIN</Button></Form>
          </div>
        </Col>
      </Row>
    </Container>
   </div>

  
  );
};

export default AdminLogin;
