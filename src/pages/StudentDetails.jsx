import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { supabase } from "../SupaBase";
import "../assests/styles/StudentDetails.css";

import alterIMG from "../assests/images/alterIMG.jpeg";
const StudentDetails = () => {
  const navigate = useNavigate();
  const { c_id, s_id } = useParams();
  // console.log(c_id, s_id);

  // State variables for form fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [adhar, setAdhar] = useState("");
  const [discount, setdiscount] = useState("");
  const [fee_due, setfee_due] = useState("");
  const [admissions_officer, setadmissions_officer] = useState("");
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
  // console.log("placement:",placement,"hostler :",hostler)

  const alterURL = "https://images.app.goo.gl/tFyC7Ma4avJFSiuL8";

  useEffect(() => {
    const getStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", s_id);

      if (data.length === 0) {
        console.log(error);
        alert("Invalid Student ID");
        navigate(`/course/${c_id}`);
      } else {
        console.log(data[0]);
        // Update state with fetched data
        const studentData = data[0]; // Assuming there's only one student with given ID
        setName(studentData.full_name);
        setMobile(studentData.mobile);
        setEmail(studentData.email);
        setDob(studentData.dob);
        setAdhar(studentData.adhar_number);
        setqualification(studentData.qualification);
        setfee_due(studentData.fee_due);
        setadmissions_officer(studentData.admissions_officer);
        setState(studentData.state);
        setDistrict(studentData.district);
        setPostOffice(studentData.post);
        setPlace(studentData.place);
        setHouseName(studentData.house_name);
        setGuardianName(studentData.quardian);
        setGuardianMobile(studentData.quardian_mobile);
        setphotoURL(studentData.photo_url);
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
  }, [s_id, c_id, navigate]);

  const handleshowModal = (e) => {
    // Add your form submission logic here
    e.preventDefault();
    // Example: console.log(name, mobile, email, dob, adhar, passOutYear, state, district, postoffice, place, housename, guardianName, guardianMobile);
  };

  return (
    <div>
      <NavBar />
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
            <div style={{ display: "flex", gap: "10PX" }}>
              <p>STUDENT ID : </p>
              <p> {s_id}</p>
            </div>
          </div>
        </div>

        {/* ........................................................ */}

        <div className="listContainer">
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
              <p>21/05/2024</p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Class start </p>
            </div>
            <div className="listColR">
              <p>01/06/2024</p>
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
              <p>{96000}</p>
            </div>
          </div>

          <div className="listRow">
            <div className="listColL">
              <p>Discount/Fee consession </p>
            </div>
            <div className="listColR">
              <p>{discount}</p>
            </div>
          </div>

          <div id="paymentRow" className="listRow">
            <div className="listColL">
              <p style={{ color: "red" }}>Fee Due </p>
            </div>
            <div className="listColR">
              <p>{fee_due}</p>
            </div>
            <div id="listColE" className="listColR">
              <Button variant="success">Payment</Button>
            </div>
          </div>
        </div>
      </div>

      <div id="optionRow" className="">
            <div className="">
             <Button disabled>Edit Details</Button>
            </div>
            <div className="">
             <Button disabled variant="danger">Delete Student</Button>
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
