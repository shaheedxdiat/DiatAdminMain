import React, { useEffect, useState } from "react";
import { Form, Row, Button, Col, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../SupaBase";
import { genarateStudentId } from "../genarateID";
import states from "../states&dists/data.json";

const StudentRegistration = () => {
  const navigate = useNavigate();

  const course = useParams();

  const stateNames = states.states.map((stateObj) => stateObj.state);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("Kerala");
  const [district, setDistrict] = useState("");
  const [qualification, setQualification] = useState("");
  const [passOutYear, setPassOutYear] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianMobile, setGuardianMobile] = useState("");
  const [placementNeeded, setPlacementNeeded] = useState(true);
  const [hostlite, sethostlite] = useState(false);
  const [photoURL, setphotoURL] = useState("");
  const [GenaratedID, setGenaratedID] = useState("");
  const [File, setFile] = useState();

  const [photoUploadWarning, setphotoUploadWarning] = useState(false);
  const [uploaded, setuploaded] = useState(false);
  // console.log(GenaratedID);

  const distObj = states.states.find((data) => data.state === state);

  //   console.log(
  //     course.c_id,
  //     name,
  //     mobile,
  //     email,
  //     dob,
  //     state,
  //     district,
  //     qualification,
  //     passOutYear,
  //     guardianName,
  //     guardianMobile,
  //     "placement",
  //     placementNeeded,
  //     "hostle",
  //     hostlite
  //   );

  useEffect(() => {
    genarateStudentId(course)
      .then(({ id }) => {
        setGenaratedID(id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [course]);

  const handlebackClick = () => {
    navigate(-1);
  };
  const handleUpload = async (e) => {
    if (name === "") {
      setphotoUploadWarning(true);
      return;
    } else if (File.size / 1024 > 150) {
      alert("too large");
      return;
    }

    console.log(parseInt(File.size / 1024), "KB");

    const { data, error } = await supabase.storage
      .from("student_photos")
      .upload(`${name}_${Date.now()}.jpeg`, File);
      if (error) {
          console.error(error)
          return
      }
      setFile(null)
    setuploaded(true);
      setphotoURL(`https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/${data.fullPath}`)
      console.log("uploaded",data)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("students")
      .insert([
        {
          student_id: GenaratedID,
          full_name: name,
          mobile: mobile,
          email: email,
          state: state,
          district: district,
          //   post:post,
          // place:place,
          //   house_name:house_name,
          photo_url: photoURL,
          dob: dob,
          qualification: qualification,
          year: passOutYear,
          quardian: guardianName,
          quardian_mobile: guardianMobile,
          placement: placementNeeded,
          hosteler: hostlite,
          //   discount:discount,
          admissions_officer: "diat",
          course_id: course.c_id,
        },
      ])
      .select();
    if (error) {
      alert(error.message);
      console.log("error in registration", error);
    }
    console.log("added", data);
    alert("student added");
    navigate(`/course/${course.c_id}`);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          padding: "40px",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Button variant="outline-primary" onClick={handlebackClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>{" "}
          Back
        </Button>
      </div>
      <h4 style={{ color: "orange" }}>NEW ADMISSION</h4>

      <div style={{ padding: "30px" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value.toUpperCase());
                  setphotoUploadWarning(false);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label></Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label></Form.Label>
              <Form.Select
                required
                aria-label="State"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option>Select State</option>
                <option value={"Kerala"}>Kerala</option>
                {stateNames.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label> </Form.Label>
              <Form.Select
                required
                aria-label="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option>Select District</option>
                {distObj.districts.map((data) => (
                  <option>{data}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <br />

              <div
                style={{
                  //   display: "flex",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  //   flexDirection: "column",
                  //   width: "100%",
                  margin: "0px 30px ",
                  gap: "20px",
                }}
              >
                <div style={{ maxWidth: "30%" }}>
                  {" "}
                  <Form.Check
                    defaultChecked
                    type="switch"
                    id="placement"
                    label="Placement "
                    onChange={(e) => setPlacementNeeded(e.target.checked)}
                  />
                </div>
                <br />
                <div style={{ maxWidth: "30%" }}>
                  {" "}
                  <Form.Check
                    type="checkbox"
                    id="placement"
                    label="hostlite"
                    onChange={(e) => sethostlite(e.target.checked)}
                  />
                </div>
              </div>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group>
              <Form.Label>Student Photo</Form.Label>
              <Form.Control
                required
                type="file"
                placeholder="Photo"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <br />

              {photoUploadWarning ? (
                <>
                  <br />
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
                  <><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                </svg></>
                ) : (
                  <>Upload
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
          </Row>
          <br />
          <hr />
          <br />
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label> Education Qualification</Form.Label>
              <Form.Select
                required
                aria-label=" Education Qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value.toUpperCase())}
              >
                <option>Select Qualification</option>
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
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Pass Out Year</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Pass Out Year"
                value={passOutYear}
                onChange={(e) => setPassOutYear(e.target.value)}
              />
            </Form.Group>
          </Row>
          <br />
          <hr />
          <br />
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Guardian Name"
                value={guardianName}
                onChange={(e) =>
                  setGuardianName(e.target.value.toLocaleUpperCase())
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label></Form.Label>
              <Form.Control
                onChange={(e) => {
                  setGuardianMobile(e.target.value);
                }}
                required
                type="mobile"
                placeholder="mobile"
              />
            </Form.Group>
          </Row>

          <Button type="submit">Save</Button>
        </Form>
      </div>
    </div>
  );
};

export default StudentRegistration;
