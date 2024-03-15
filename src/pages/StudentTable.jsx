import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { supabase } from "../SupaBase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const StudentTable = () => {
  const navigate = useNavigate();
  const c_id = useParams();
  console.log(c_id);
  const [students, setstudents] = useState([]);
  console.log("students", students);
  // console.log(students[0].payment_completed);

  useEffect(() => {
    const getStudents = async () => {
      const { data, error } = await supabase
        .from("students")
        .select(
          "full_name ,student_id ,admission_date ,payment_completed ,course_status"
        )
        .eq("course_id", c_id.c_id)
        .neq("course_status", "3")
        .order("id");
      if (error) {
        console.log(error);
        return;
      }
      console.log("data", data);
      setstudents(data);
    };
    getStudents();
  }, [c_id]);

  function formatBatchName(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <NavBar />
      <div className="subNav">
        <p>Student Table</p>
        <div></div>
        <p>{c_id.c_id}</p>
      </div>
      <div style={{overflowX:"scroll" }} className="p-3">
        <Table
        //   style={{ overflowX: "hidden" }}
          striped
          bordered
          hover
          variant="dark"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Course Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => (
              <tr
                onDoubleClick={() => {
                  navigate(
                    `/course/${c_id.c_id}/student/${student.student_id}`
                  );
                }}
                key={student.student_id}
              >
                <td>{index + 1}</td>
                <td>{student.student_id}</td>
                <td>{student.full_name}</td>
                {/* <td>{student.admission_date}</td> */}
                <td>{formatBatchName(student.admission_date)}</td>
                <td>
                  <span
                    style={{
                      color:
                        student.course_status === 0
                          ? ""
                          : student.course_status === 1
                          ? "green"
                          : student.course_status === 2
                          ? "red"
                          : "gray",
                    }}
                  >
                    {" "}
                    {student.course_status === 0
                      ? "ongoing"
                      : student.course_status === 1
                      ? "completed"
                      : student.course_status === 2
                      ? "droped"
                      : "deleted"}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      color:
                        student?.payment_completed === true
                          ? "green"
                          : "inherit",
                    }}
                  >
                    {student?.payment_completed === true
                      ? "Completed"
                      : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StudentTable;
