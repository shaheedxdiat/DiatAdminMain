import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import StudentRegistration from "./pages/StudentRegistration";
import AuthListener from "./AuthListener";

// import AdminDashBoard from "./pages/AdminDashBoard";
import SelectCourse from "./pages/SelectCourse";
import CourseOpt from "./pages/CourseOpt";
import StudentDetails from "./pages/StudentDetails";
import StudentTable from "./pages/StudentTable";
import InsightPage from "./pages/InsightPage";

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
            path="/course/:c_id/list"
            element={
              <>
                <StudentTable/>
              </>
            }
          />
          <Route
            path="/course/:c_id/student/:s_id"
            element={
              <>
                <StudentDetails/>
              </>
            }
          />
          <Route
            path="/insight"
            element={
              <>
                <InsightPage/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default DiatRouter;
