import React, { useState, useEffect } from "react";
import { Button, NavDropdown, ButtonGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { supabase } from "../SupaBase";
import "../assests/styles/StudentDetails.css";
import pdfIcon from "../assests/images/pdf_icon.png";
import deleteIcon from "../assests/images/icons8-delete-48.png";
import editIcon from "../assests/images/icons8-edit-64.png";
// import completedIcon from "../assests/images/icons8-complete.gif";
import completeIcon from "../assests/images/icons8-complete-48.png";
import dropIcon from "../assests/images/icons8-id-not-verified-48.png";

import alterIMG from "../assests/images/alterIMG.jpeg";
import Payment from "../components/Payment";
import generatePDF from "../PDFGenerator";
import PaymentLog from "../components/PaymentLog";
import AdminTitle from "../components/AdminTitle";
import { render } from "@testing-library/react";
const StudentDetails = () => {
  const navigate = useNavigate();
  const { c_id, s_id } = useParams();
  // console.log(c_id, s_id);
  const [reloader, setreloader] = useState(false);
  // console.log(reloader)

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [adhar, setAdhar] = useState("");
  const [discount, setdiscount] = useState("");
  const [fee_due, setfee_due] = useState("");
  const [status, setstatus] = useState() 
  const [payment_completed, setpayment_completed] = useState(false)
  // const [admissions_officer, setadmissions_officer] = useState("");
  const [qualification, setqualification] = useState("");

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [postoffice, setPostOffice] = useState("");
  const [place, setPlace] = useState("");
  const [housename, setHouseName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianMobile, setGuardianMobile] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [hostler, sethostler] = useState("");
  const [placement, setplacement] = useState("");
  const [coursefee, setcoursefee] = useState("");
  const [admission_date, setadmission_date] = useState("");
  const [class_start, setaclass_start] = useState("");
  // console.log("placement:",placement,"hostler :",hostler)

  // const alterURL = "https://images.app.goo.gl/tFyC7Ma4avJFSiuL8";

  useEffect(() => {
    const getFee = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("fee")
          .eq("courses_id", c_id);

        if (error) {
          console.error("Error fetching course fee:", error.message);
          return;
        }

        if (data.length > 0) {
          setcoursefee(data[0].fee);
        }
      } catch (error) {
        console.error("Error fetching course fee:", error.message);
      }
    };
    getFee();
  }, [c_id]);

  useEffect(() => {
    const getStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", s_id)
        .neq("course_status", "3");

      if (data.length === 0) {
        console.log(error);
        alert("Invalid Student ID");
        navigate(`/course/${c_id}`);
      } else {
        setreloader(false);
        // console.log(data[0]);

        const studentData = data[0]; // Assuming there's only one student with given ID
        setName(studentData.full_name);
        setMobile(studentData.mobile);
        setstatus(studentData.course_status)
        setpayment_completed(studentData.payment_completed)
        setgender(studentData.gender);
        setEmail(studentData.email);
        setDob(studentData.dob);
        setAdhar(studentData.adhar_number);
        setqualification(studentData.qualification);
        setfee_due(studentData.fee_due);
        // setadmissions_officer(studentData.admissions_officer);
        setState(studentData.state);
        setDistrict(studentData.district);
        setPostOffice(studentData.post);
        setPlace(studentData.place);
        setHouseName(studentData.house_name);
        setGuardianName(studentData.quardian);
        setGuardianMobile(studentData.quardian_mobile);
        setphotoURL(studentData.photo_url);
        setadmission_date(studentData.admission_date);
        setaclass_start(studentData.class_start);
        sethostler(() => {
          if (studentData.hostler) {
            return "YES";
          } else return "NO";
        });
        setplacement(() => {
          if (studentData.placement) {
            return "YES";
          } else return "NO";
        });
        setdiscount(studentData.discount);
      }
    };
    getStudent();
  }, [s_id, c_id, navigate, reloader]);
  const downloadPDF = () => {
    generatePDF(s_id);
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };


  const handleDeleteData=async()=>{
     alert("deleteing")
    
  }

  const handleEditdata=async()=>{
    alert("editing")
  }
  const handeleCourseComplete=async()=>{
    alert("completing")
  }
  const handledropout =async ()=>{
    alert("droping out")
  }
  return (
    <div>
      <NavBar />
      <AdminTitle />

      <div className="subNav">
        <p>Student info</p>
        <div></div>
        <p>Profile</p>
      </div>

      {/* ------------------------------------------- */}

      <div className="mainConatiner">
        <div className="headContainer">
          <div className="photoContainer">
            <img
              src={photoURL === "" || null ? alterIMG : photoURL}
              alt="Student_photo"
              height={160}
              width={125}
            />
            {/* <img src={alterIMG} alt="Student_photo" height={160} width={125}/> */}
          </div>
          <div className="CardConatainer">
            <p>{name}</p>
            <p> DIAT IT PROFESSIONAL PACKAGE</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <p>STUDENT ID : </p>
              <p> {s_id}</p>
            </div>

            <div>
              {" "}
              <NavDropdown
                title="Options"
                id="basic-nav-dropdown"
                // show={showDropdown}
                onToggle={setShowDropdown}
                onSelect={handleDropdownClose}
              >
                <NavDropdown.Item onClick={downloadPDF}>
                  <img
                    title="download pdf"
                    id="pdfBTN"
                    src={pdfIcon}
                    alt=""
                    height={20}
                  />{" "}
                  Get PDF
                </NavDropdown.Item>
                <NavDropdown.Item disabled onClick={handleEditdata}>
                  <img src={editIcon} height={20} alt="" />
                  Edit
                </NavDropdown.Item>
                <NavDropdown.Item disabled={status!=0} onClick={handeleCourseComplete}> 
                  <img src={completeIcon} height={20} alt="" />
                  Mark As Course Complete
                </NavDropdown.Item>
                <NavDropdown.Item disabled={status!=0} onClick={handledropout}>
                  <img src={dropIcon} height={20} alt="" />
                 Mark As Drop-Out
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleDeleteData}>
                  <img src={deleteIcon} height={20} alt="" />
                  Delete
                </NavDropdown.Item>
              </NavDropdown>
             
            </div>
          </div>
        </div>

        {/* ........................................................ */}

        <div className="listContainer">
          <div className="listRow">
            <div className="listColL">
              <p> Course Status </p>
            </div>
            <div className="listColR">
             {status===1?<p style={{color:"green"}}>Completed</p>:status===2? <p style={{color:"orange"}}>Drop Out</p>:<p >Ongoing</p>}
            </div> 
          </div>
          <div className="listRow">
            <div className="listColL">
              <p> Mobile </p>
            </div>
            <div className="listColR">
              <p> {mobile} </p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Email </p>
            </div>
            <div className="listColR">
              <p> {email}</p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Date Of Birth </p>
            </div>
            <div className="listColR">
              <p>{dob} </p>
            </div>
          </div>
          <div className="listRow">
            <div className="listColL">
              <p>Gender </p>
            </div>
            <div className="listColR">
              <p>{gender} </p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Adhar No </p>
            </div>
            <div className="listColR">
              <p>{adhar} </p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Address </p>
            </div>
            <div className="listColR">
              <p>
                {housename}(H) ,{place}, {postoffice}(PO), {district},{state}{" "}
              </p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Qualification </p>
            </div>
            <div className="listColR">
              <p>{qualification} </p>
            </div>
          </div>

          <div style={{ marginTop: "15px" }} className="listRow">
            <div className="listColL">
              <p> Guardian</p>
            </div>
            <div className="listColR">
              <p>{guardianName} </p>
            </div>
          </div>
          <div className="listRow">
            <div className="listColL">
              <p>Guardian's Contact </p>
            </div>
            <div className="listColR">
              <p> {guardianMobile}</p>
            </div>
          </div>

          <div style={{ marginTop: "15px" }} className="listRow">
            <div className="listColL">
              <p>Admission Date</p>
            </div>
            <div className="listColR">
              <p>{admission_date}</p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Class Start </p>
            </div>
            <div className="listColR">
              <p>{class_start}</p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Hostler </p>
            </div>
            <div className="listColR">
              <p>{hostler}</p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Placement </p>
            </div>
            <div className="listColR">
              <p>{placement}</p>
            </div>
          </div>

          <div style={{ marginTop: "15px" }} className="listRow">
            <div className="listColL">
              <p>Total Course Fee </p>
            </div>
            <div className="listColR">
              <p>{coursefee}</p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Discount/Fee concession </p>
            </div>
            <div className="listColR">
              <p>{discount}</p>
            </div>
          </div>

          <div id="paymentRow" className="listRow">
           {payment_completed===false?<> <div className="listColL">
              <p style={{ color: "red" }}>Fee Due </p>
            </div>
            <div className="listColR">
              <p>{fee_due}</p>
            </div>
            <div id="listColE" className="listColR">
              <Payment
                student_id={s_id}
                due={fee_due}
                c_id={c_id}
                setreloader={setreloader}
              />
            </div></>:<><div className="listColL">
              <p style={{ color: "green" }}>Fee Completed </p>
            </div>
            <div className="listColR">
              {/* <p>{fee_due}</p> */}
            </div>
            {/* <div id="listColE" className="listColR">
              <Payment disabled
                student_id={s_id}
                due={fee_due}
                c_id={c_id}
                setreloader={setreloader}
              />
            </div> */}
            </>}
          </div>
          <PaymentLog student_id={s_id} />
        </div>
      </div>

      {/* <div id="optionRow" className="">
        <div className="">
          <Button title="Disabled for now" variant="outline-primary">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
            Edit{" "}
          </Button>
        </div>
        <div className="">
          <Button title="Disabled for now" variant="outline-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check2-circle"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </svg>{" "}
            Completed
          </Button>
        </div>
      </div> */}

      {/* <div id="optionRow" className="">
        <div className="">
          <Button title="Drop out the Student" variant="outline-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-dash-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"
              />
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>{" "}
            Drop
          </Button>
        </div>
        <div className="">
          <Button title="Disabled for now" variant="outline-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-octagon"
              viewBox="0 0 16 16"
            >
              <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
            Delete
          </Button>
        </div>
      </div> */}

      <div className="subNav" id="footer">
        <p>DIAT</p>
        <div></div>
        {/* <p>Admin</p> */}
      </div>
    </div>
  );
};

export default StudentDetails;
