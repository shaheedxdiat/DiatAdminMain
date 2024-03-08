import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";


import AdminLogin from "./pages/AdminLogin";
// import SelectCourse from "./pages/SelectCourse";
import AuthListener from "./AuthListener";
import AdminDashBoard from "./pages/AdminDashBoard";

const DiatRouter = () => {
  return (
    <div>
      <BrowserRouter>
      <AuthListener/>
        <Routes>
            <Route path="/" element={<><AdminLogin/></>}/>
            <Route path="/dashboard" element={<><AdminDashBoard/></>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default DiatRouter;
