import React, { useEffect, useState } from "react";
import { Form, Row, Button, Pagination, Dropdown } from "react-bootstrap";
import { supabase } from "../../SupaBase";
import LogTable from "./LogTable";
import incomeSvg from "../../assests/images/income.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IncomeTab = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [income, setIncome] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" for newest, "asc" for oldest
  const [startDate, setStartDate] = useState(null);
  const itemsPerPage = 10;

  const fetchIncome = async (page) => {
    console.log("fetching income");
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    let query = supabase
      .from("other_income")
      .select("amount,date,description,cashier", {
        count: "exact",
      })
      .order("date", { ascending: sortOrder === "asc" })
      .range(start, end);

    // Filter by selected date
    if (startDate) {
      const formattedDate = startDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
      query = query.gte("date", formattedDate).lte("date", formattedDate);
    }

    const { data, error, count } = await query;

    if (error) {
      console.log("error in fetching income", error);
      return;
    }

    setData(data);
    const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
    setIncome(totalAmount);
    setTotalCount(count);
  };

  useEffect(() => {
    fetchIncome(currentPage);
  }, [currentPage, sortOrder, startDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Confirm the entry");
    if (confirm) {
      const { _, error } = await supabase.from("other_income").insert([
        {
          amount: Math.abs(amount),
          description: description,
          cashier: localStorage.getItem("admin"),
        },
      ]);
      console.log(_);
      fetchIncome(currentPage);
      setAmount("");
      setDescription("");

      if (error) {
        alert("Error in adding income");
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
        INCOME TAB
      </h4>

      <div className="firstexpdiv">
        <img
          className="mt-2"
          src={incomeSvg}
          height={350}
          width={350}
          alt=""
        />
        <div className="insightDiv">
          <Form onSubmit={handleSubmit} className="Formdiv">
            <h6>Add Income</h6>
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
              <p>Description</p>
              <Form.Control
                required
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <Button variant="success" type="submit">
              Enter
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
                setCurrentPage(1); // Reset to the first page
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
              className="form-control"
              maxDate={new Date()} // Restrict future dates
            />
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort by {sortOrder === "asc" ? "Oldest" : "Newest"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => handleSortChange("desc")}
              >
                Newest
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleSortChange("asc")}
              >
                Oldest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <LogTable
          data={data}
          total={income}
          theme={"success"}
          heading={"INCOME_LOG"}
          title={"INCOME_LOG"}
          color={"green"}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {totalPages > 1 && (
            <>
              {currentPage > 4 && (
                <>
                  <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>
                  <Pagination.Ellipsis />
                </>
              )}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  (pageNumber <= 4 || pageNumber >= totalPages - 2 || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) && (
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
                  <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>
                </>
              )}
            </>
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default IncomeTab;
