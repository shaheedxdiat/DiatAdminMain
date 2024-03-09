import React from "react";
import { Form, Row, Button, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const handlebackClick = () => {
    navigate(-1);
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
            class="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>{" "}
          Back
        </Button>
      </div>
      <h5>NEW REGISTRATION</h5>

      <div style={{ padding: "30px" }}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label> name</Form.Label>
              <Form.Control required type="text" placeholder=" name" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control required type="text" placeholder="mobile" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Row>
          {/* --------------------------------------------------------- */}
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <Form.Label> Date of Birth</Form.Label>
              <Form.Control required type="date" placeholder=" name" />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>State</Form.Label>
              <Form.Select required aria-label="Default select example">
                <option>Selecte State</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>District</Form.Label>
              <Form.Select required aria-label="Default select example">
                <option>Selecte District</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
          </Row>
          {/* --------------------------------------------------------- */}

          <div
            style={{
              width: "95%",
              boxShadow: "1px 1px 10px gray",
              height: "1px",
              margin: "35px",
            }}
          ></div>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label> Higher Education Qualification</Form.Label>
              <Form.Select required aria-label="Default select example">
                <option>Selecte Qualification</option>
                <option value="Post Graduation">Post Graduation</option>
                <option value="Under Graduation">Under Graduation</option>
                <option value="Polytechnic(3year diploma)">
                  Polytechnic(3year diploma)
                </option>
                <option value=" diploma">Diploma</option>
                <option value=" Plus Two">Plus Two</option>
                <option value=" SSLC">SSLC</option>
                <option value=" Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Pass Out Year</Form.Label>
              <Form.Control required type="text" placeholder=" year" />
            </Form.Group>
          </Row>
          {/* --------------------------------------------------------- */}
          <div
            style={{
              width: "95%",
              boxShadow: "1px 1px 10px black",
              height: "1px",
              margin: "35px",
            }}
          ></div>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label> Guardian name</Form.Label>
              <Form.Control required type="text" placeholder=" Guardian" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control required type="text" placeholder="mobile" />
            </Form.Group>
          </Row>
          <div
            style={{
              width: "95%",
              boxShadow: "1px 1px 10px black",
              height: "1px",
              margin: "35px",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems:"center",
              flexDirection: "column",
              width: "100%",
            margin:"25px ",
              gap: "20px",
            }}
          >
            <div style={{maxWidth:"30%"}}>
              {" "}
              <Form.Check
                defaultChecked
                type="switch"
                id="placement"
                label="placement needed"
              />
            </div>
            <div style={{maxWidth:"30%"}}>
              {" "}
              <Form.Check
                
                type="checkbox"
                id="placement"
                label="placement needed"
              />
            </div>

            
          </div>

          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </div>
  );
};

export default StudentRegistration;
