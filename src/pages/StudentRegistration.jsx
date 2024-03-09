import React, { useState } from "react";
import { Form, Row, Button, Col, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const StudentRegistration = () => {
  const navigate = useNavigate();

  const course = useParams();
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

  console.log(
    course.c_id,
    name,
    mobile,
    email,
    dob,
    state,
    district,
    qualification,
    passOutYear,
    guardianName,
    guardianMobile,
    "placement",
    placementNeeded,
    "hostle",
    hostlite
  );

  const handlebackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    // You can access form data here using state variables
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
      <h5>NEW REGISTRATION</h5>

      <div style={{ padding: "30px" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
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
              <Form.Label>State</Form.Label>
              <Form.Select required aria-label="State" value={state}>
                <option>Select State</option>
                <option value="Kerala">Kerala</option>
                <option value="Tamil Nadu" disabled={state !== "Kerala"}>
                  Tamil Nadu
                </option>
                <option value="Karnataka" disabled={state !== "Kerala"}>
                  Karnataka
                </option>
                <option value="Telangana" disabled={state !== "Kerala"}>
                  Telangana
                </option>
                <option value="Andhra Pradesh" disabled={state !== "Kerala"}>
                  Andhra Pradesh
                </option>
                <option value="Puducherry" disabled={state !== "Kerala"}>
                  Puducherry
                </option>
                <option value="Lakshadweep" disabled={state !== "Kerala"}>
                  Lakshadweep
                </option>
                <option
                  value="Andaman and Nicobar Islands"
                  disabled={state !== "Kerala"}
                >
                  Andaman and Nicobar Islands
                </option>
                <option value="Arunachal Pradesh" disabled={state !== "Kerala"}>
                  Arunachal Pradesh
                </option>
                <option value="Assam" disabled={state !== "Kerala"}>
                  Assam
                </option>
                <option value="Bihar" disabled={state !== "Kerala"}>
                  Bihar
                </option>
                <option value="Chhattisgarh" disabled={state !== "Kerala"}>
                  Chhattisgarh
                </option>
                <option value="Goa" disabled={state !== "Kerala"}>
                  Goa
                </option>
                <option value="Gujarat" disabled={state !== "Kerala"}>
                  Gujarat
                </option>
                <option value="Haryana" disabled={state !== "Kerala"}>
                  Haryana
                </option>
                <option value="Himachal Pradesh" disabled={state !== "Kerala"}>
                  Himachal Pradesh
                </option>
                <option value="Jharkhand" disabled={state !== "Kerala"}>
                  Jharkhand
                </option>
                <option value="Madhya Pradesh" disabled={state !== "Kerala"}>
                  Madhya Pradesh
                </option>
                <option value="Maharashtra" disabled={state !== "Kerala"}>
                  Maharashtra
                </option>
                <option value="Manipur" disabled={state !== "Kerala"}>
                  Manipur
                </option>
                <option value="Meghalaya" disabled={state !== "Kerala"}>
                  Meghalaya
                </option>
                <option value="Mizoram" disabled={state !== "Kerala"}>
                  Mizoram
                </option>
                <option value="Nagaland" disabled={state !== "Kerala"}>
                  Nagaland
                </option>
                <option value="Odisha" disabled={state !== "Kerala"}>
                  Odisha
                </option>
                <option value="Punjab" disabled={state !== "Kerala"}>
                  Punjab
                </option>
                <option value="Rajasthan" disabled={state !== "Kerala"}>
                  Rajasthan
                </option>
                <option value="Sikkim" disabled={state !== "Kerala"}>
                  Sikkim
                </option>
                <option value="Tripura" disabled={state !== "Kerala"}>
                  Tripura
                </option>
                <option value="Uttar Pradesh" disabled={state !== "Kerala"}>
                  Uttar Pradesh
                </option>
                <option value="Uttarakhand" disabled={state !== "Kerala"}>
                  Uttarakhand
                </option>
                <option value="West Bengal" disabled={state !== "Kerala"}>
                  West Bengal
                </option>
                <option value="Chandigarh" disabled={state !== "Kerala"}>
                  Chandigarh
                </option>
                <option
                  value="Dadra and Nagar Haveli and Daman and Diu"
                  disabled={state !== "Kerala"}
                >
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="Delhi" disabled={state !== "Kerala"}>
                  Delhi
                </option>
                <option value="Ladakh" disabled={state !== "Kerala"}>
                  Ladakh
                </option>
                <option value="Lakshadweep" disabled={state !== "Kerala"}>
                  Lakshadweep
                </option>
                <option value="Puducherry" disabled={state !== "Kerala"}>
                  Puducherry
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>District</Form.Label>
              <Form.Select
                required
                aria-label="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option>Select District</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option>
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
          <br />
          <hr />
          <br />
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Higher Education Qualification</Form.Label>
              <Form.Select
                required
                aria-label="Higher Education Qualification"
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
                type="text"
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
              <Form.Label>Guardian Name</Form.Label>
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
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setGuardianMobile(e.target.value);
                }}
                required
                type="text"
                placeholder="mobile"
              />
            </Form.Group>
          </Row>

          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </div>
  );
};

export default StudentRegistration;
