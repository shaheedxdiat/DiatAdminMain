import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { supabase } from "./SupaBase";

import AdminLogin from "./pages/AdminLogin";
import StudentRegistration from "./pages/StudentRegistration";
import AuthListener from "./functions/AuthListener";
import SelectCourse from "./pages/SelectCourse";
import CourseOpt from "./pages/CourseOpt";
import StudentDetails from "./pages/StudentDetails";
import StudentTable from "./pages/StudentTable";
import EditRegistration from "./pages/EditRegistration";
import InsightPage2 from "./pages/InsightPage2";

const DiatRouter = () => {
  const [autotimeout, setautotimeout] = useState(false);
  const [timeoutalert, settimeoutalert] = useState(false);
  // console.log(autotimeout);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      clearTimeout(timeoutId);
      if (autotimeout) {
        settimeoutalert(false); 
      }
      setautotimeout(true);
      timeoutId = setTimeout(() => {
        settimeoutalert(true);
        supabase.auth.signOut();
        setautotimeout(false);
      }, 5 * 60 * 1000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeoutId); 
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [autotimeout]);

  const handleClose = () => {
    settimeoutalert(false);
  };
  

  return (
    <div>
      {/* <Text/> */}
      <Modal
        show={timeoutalert}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Session Time Out</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button onClick={handleClose} variant="primary">
            Login Again
          </Button>
        </Modal.Footer>
      </Modal>
      <BrowserRouter>
        <AuthListener />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AdminLogin setautotimeout={setautotimeout} />
              </>
            }
          />
          <Route
            path="/course"
            exact
            element={
              <>
                <SelectCourse />
              </>
            }
          />

          <Route
            path="/course/:c_id"
            element={
              <>
                <CourseOpt />
              </>
            }
          />

          <Route
            path="/course/:c_id/register"
            element={
              <>
                <StudentRegistration />
              </>
            }
          />
          <Route
            path="/course/:c_id/list"
            element={
              <>
                <StudentTable />
              </>
            }
          />
          <Route
            path="/course/:c_id/student/:s_id"
            element={
              <>
                <StudentDetails />
              </>
            }
          />
          <Route
            path="/insight"
            element={
              <>
                {/* <InsightPage/> */}
                <InsightPage2 />
              </>
            }
          />
          <Route
            path="/course/:c_id/student/:s_id/edit"
            element={
              <>
                <EditRegistration />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default DiatRouter;
