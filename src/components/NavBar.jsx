import React, { useEffect, useState } from "react";
import "../assests/styles/NavBar.css";
import logo from "../assests/images/DIAT_20240307_213038-removebg-preview.png";
import { Button } from "react-bootstrap";
import { supabase } from "../SupaBase";

const NavBar = () => {
  
  const [session, setSession] = useState(null)
  console.log(session)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])
  console.log("userdata",supabase.auth.getSession)
  return (
    <div className="nav_container">
      <img src={logo} height="50px" alt="" />
      <h6 style={{ color: "gray" }}>name</h6>
      <Button
        onClick={async () => {
          supabase.auth.signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default NavBar;
