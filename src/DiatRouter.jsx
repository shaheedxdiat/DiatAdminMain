import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import StudentRegistration from "./pages/StudentRegistration";
import AuthListener from "./AuthListener";

// import AdminDashBoard from "./pages/AdminDashBoard";
import SelectCourse from "./pages/SelectCourse";
import CourseOpt from "./pages/CourseOpt";
import StudentDetails from "./pages/StudentDetails";

const DiatRouter = () => {
  return (
    <div>
      <BrowserRouter>
      
        <AuthListener/>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AdminLogin />
              </>
            }
          />
          <Route
            path="/course"
            exact element={
              <>
                <SelectCourse />
              </>
            }
          />

          <Route
            path="/course/:c_id"
            element={
              <>
                <CourseOpt/>
              </>
            }
          />

          <Route
            path="/course/:c_id/register"
            element={
              <>
                <StudentRegistration/>
              </>
            }
          />
          <Route
            path="/student/:s_id"
            element={
              <>
                <StudentDetails/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default DiatRouter;
