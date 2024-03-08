import React from "react";
import "../assests/styles/NavBar.css";
import logo from "../assests/images/DIAT_20240307_213038-removebg-preview.png";
import { Button } from "react-bootstrap";
import { supabase } from "../SupaBase";

const NavBar = () => {
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
