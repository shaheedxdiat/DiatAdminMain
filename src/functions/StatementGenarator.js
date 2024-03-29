import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StatementGenerator = async (log, id) => {
  console.log(log);
  const doc = new jsPDF();

  doc.setFontSize(15);
  doc.setTextColor(128, 128, 128);
  doc.text(`PAYMENT SUMMARY - ${id}`, 15, 13);

  doc.setTextColor(0, 0, 0);

  const headers = [['S.No', 'Date', 'Amount', 'Description', 'Cashier']];

  const rows = log.map((statement, index) => [
    index + 1,
    statement.created_at.split('T')[0],
    statement.amount,
    statement.remark,
    statement.cashier.split('@')[0],
  ]);

  doc.autoTable({
    startY: 20,
    head: headers,
    body: rows,
    didDrawPage: function (data) {
      const pageNumber = data.pageNumber;
      doc.setTextColor(148, 148, 148);
      doc.setFontSize(10);
      doc.text('Page ' + pageNumber, data.settings.margin.right, doc.internal.pageSize.height - 10);

     
      const printedDate = new Date().toLocaleDateString('en-GB');
      const printedTime = new Date().toLocaleTimeString('en-US', { hour12: true });
      doc.text('Printed: ' + printedDate + ' ' + printedTime, data.settings.margin.left+14, doc.internal.pageSize.height - 10);

       },
  });

  doc.save(`STATEMENT_${id}.pdf`);

  return <div></div>;
};

export default StatementGenerator;
