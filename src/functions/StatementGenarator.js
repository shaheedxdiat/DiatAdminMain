import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const StatementGenerator =async (log,id) => {
 console.log(log);
  const doc = new jsPDF();

        
  doc.setFontSize(16);
  doc.setTextColor(128, 128, 128);
  doc.text(`STATEMENT - ${id}`, 15, 14);

  doc.setTextColor(0, 0, 0);

  const headers = [['S.No', 'Date', 'Amount','Description', 'Casier']];

  const rows = log.map((statement,index) => [index+1, statement.created_at.split("T")[0], statement.amount,statement.remark, statement.cashier]);


  doc.autoTable({
    startY: 20,
    head: headers,
    body: rows,
    didDrawPage: function (data) {
        const pageNumber = data.pageNumber;
        doc.setTextColor(128, 128, 128);

        doc.setFontSize(10);
        doc.text('Page ' + pageNumber, data.settings.margin.right, doc.internal.pageSize.height - 10);
      }
  });


  doc.save(`STATEMENT_${id}.pdf`);

  return (
    <div>
     
    </div>
  );
};

export default StatementGenerator;
