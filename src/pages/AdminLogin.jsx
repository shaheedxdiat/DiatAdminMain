import React, { useState } from "react";
import { supabase } from "../SupaBase";
import { Button, Form } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import logo from "../assests/images/DIAT_20240307_213038-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import "../assests/styles/AdminLogin.css";
// import svgg from "../assests/images/7140739_3516835.svg";
import authsvg from "../assests/images/9712739_4140043.svg";
// import authsvg from "../assests/images/5639782_2942005.svg";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAdmin = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log("error:", error);
      return;
    }
    console.log("admin@context", data.user.email);
    localStorage.setItem("admin", data.user.email);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(false);
  };

  const handlePasswordChange = (e) => {
    setError(false);
    setPassword(e.target.value);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      if (error) {
        throw error;
      }
      console.log("Login successful", data.user.email);
      setError("");
      navigate("/course");

      getAdmin();
    } catch (error) {
      console.error("Login failed", error.message);

      setError("Incorrect username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminMainDiv">
      <div className="containerdiv">
        <div className="adminFirstDiv">
          <h3>Admin</h3>
          <img src={authsvg} height={250} alt="" />
        </div>
        <div className="adminSecDiv">
          {" "}
          <div style={{margin:"20px"}}>
            {/* <img id="logindiatlogo" src="https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/diat_blank.png" alt="diat logo" height={100} /> */}
            <img id="logindiatlogo" src={logo} alt="diat logo" height={100} />
          </div>
          <div id="loginForm">
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
                style={{ maxWidth: "250px" }}
                required
                type="text"
                placeholder="User name"
                value={username}
                onChange={handleUsernameChange}
              />
              <Form.Control
                style={{ maxWidth: "250px" }}
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                // disabled={!isFormValid()}
                style={{ width: "100px" }}
              >
                {loading ? <BeatLoader size={8} color="white" /> : "LOGIN"}
              </Button>
              {error ? 
                <p  id="error" style={{ color: "red",width:"300px",height:"5px" }}>
                  {error}
                </p>: <p style={{width:"300px",height:"5px"}}></p>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
