import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import ExpenseTab from "../components/ExpenseTab";
// import IncomeTab from "../components/IncomeTab";
import SummaryTab from "../components/tabs/SummaryTab";
import "../assests/styles/InsightPage.css";

import NavBar from "../components/NavBar";
import ExpenseTab from "../components/tabs/ExpenseTab";
import IncomeTab from "../components/tabs/IncomeTab";

const InsightPage2 = () => {
  const [activeTab, setActiveTab] = useState("expense");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
   <div>
<NavBar/>
<div className="m-4">
      <ul className="nav nav-tabs">
      <li className="nav-item">
          <button
            className={`nav-link  ${activeTab === "expense" ? "active" : ""} ` }
            onClick={() => handleTabChange("expense")}
          >
            Expense
          </button>
        </li>
        <li className="nav-item">
          <button
          
            className={`nav-link ${activeTab === "income" ? "active" : ""}`}
            onClick={() => handleTabChange("income")}
          >
            Income
          </button>
        </li>
      
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => handleTabChange("summary")}
          >
            Summary
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === "expense" && <ExpenseTab />}
        {activeTab === "income" && <IncomeTab />}
        {activeTab === "summary" && <SummaryTab />}
      </div>
    </div>
   </div>
  );
};

export default InsightPage2;
