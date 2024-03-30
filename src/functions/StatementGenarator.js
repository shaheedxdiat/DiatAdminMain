import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StatementGenerator = async (logs, heading, id) => {
  const doc = new jsPDF();
  doc.setFontSize(15);
  doc.setTextColor(128, 128, 128);
  doc.text(`${heading}  ${id ? id : ""}`, 15, 13);

  doc.setTextColor(0, 0, 0);

  const headers = Object.keys(logs[0])
    .filter((header) => header !== "date")
    .map((header) => header.charAt(0).toUpperCase() + header.slice(1));

  const rows = logs.map((log, index) => {
    const formattedDate =
      new Date(log.date).toLocaleDateString("en-GB") +
      "  " +
      new Date(log.date).toLocaleTimeString("en-IN");

    const { date, ...logWithoutDate } = log;

    return [index + 1, formattedDate, ...Object.values(logWithoutDate)];
  });

  doc.autoTable({
    startY: 20,
    head: [["S.No", "Date", ...headers]],
    body: rows,
    didDrawPage: function (data) {
      const pageNumber = data.pageNumber;
      doc.setTextColor(148, 148, 148);
      doc.setFontSize(10);
      doc.text(
        "Page " + pageNumber,
        data.settings.margin.right,
        doc.internal.pageSize.height - 10
      );

      const printedDate = new Date().toLocaleDateString("en-GB");
      const printedTime = new Date().toLocaleTimeString("en-US", {
        hour12: true,
      });
      doc.text(
        "Printed: " + printedDate + " " + printedTime,
        data.settings.margin.left + 14,
        doc.internal.pageSize.height - 10
      );
    },
  });

  doc.save(`${heading}_${id}.pdf`);

  return <div></div>;
};

export default StatementGenerator;
