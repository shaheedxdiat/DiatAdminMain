import React, { useState } from "react";
import { supabase } from "../SupaBase";
import { Button, Form } from "react-bootstrap";
import { BeatLoader } from "react-spinners"; // Import the BeatLoader component
import logo from "../assests/images/DIAT_20240307_213038-removebg-preview.png";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      if (error) {
        throw error;
      }
      console.log("Login successful", data);
      // Reset error state if login successful
      setError("");
    } catch (error) {
      console.error("Login failed", error.message);
      // Set error state with the error message
      setError("Incorrect username or password.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const isFormValid = () => {
    return username.trim() !== "" && password.trim() !== "";
  };

  return (
    <div>
      <div>
        <div style={{marginTop:"100px" ,marginBottom:"50px"}}>
          <img src={logo} alt="diat logo" height={100}  />
        </div>
      </div>
      <div>
        <div>
          <form
            onSubmit={submitLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Control
              style={{ maxWidth: "300px" }}
              required
              type="text"
              placeholder="User name"
              value={username}
              onChange={handleUsernameChange}
            />
            <Form.Control
              style={{ maxWidth: "300px" }}
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button type="submit" disabled={!isFormValid()} style={{width:"100px"}}>
              {loading ? <BeatLoader size={8} color="white" /> : "LOGIN"} {/* Conditional rendering of the spinner */}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
