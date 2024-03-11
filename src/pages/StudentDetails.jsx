import React, { useState, useEffect } from "react";
// import { Button, Form, Row, Col,InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { supabase } from "../SupaBase";
import  "../assests/styles/fromStyle.css";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { c_id, s_id } = useParams();
  console.log(c_id, s_id);

  // State variables for form fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [adhar, setAdhar] = useState("");
  const [passOutYear, setPassOutYear] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [postoffice, setPostOffice] = useState("");
  const [place, setPlace] = useState("");
  const [housename, setHouseName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianMobile, setGuardianMobile] = useState("");
  const [photoURL, setphotoURL] = useState("")
  

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
        // Update state with fetched data
        const studentData = data[0]; // Assuming there's only one student with given ID
        setName(studentData.full_name);
        setMobile(studentData.mobile);
        setEmail(studentData.email);
        setDob(studentData.dob);
        setAdhar(studentData.adhar);
        setPassOutYear(studentData.passOutYear);
        setState(studentData.state);
        setDistrict(studentData.district);
        setPostOffice(studentData.postoffice);
        setPlace(studentData.place);
        setHouseName(studentData.housename);
        setGuardianName(studentData.guardianName);
        setGuardianMobile(studentData.guardianMobile);
        setphotoURL(studentData.photo_url)
        
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
    <NavBar/>
    <div>
    <form onSubmit={handleshowModal}>
      <div className="row-margin mb-4">
        <div>
          <label htmlFor="name" className="bold-label">Name:</label>
          <span className="value-span">{name}</span>
        </div>
        <div>
          <label htmlFor="mobile" className="bold-label">Mobile:</label>
          <span className="value-span">{mobile}</span>
        </div>
        <div>
          <label htmlFor="email" className="bold-label">Email:</label>
          <span className="value-span">{email}</span>
        </div>
        <div>
          <label htmlFor="dob" className="bold-label">Date of Birth:</label>
          <span className="value-span">{dob}</span>
        </div>
      </div>

      {/* ----------------------------------------------- */}

      <div className="row-margin">
        <div>
          <label htmlFor="adhar" className="bold-label">UID No:</label>
          <span className="value-span">{adhar}</span>
        </div>
        <div>
          <label htmlFor="photoURL" className="bold-label">Student Photo:</label>
          <img src={photoURL} alt="" height={250} width={200} />
        </div>
        <div>
          <label htmlFor="educationQualification" className="bold-label">Education Qualification:</label>
          {/* <span className="value-span">{educationQualification}</span> */}
        </div>
        <div>
          <label htmlFor="passOutYear" className="bold-label">Pass Out Year:</label>
          <span className="value-span">{passOutYear}</span>
        </div>
      </div>

      <br />
      <hr />
      <br />

      {/* --------------------------------------------------------------------------------------- */}

      <div className="row-margin mb-3">
        <div>
          <label htmlFor="state" className="bold-label">State:</label>
          <span className="value-span">{state}</span>
        </div>
        <div>
          <label htmlFor="district" className="bold-label">District:</label>
          <span className="value-span">{district}</span>
        </div>
        <div>
          <label htmlFor="postoffice" className="bold-label">Post Office:</label>
          <span className="value-span">{postoffice}</span>
        </div>
      </div>

      {/* ---------------------------------------------- */}
      <div className="row-margin">
        <div>
          <label htmlFor="place" className="bold-label">Place:</label>
          <span className="value-span">{place}</span>
        </div>
        <div>
          <label htmlFor="housename" className="bold-label">House Name / No:</label>
          <span className="value-span">{housename}</span>
        </div>
      </div>

      {/* ---------------------------------------------- */}

      {/* ----------------------------------------------------------- */}
      {/* <Row className="mb-3"></Row> */}

      {/* ------------------------------------------------------------ */}
      <br />
      <hr />
      <br />
      <div className="row-margin mb-3">
        <div>
          <label htmlFor="guardianName" className="bold-label">Guardian Name:</label>
          <span className="value-span">{guardianName}</span>
        </div>

        <div>
          <label htmlFor="guardianMobile" className="bold-label">Guardian Mobile:</label>
          <span className="value-span">{guardianMobile}</span>
        </div>
      </div>
      <br />
      <hr />
    </form>








  {/* ---------------------------------------------------- */}

 
   
    </div>

    </div>
  );
};

export default StudentDetails;
