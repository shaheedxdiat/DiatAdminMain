import React, { useEffect, useState } from "react";
import { Form, Row, Button, Pagination, Dropdown } from "react-bootstrap";
import { supabase } from "../../SupaBase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

import expensesvg from "../../assests/images/expense.svg";
import LogTable from "./LogTable";

const ExpenseTab = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [data, setData] = useState([]);
  const [expense, setExpense] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" for newest, "asc" for oldest
  const [startDate, setStartDate] = useState(null);
  const itemsPerPage = 10;

  const fetchexpense = async (page) => {
    console.log("fetching expense");
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    let query = supabase
      .from("expense_chart")
      .select("amount,date,description,invoice_number,cashier", {
        count: "exact",
      })
      .order("date", { ascending: sortOrder === "asc" })
      .range(start, end);

    if (startDate) {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0); // Start of the day
      const endOfDay = new Date(startDate);
      endOfDay.setHours(23, 59, 59, 999); // End of the day

      query = query
        .gte("date", startOfDay.toISOString())
        .lte("date", endOfDay.toISOString());
    }

    const { data, error, count } = await query;

    if (error) {
      console.log("expense fetch error", error);
      return;
    }

    setData(data);
    const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
    setExpense(totalAmount);
    setTotalCount(count);
  };

  useEffect(() => {
    fetchexpense(currentPage);
  }, [currentPage, sortOrder, startDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Confirm the entry");
    if (confirm) {
      const { _, error } = await supabase.from("expense_chart").insert([
        {
          amount: Math.abs(amount),
          description: description,
          invoice_number: invoiceNo,
          cashier: localStorage.getItem("admin"),
        },
      ]);
      fetchexpense(currentPage);
      setAmount("");
      setDescription("");
      setInvoiceNo("");

      if (error) {
        alert("Error in adding expense");
        console.log(error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <h4
        style={{
          position: "absolute",
          left: "30px",
          marginTop: "10px",
          color: "rgb(200,200,200)",
          textShadow: "1px 2px 5px rgb(210,210,210)",
        }}
      >
        EXPENSE TAB
      </h4>

      <div className="firstexpdiv">
        <img
          className="mt-2"
          src={expensesvg}
          height={350}
          width={350}
          alt=""
        />
        <div className="insightDiv">
          <Form onSubmit={handleSubmit} className="Formdiv">
            <h6>Add Bill</h6>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Amount </p>
              <Form.Control
                required
                type="text"
                value={amount}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.match(/^\d+$/)) {
                    setAmount(value);
                  } else {
                    setAmount("");
                  }
                }}
              />
            </div>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Description </p>
              <Form.Select
                required
                onChange={(e) => setDescription(e.target.value)}
              >
                <option>Select</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Internet Bill">Internet Bill</option>
                <option value="Room rent">Room rent</option>
                <option value="Salary">Salary</option>
                <option value="Class room maintenance">
                  Class room maintenance
                </option>
                <option value="Travel expense">Travel expense</option>
                <option value="Purchase">Purchase</option>
              </Form.Select>
            </div>
            <div
              className="inputandlable"
              as={Row}
              controlId="validationCustom01"
            >
              <p>Invoice No </p>
              <Form.Control
                type="text"
                value={invoiceNo}
                onChange={(e) => {
                  setInvoiceNo(e.target.value);
                }}
              />
            </div>
            <Button variant="danger" type="submit">
              Add Bill
            </Button>
          </Form>
        </div>
      </div>
      <div className="px-5">
        <hr />
      </div>

      <div className="secexpdiv">
        <div className="d-flex justify-content-between mx-3 my-2">
          <div className="d-flex align-items-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setCurrentPage(1); 
                
              }}
              dateFormat="dd-MM-yyy"
              placeholderText="Select Date"
              className="form-control"
              maxDate={new Date()}
            />
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="outline" id="dropdown-basic">
              Sort by {sortOrder === "asc" ? "Oldest" : "Newest"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => handleSortChange("desc")}>
                Newest
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => handleSortChange("asc")}>
                Oldest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <LogTable
          data={data}
          total={expense}
          theme={""}
          title={"EXPENSE_LOG"}
          color={"red"}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="d-flex flex-column justify-content-center mt-4">
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {totalPages > 1 && (
            <>
              {currentPage > 4 && (
                <>
                  <Pagination.Item onClick={() => handlePageChange(1)}>
                    1
                  </Pagination.Item>
                  <Pagination.Ellipsis />
                </>
              )}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  (pageNumber <= 4 ||
                    pageNumber >= totalPages - 2 ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)) && (
                    <Pagination.Item
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      active={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  )
                );
              })}
              {currentPage < totalPages - 3 && (
                <>
                  <Pagination.Ellipsis />
                  <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </Pagination.Item>
                </>
              )}
            </>
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
        <p style={{ color: "gray", fontSize: "13px" }}>
          showing result from {totalCount} data
        </p>
      </div>
    </div>
  );
};

export default ExpenseTab;
