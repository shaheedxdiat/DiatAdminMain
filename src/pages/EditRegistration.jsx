import React, { useEffect, useState } from "react";
import { Form, Row, Button, Col, InputGroup, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../SupaBase";


import "react-image-crop/dist/ReactCrop.css";

import states from "../assests/data/data.json";
import NavBar from "../components/NavBar";
import AdminTitle from "../components/AdminTitle";
const EditRegistration = () => {
  const [Details, setDetails] = useState([]);
  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleshowModal = (e) => {
    e.preventDefault();
    handleShow();
  };

  const navigate = useNavigate();
  const params = useParams();

  const stateNames = states.states.map((stateObj) => stateObj.state);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [adhar, setadhar] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [postoffice, setpostoffice] = useState("");
  const [place, setplace] = useState("");
  const [housename, sethousename] = useState("");
  const [qualification, setQualification] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianMobile, setGuardianMobile] = useState("");
  // const [placementNeeded, setPlacementNeeded] = useState(true);
  // const [hostlite, sethostlite] = useState(false);
  // const [discount, setdiscount] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [ID, setID] = useState("");
  const [File, setFile] = useState();
  // const [feedue, setfeedue] = useState();
  // const [coursefee, setcoursefee] = useState();
  const [class_start, setclass_start] = useState("");
  const admission_date = new Date();

  const [photoUploadWarning, setphotoUploadWarning] = useState(false);
  const [uploaded, setuploaded] = useState(false);

  const distObj = states.states.find((data) => data.state === state?state:"Kerala");

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", params.s_id);
      if (error) {
        console.log("error-details", error);
        return;
      }
      if (data[0]) {
        setDetails(data[0])
        setName(data[0].full_name);
        setMobile(data[0].mobile);
        setEmail(data[0].email);
        setadhar(data[0].adhar_number);
        setgender(data[0].gender);
        setDob(data[0].dob);
        setState(data[0].state);
        setDistrict(data[0].district);
        setpostoffice(data[0].post);
        setplace(data[0].place);
        sethousename(data[0].house_name);
        setQualification(data[0].qualification);
        setGuardianName(data[0].quardian);
        setGuardianMobile(data[0].quardian_mobile);
        // setPlacementNeeded(data[0].placement);
        // sethostlite(data[0].hosteler);
        // setdiscount(data[0].discount);
        setphotoURL(data[0].photoURL);
        setID(data[0].student_id);
      
        // setFile(data[0].File);
        // setfeedue(data[0].feedue);
        // setcoursefee(data[0].coursefee);
        setclass_start(data[0].class_start);
      }

      // console.log("data",data)
    };
    fetchDetails();
  }, [params]);

  const handleUpload = async (e) => {
    if (name === "") {
      setphotoUploadWarning(true);
      return;
    } else if (File.size / 1024 > 150) {
      alert("Photo must be less than 150 kB");
      return;
    }

    console.log(parseInt(File.size / 1024), "KB");

    const { data, error } = await supabase.storage
      .from("student_photos")
      .upload(`${name}_${Date.now()}.jpeg`, File);
    if (error) {
      console.error(error);
      return;
    }
    setphotoURL(
      `https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/${data.fullPath}`
    );
    setFile(null);
    setuploaded(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (File && !uploaded) {
      alert("upload the photo to sava details");
      return;
    }
    const { data, error } = await supabase
      .from("students")
      .update([
        {
          // student_id: ID,
          full_name: name,
          mobile: mobile,
          gender: gender,
          email: email,
          state: state.toUpperCase(),
          adhar_number: adhar,
          district: district.toUpperCase(),
          post: postoffice.toUpperCase(),
          place: place.toUpperCase(),
          house_name: housename.toUpperCase(),
          dob: dob,
          qualification: qualification.toUpperCase(),
          admission_date: admission_date,
          class_start: class_start,
          quardian: guardianName.toUpperCase(),
          quardian_mobile: guardianMobile,
          // placement: placementNeeded,
          // hosteler: hostlite,
          // discount: discount || 0,
          admissions_officer: "diat",
          course_id: params.c_id,
          photo_url: photoURL,
        },
      ])
      .eq("student_id", params.s_id)
      .select();
      // navigate('/home', { replace: true });

    if (error) {
      alert(error.message);
      console.log("error in registration", error);
      return;
    }
    if (data) {
      navigate(`/course/${params.c_id}/student/${ID}`, { replace: true });
    }
  };

  return (
    <div >
      <NavBar />
      <AdminTitle />

      <div className="subNav">
        <p>Edit</p>
        <div></div>
        <p>{params.s_id}</p> 
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Updation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Updating Student Details</div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <h3 style={{color:"gray"}}>UPDATE DETAILS <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></h3>
      <div style={{ padding: "40px" }}>
        <Form onSubmit={handleshowModal}>
          <Row className="mb-4">
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Name
              </span>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                // defaultValue={Details.full_name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value.toUpperCase());
                  setphotoUploadWarning(false);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Mobile
              </span>

              <Form.Control
                required
                type="tel"
                // defaultValue={Details.mobile}
                value={mobile}
                pattern="[[0-9]{10}"
                placeholder="Mobile"
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length <= 10 && value.match(/^\d+$/)) {
                    setMobile(value);
                  } else if (value.length > 10) {
                    value = value.slice(0, 10); // Truncate to 12 characters
                    setMobile(value);
                  } else {
                    setMobile("");
                  }
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustomUsername">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Email
              </span>

              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>

                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  // defaultValue={Details.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              {/* <Form.Label style={{ marginTop: "10px" }}>
                Date of Birth
              </Form.Label> */}
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Date Of Birth
              </span>

              <Form.Control
                required
                type="date"
                placeholder="Date of Birth"
                // defaultValue={Details.dob}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* ----------------------------------------------- */}
          <Row className="">
            <Form.Group
              className="mt-3"
              as={Col}
              md="2"
              controlId="validationCustom02"
            >
              <div className="d-flex bg- rounded-3 gap-4 justify-content-center mt-4 p-2">
                <div className="d-flex gap-2">
                  <Form.Check
                    type="radio"
                    onChange={() => setgender("Male")}
                    className=""
                    aria-label="radio 1"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                  />
                  <Form.Label style={{ marginTop: "" }}>Male</Form.Label>{" "}
                </div>

                <div className="d-flex  gap-2">
                  <Form.Check
                    type="radio"
                    onChange={() => setgender("Female")}
                    className=""
                    aria-label="radio 1"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                  />{" "}
                  <Form.Label style={{ marginTop: "" }}>Female</Form.Label>{" "}
                </div>
              </div>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom02">

              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                  marginTop:"8px"
                }}
              >
                Adhaar Number
              </span>

              <Form.Control
                required
                type="text"
                // defaultValue={Details.adhar_number}
                value={adhar}
                placeholder="UID No"
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length <= 12 && value.match(/^\d+$/)) {
                    setadhar(value);
                  } else if (value.length > 12) {
                    value = value.slice(0, 12); // Truncate to 12 characters
                    setadhar(value);
                  } else {
                    setadhar("");
                  }
                }}
              />
            </Form.Group>

            <Form.Group
              hidden={Details.photo_url !== ""}
              className="mt-2"
              as={Col}
              md="3"
              controlId="validationCustom02"
            >
              <Form.Label>Student Photo</Form.Label>

              <Form.Control
                // required
                type="file"
                placeholder="Photo"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />

              <br />

              {photoUploadWarning ? (
                <>
                  {/* <br /> */}
                  <p style={{ color: "orangered", fontSize: "12px" }}>
                    Enter student's name to upload photo
                  </p>
                </>
              ) : (
                <></>
              )}
              <Button
                disabled={uploaded || !File}
                variant={uploaded ? "success" : "primary"}
                onClick={handleUpload}
              >
                {uploaded ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-check2-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                    </svg>
                  </>
                ) : (
                  <>
                    Upload
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-cloud-arrow-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                      />
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                    </svg>
                  </>
                )}
              </Button>
            </Form.Group>

            <Form.Group
              className="mt-2"
              as={Col}
              md="3"
              controlId="validationCustom01"
            >
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Education Qualification
              </span>

              <Form.Select
                required
                aria-label=" Education Qualification"
                // value={qualification}

                onChange={(e) => setQualification(e.target.value.toUpperCase())}
              >
                <option>{Details.qualification}</option>
                <option value="Post Graduation">Post Graduation</option>
                <option value="Under Graduation">Under Graduation</option>
                <option value="Polytechnic(3year diploma)">
                  Polytechnic(3year diploma)
                </option>
                <option value="Diploma">Diploma</option>
                <option value="Plus Two">Plus Two</option>
                <option value="SSLC">SSLC</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <br />
          <hr />
          <br />

          {/* --------------------------------------------------------------------------------------- */}

          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                State
              </span>

              <Form.Select
                required
                aria-label="State"
                // defaultChecked={Details.state}
                // defaultValue={Details.state}
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option>{Details.state}</option>
                <option value={"Kerala"}>Kerala</option>
                {stateNames.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                District
              </span>

              <Form.Select
                required
                aria-label="District"
                // defaultValue={Details.district}
                value={district}

                onChange={(e) => setDistrict(e.target.value)}
              >
                <option>Select District</option>
                {distObj.districts?.map((data) => (
                  <option key={data}>{data}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <br />
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                  marginTop:"-26px"
                }}
              >
                Post Office
              </span>
              

              <Form.Control
                required
                type="text"
                placeholder="Post Office"
                // defaultValue={Details.post}
                value={postoffice}
                onChange={(e) => {
                  setpostoffice(e.target.value.toUpperCase());
                }}
              />
            </Form.Group>
          </Row>

          {/* ---------------------------------------------- */}
          <Row>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Place
              </span>

              <Form.Control
                required
                type="text"
                placeholder="Place"
                // defaultValue={Details.place}
                value={place}
                onChange={(e) => setplace(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                House Name
              </span>

              <Form.Control
                required
                type="text"
                placeholder="House Name / No"
                // defaultValue={Details.house_name}
                value={housename}
                onChange={(e) => sethousename(e.target.value.toUpperCase())}
              />
            </Form.Group>
          </Row>

          {/* ---------------------------------------------- */}

          {/* ----------------------------------------------------------- */}
          <Row className="mb-3"></Row>

          {/* ------------------------------------------------------------ */}
          <br />
          <hr />
          <br />
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Name of Guardian
              </span>

              <Form.Control
                required
                type="text"
                placeholder="Guardian Name"
                // defaultValue={Details.quardian}
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value.toUpperCase())}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                }}
              >
                Mobile of Guardian
              </span>

              <Form.Control
                required
                type="tel"
                pattern="[[0-9]{10}"
                // defaultValue={Details.quardian_mobile}
                value={guardianMobile}
                placeholder="Mobile"
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length <= 10 && value.match(/^\d+$/)) {
                    setGuardianMobile(value);
                  } else if (value.length > 10) {
                    value = value.slice(0, 10);
                    setGuardianMobile(value);
                  } else {
                    setGuardianMobile("");
                  }
                }}
              />
            </Form.Group>
          </Row>
          <br />
          <hr />

          {/* ---------------------------------------------------- */}

          {/* <Row className="m-4">
            <Form.Group
              as={Col}
              md="2"
              style={{
                boxShadow: "1px 2px 5px rgb(228, 227, 227)",
                borderRadius: "10px",
                margin: "10px",
                marginTop: "35px",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Form.Check
                defaultChecked={Details.placement}
                type="switch"
                id="placement"
                label="Placement "
                onChange={(e) => setPlacementNeeded(e.target.checked)}
              />
              <br />
            </Form.Group>
            <Form.Group
              className="mt-4"
              as={Col}
              md="2"
              style={{
                boxShadow: "1px 2px 5px rgb(228, 227, 227)",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Form.Check
                defaultChecked={Details.hosteler}
                type="checkbox"
                id="placement"
                label="hostlite"
                onChange={(e) => sethostlite(e.target.checked)}
              />
            </Form.Group>

            <Form.Group as={Col} md="3">
            <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                  marginTop:"15px"
                }}
              >
              Discount
              </span>
              <Form.Control
                style={{
                  boxShadow: "1px 2px 5px rgba(234, 25, 25, 0.225)",
                  border: "1px solid yellow",
                  color: "red",
                  fontWeight: "400",
                }}
                type="integer"
                // defaultValue={Details.discount}
                value={discount}
                placeholder="Discount / Fee Concession"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setdiscount(value);
                  } else {
                    setdiscount("");
                  }
                }}
              />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom01">
            <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  display: "block",
                  textAlign: "left",
                  padding: "5px",
                  marginTop:"15px"

                }}
              >
                Post Office
              </span>
              <Form.Control
                required
                type="date"
                placeholder="class starting date"
                // defaultValue={Details.class_start}
                value={class_start}
                onChange={(e) => setclass_start(e.target.value)}
              />
            </Form.Group>
          </Row> */}

          {/* <br />
          <hr />
          <br /> */}

          <Button
            style={{
              padding: "12px 50px",
              fontSize: "18px",
              fontWeight: "400",
              marginTop: "20px",
              marginBottom: "30px",
            }}
            variant="primary"
            type="submit"
            // disabled={
            //   mobile.length !== 10 ||
            //   guardianMobile.length !== 10 ||
            //   adhar.length !== 12 ||
            //   district === "Select District" ||
            //   postoffice === "" ||
            //   place === "" ||
            //   housename === "" ||
            //   guardianName === "" ||
            //   gender === ""
            // }
          >
            Save
            <svg
              style={{ margin: " 0px 5px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-floppy"
              viewBox="0 0 16 16"
            >
              <path d="M11 2H9v3h2z" />
              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
            </svg>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditRegistration;
