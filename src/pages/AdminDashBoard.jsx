import React, { useState } from "react";
import NavBar from "../components/NavBar";
import CourseOpt from "./CourseOpt";
import SelectCourse from "./SelectCourse";
import { Button } from 'react-bootstrap'

const AdminDashBoard = () => {
  const [currentPage, setCurrentPage] = useState("courseSelection");

  const nextPage = () => {
    switch (currentPage) {
      case "courseSelection":
        setCurrentPage("optionSelection");
        break;
      // case "optionSelection":
      //   setCurrentPage("passwordEntry");
      //   break;
      default:
        setCurrentPage("courseSelection");
    }
  };

  const prevPage = () => {
    switch (currentPage) {
      case "registrationSelection":
        setCurrentPage("courseSelection");
        break;
      case "passwordEntry":
        setCurrentPage("registrationSelection");
        break;
      default:
        setCurrentPage("courseSelection");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "courseSelection":
        return <SelectCourse />;
      case "optionSelection":
        return <CourseOpt />;
         
    default:
        
    }
  };

  
  return (
    <div>
      <NavBar />
      <div
        className={`page-transition ${
          currentPage === "none" ? "page-hidden" : ""
        }`}
      >
        {renderPage()}
      </div>
      <Button onClick={prevPage}>Back</Button>
      <Button onClick={nextPage}>Next</Button>
    </div>
  );
};

export default AdminDashBoard;
