import { jsPDF } from "jspdf";
// import { supabase } from "./SupaBase";

const generateINVOICE = async (payment_data,student_data) => {



  // alert("INVOICE is downloading");




  const doc = new jsPDF(); 
  // const lineHeight = 1;
  let y = 10;

  const companyName = "DIALOGUE INSTITUTE OF ADVANCED TECHNOLOGY";
  const companyAddress = "Maharani shopping complex,";
  const companyAddress2 = " Karadi, Thamarassery, Pincode: 673573";
  const companyContact = "Phone: +91 8960886633, ";
  const GSTIN="GSTN: 32AASFD1915F1ZO"
  // const billNo=payment_data[0].i


  
  const logoUrl = "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/diat_logo_main-min.png";
  const logoWidth = 40;


 
  doc.addImage(
    logoUrl,
    "PNG",
    doc.internal.pageSize.width / 7 - logoWidth / 2,
    y/2,
   y*5,
   y*5
  );

  doc.setFontSize(17);
  doc.text(companyName, doc.internal.pageSize.width / 1.8, 1.5*y, { align: "center" });
  doc.setFontSize(9);
  doc.text(companyAddress, doc.internal.pageSize.width / 1.8, 2.5*y, { align: "center" });
  doc.text(companyAddress2, doc.internal.pageSize.width / 1.8, 3*y, { align: "center" });
  doc.text(companyContact, doc.internal.pageSize.width / 1.8, 3.5*y, { align: "center" });
  doc.text(GSTIN, doc.internal.pageSize.width / 1.8, 4*y, { align: "center" });


  doc.setLineWidth(0.2); 
doc.line(20, 45,  185, 45);
  // ...........................................................................................................

  doc.setFontSize(10);
  doc.text("Receipt/Bill No ", doc.internal.pageSize.width / 15, 6*y, { align: "left" });
  doc.text(`: 000${payment_data[0].id.toString()}`, doc.internal.pageSize.width / 4.8, 6*y, { align: "left" });

  doc.text("Name ", doc.internal.pageSize.width / 15, 7*y, { align: "left" });
  doc.text(`: ${student_data[0].full_name.toString()}`, doc.internal.pageSize.width / 4.8, 7*y, { align: "left" });

  // ---------

  doc.text("Register ID ", doc.internal.pageSize.width / 2, 6*y, { align: "center" });
  doc.text(`: ${student_data[0].student_id.toString()}`, doc.internal.pageSize.width / 1.8, 6*y, { align: "left" });


// --------

doc.text("Date", doc.internal.pageSize.width -50, 6*y, { align: "left" });
doc.text(`: ${payment_data[0].created_at.toString().split('T')[0]}`, doc.internal.pageSize.width-35, 6*y, { align: "left" });

doc.text("Course", doc.internal.pageSize.width -50, 7*y, { align: "left" });
doc.text(`: ${student_data[0].course_id.toString()}`, doc.internal.pageSize.width-35, 7*y, { align: "left" });

doc.text(` ${payment_data[0].remark.toString()}`, 50, 9*y, { align: "left" });



doc.text(`Paid`, 100,9*y)
doc.text(`: ${payment_data[0].amount} .00`, 120,9*y)
doc.text(`Balance`, 100,10*y)
doc.text(`: ${student_data[0].fee_due} .00`, 120,10*y)




// const table = doc.table({
//   head: [['Item', 'Description', 'Amount']],
//   body: [
//     ['Course Fee', 'amount'],
//     // Add more data rows as needed
//   ],
//   headStyles: {
//     textColor: [0, 0, 255], // Blue color for headers
//     fontSize: 12,
//     lineWidth: 0.5,
//   },
//   bodyStyles: {
//     fontSize: 10,
//     lineWidth: 0.
// doc.autoTable(table, { startY: 50 }); // Start table at y position 50



  doc.save(`DIAT_000${payment_data[0].id}.pdf`);
};

export default generateINVOICE;
