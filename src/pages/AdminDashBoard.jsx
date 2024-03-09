// import React, { useState } from "react";
// import NavBar from "../components/NavBar";
// import CourseOpt from "./CourseOpt";
// import SelectCourse from "./SelectCourse";


// const AdminDashBoard = () => {
//   const [currentPage, setCurrentPage] = useState("courseSelection");

//   const nextPage = () => {
//     switch (currentPage) {
//       case "courseSelection":
//         setCurrentPage("optionSelection");
//         break;
//       // case "optionSelection":
//       //   setCurrentPage("passwordEntry");
//       //   break;
//       default:
//         setCurrentPage("courseSelection");
//     }
//   };

//   const prevPage = () => {
//     switch (currentPage) {
//       case "registrationSelection":
//         setCurrentPage("courseSelection");
//         break;
//       case "passwordEntry":
//         setCurrentPage("registrationSelection");
//         break;
//       default:
//         setCurrentPage("courseSelection");
//     }
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case "courseSelection":
//         return <SelectCourse onClickHandler={nextPage} />;
//       case "optionSelection":
//         return <CourseOpt onClickHandler={prevPage} />;

//       default:
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       <div
//         className={`page-transition ${
//           currentPage === "none" ? "page-hidden" : ""
//         }`}
//       >
//         {renderPage()}
//       </div>
//       {/* <div style={{width:"100%",  position:"fixed",bottom:"100px",display:"flex",justifyContent:"space-between" ,padding:"0px 100px"}}><Button onClick={prevPage}>Back</Button>
//       <Button onClick={nextPage}>Next</Button></div> */}
//     </div>
//   );
// };

// export default AdminDashBoard;
