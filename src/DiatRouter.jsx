import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";


import AdminLogin from "./pages/AdminLogin";
import SelectCourse from "./pages/SelectCourse";
import AuthListener from "./AuthListener";

const DiatRouter = () => {
  return (
    <div>
      <BrowserRouter>
      <AuthListener/>
        <Routes>
            <Route path="/" element={<><AdminLogin/></>}/>
            <Route path="/course" element={<><SelectCourse/></>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default DiatRouter;
