import React, { useState, useEffect } from "react";
import { Button, NavDropdown, Modal, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../SupaBase";
import "../assests/styles/StudentDetails.css";

import NavBar from "../components/NavBar";
import Payment from "../components/Payment";
import generatePDF from "../PDFGenerator";
import PaymentLog from "../components/PaymentLog";
import AdminTitle from "../components/AdminTitle";

import pdfIcon from "../assests/images/pdf_icon.png";
import deleteIcon from "../assests/images/icons8-delete-48.png";
import editIcon from "../assests/images/icons8-edit-64.png";
import completeIcon from "../assests/images/icons8-complete-48.png";
import dropIcon from "../assests/images/icons8-id-not-verified-48.png";
import alterIMG from "../assests/images/alterIMG.jpeg";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { c_id, s_id } = useParams();
  const [reloader, setreloader] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [adhar, setAdhar] = useState("");
  const [discount, setdiscount] = useState("");
  const [fee_due, setfee_due] = useState("");
  const [status, setstatus] = useState();
  const [payment_completed, setpayment_completed] = useState(false);
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
  const [coursename, setcoursename] = useState(c_id);
  const [admission_date, setadmission_date] = useState("");
  const [class_start, setaclass_start] = useState("");

  const [confirmID, setconfirmID] = useState("");

  useEffect(() => {
    const getFee = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("fee,course_name")
          .eq("courses_id", c_id);

        if (error) {
          console.error("Error fetching course fee:", error.message);
          return;
        }

        if (data.length > 0) {
          // console.log("data",data)
          setcoursefee(data[0].fee);
          setcoursename(data[0].course_name);
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
        .eq("student_id", s_id).eq("course_id",c_id)
        .neq("course_status", "3");

      if (data.length === 0) {
        console.log(error);
        alert("Invalid Student ID");
        navigate(`/course/${c_id}`);
      } else {
        setreloader(false);

        const studentData = data[0];
        setName(studentData.full_name);
        setMobile(studentData.mobile);
        setstatus(studentData.course_status);
        setpayment_completed(studentData.payment_completed);
        setgender(studentData.gender);
        setEmail(studentData.email);
        setDob(studentData.dob);
        setAdhar(studentData.adhar_number);
        setqualification(studentData.qualification);
        setfee_due(studentData.fee_due);
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

  // -----------------------------------delete modal----------------------------

  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const handleClose_delete = () => setshowDeleteConfirm(false);
  const handleShow_delete = () => setshowDeleteConfirm(true);

  const handleDeleteData = async () => {
    const { data, error } = await supabase
      .from("students")
      .update({ course_status: 3 })
      .eq("student_id", s_id);
    if (error) {
      alert("error in deleting student");
      console.log("error in deleting student", error);
      return;
    }
    alert("student deleted");
    console.log(data);
    navigate(-1);
  };

  // ------------------------------------drop modal---------------------
  const [showDropConfirm, setshowDropConfirm] = useState(false);
  const handleClose_drop = () => setshowDropConfirm(false);
  const handleShow_drop = () => setshowDropConfirm(true);

  const handledropout = async () => {
    const { data, error } = await supabase
      .from("students")
      .update({ course_status: 2 })
      .eq("student_id", s_id);
    if (error) {
      alert("error in drop student");
      console.log("error in drop student", error);
      return;
    }
    alert("student set as droped");
    console.log(data);
    navigate(0);
  };

  // ------------------------------------conpleting modal---------------

  const [showCompleteConfirm, setshowCompleteConfirm] = useState(false);
  const handleClose_complete = () => setshowCompleteConfirm(false);
  const handleShow_complete = () => setshowCompleteConfirm(true);
  const handeleCourseComplete = async () => {
    const { data, error } = await supabase
      .from("students")
      .update({ course_status: 1 })
      .eq("student_id", s_id);
    if (error) {
      alert("Cannot set complete");
      console.log("error in set complete", error);
      return;
    }
    alert("student set as course completed");
    console.log(data);
    navigate(0);
  };

  const handleEditdata = async () => {
    alert("Edit Not Impelemented");
  };

  const [showoption, setshowoption] = useState(false);
  const toggleoption = () => {
    setshowoption(!showoption);
    return;
  };

  return (
    <div>
      {/* -----------------------------------------delete confirm----------- */}

      <Modal
        show={showDeleteConfirm}
        onHide={handleClose_delete}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "200px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Delete Alert !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="p-2" style={{ color: "red" }}>
            This action will result to complete deletion of {s_id}
          </p>

          <Form.Control
            className="p-3"
            style={{ color: "orangered" }}
            onChange={(e) => {
              setconfirmID(e.target.value);
            }}
            type="text"
            placeholder="Enter the Student ID for confirmation"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_delete}>
            Cancel
          </Button>
          <Button
            disabled={confirmID !== s_id}
            variant="danger"
            onClick={() => {
              setconfirmID("");
              handleDeleteData();
            }}
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ------------------------------------------drop confirm---------------------- */}
      <Modal
        show={showDropConfirm}
        onHide={handleClose_drop}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "200px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Drop Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="p-2">This will set {s_id} as drop out</p>

          <Form.Control
            className="p-3"
            // style={{ color: "orangered" }}
            onChange={(e) => {
              setconfirmID(e.target.value);
            }}
            type="text"
            placeholder="Enter the Student ID for confirmation"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_drop}>
            Cancel
          </Button>
          <Button
            disabled={confirmID !== s_id}
            variant="danger"
            onClick={() => {
              setconfirmID("");
              handledropout();
            }}
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ------------------------------------------complete confirm---------------------- */}
      <Modal
        show={showCompleteConfirm}
        onHide={handleClose_complete}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "200px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>Course Complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="p-2">This will set the status of {s_id} as pass out</p>

          <Form.Control
            className="p-3"
            // style={{ color: "orangered" }}
            onChange={(e) => {
              setconfirmID(e.target.value);
            }}
            type="text"
            placeholder="Enter the Student ID for confirmation"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_complete}>
            Cancel
          </Button>
          <Button
            disabled={confirmID !== s_id}
            variant="success"
            onClick={() => {
              setconfirmID("");
              handeleCourseComplete();
            }}
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ---------------------------------------------------------------- */}

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
            <p>{coursename}</p>
            <div id="abcd" style={{ display: "flex", gap: "10px" }}>
              <p>STUDENT ID : </p>
              <p> {s_id}</p>
            </div>

            <span className="dropConatainer">
              {" "}
              <button id="toggleBTN" onClick={toggleoption}>
                options{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              </button>
              {showoption && (
                <div className="optionContainer">
                  <button className="option" onClick={downloadPDF}>
                    <img
                      title="download pdf"
                      id="pdfBTN"
                      src={pdfIcon}
                      alt=""
                      height={20}
                    />{" "}
                    Get PDF
                  </button>
                  <button className="option" onClick={handleEditdata}>
                    <img src={editIcon} height={20} alt="" />
                    Edit
                  </button>
                  <button
                    className="option"
                    disabled={status !== 0}
                    onClick={handleShow_complete}
                  >
                    <img src={completeIcon} height={20} alt="" />
                    Mark As Course Complete
                  </button>
                  <button
                    disabled={status !== 0}
                    onClick={handleShow_drop}
                    className="option"
                  >
                    <img src={dropIcon} height={20} alt="" />
                    Mark As Drop-Out
                  </button>
                  <NavDropdown.Divider />
                  <button className="option" onClick={handleShow_delete}>
                    <img src={deleteIcon} height={20} alt="" />
                    Delete
                  </button>
                </div>
              )}
            </span>
          </div>
        </div>

        {/* ........................................................ */}

        <div className="listContainer">
          <div className="listRow">
            <div className="listColL">
              <p> Course Status </p>
            </div>
            <div className="listColR">
              {status === 1 ? (
                <p style={{ color: "green" }}>Completed</p>
              ) : status === 2 ? (
                <p style={{ color: "orange" }}>Drop Out</p>
              ) : (
                <p>Ongoing</p>
              )}
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
            {payment_completed === false ? (
              <>
                {" "}
                <div className="listColL">
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
                </div>
              </>
            ) : (
              <>
                <div className="listColL">
                  <p style={{ color: "green" }}>Fee Completed </p>
                </div>
                <div className="listColR">{/* <p>{fee_due}</p> */}</div>
              </>
            )}
          </div>
          <PaymentLog student_id={s_id} />
        </div>
      </div>

      <div className="subNav" id="footer">
        <p>DIAT</p>
        <div></div>
        {/* <p>Admin</p> */}
      </div>
    </div>
  );
};

export default StudentDetails;
