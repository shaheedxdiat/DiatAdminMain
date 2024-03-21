import { jsPDF } from "jspdf";
import numberToWords from "number-to-words";
import footer from "../assests/images/diat_footer.png";

const generateINVOICE = async (payment_data, student_data) => {
  const doc = new jsPDF();

  let y = 10;

  const companyName = "DIALOGUE INSTITUTE OF ADVANCED TECHNOLOGY";
  // const companyAddress = "VC Tower, Karadi, Thamarassery";
  // const companyAddress2 = "Pincode: 673573, Phone: +91 8960886633";
  // const companyContact = "";

  // const logoUrl =
  //   "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/diat_main_logo_with_bg-min%20(1).png";

  // doc.addImage(logoUrl, "PNG", 11, 9, y * 3, y * 1.5);

  doc.setFontSize(17);
  doc.text(companyName, doc.internal.pageSize.width / 2, 1.5 * y, {
    align: "center",
  });
  // doc.setFontSize(9);
  // doc.text(companyAddress, doc.internal.pageSize.width / 1.8, 2.1 * y, {
  //   align: "center",
  // });
  // doc.text(companyAddress2, doc.internal.pageSize.width / 1.8, 2.6 * y, {
  //   align: "center",
  // });
  // doc.text(companyContact, doc.internal.pageSize.width / 1.8, 3.1 * y, {
  //   align: "center",
  // });

  doc.setDrawColor(0, 0, 0, 0.5);
  doc.setLineWidth(0.2);
  doc.line(10, 35, 200, 35);


  doc.setDrawColor(0, 0, 0, 0.1);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("INVOICE", doc.internal.pageSize.width / 2.2, 2.6 * y, {
    align: "left",
  });
  // ...........................................................................................................

  doc.setFont("helvetica", "normal");

  doc.text("Student Name ", doc.internal.pageSize.width / 15, 5 * y, {
    align: "left",
  });
  doc.text(
    `: ${student_data[0].full_name.toString()}`,
    doc.internal.pageSize.width / 4,
    5 * y,
    { align: "left" }
  );

  doc.text("Student ID ", doc.internal.pageSize.width / 15, 6 * y, {
    align: "left",
  });
  doc.text(
    `: ${student_data[0].student_id.toString()}`,
    doc.internal.pageSize.width / 4,
    6 * y,
    { align: "left" }
  );

  // ---------
const billdate=payment_data[0].created_at.toString().split("T")[0]

const parts1 = billdate.split("-"); 
const formattedbilldate = `${parts1[2]}-${parts1[1]}-${parts1[0]}`; 

  doc.text("Bill Date", doc.internal.pageSize.width - 70, 5 * y, {
    align: "left",
  });
  doc.text(
    `: ${formattedbilldate}`,
    doc.internal.pageSize.width - 35,
    5 * y,
    { align: "left" }
  );

  doc.text("Bill No ", doc.internal.pageSize.width - 70, 6 * y, {
    align: "left",
  });
  doc.text(
    `: 000${payment_data[0].id.toString()}`,
    doc.internal.pageSize.width / 1.2,
    6 * y,
    { align: "left" }
  );

  doc.setLineWidth(0.1);
  doc.line(10, 67, 200, 67);

  doc.setLineWidth(0.1);
  doc.line(10, 77, 200, 77);

  doc.setTextColor(0, 0, 0, 0.7);
  doc.text("SI No ", doc.internal.pageSize.width / 15, 73, {
    align: "left",
  });

  doc.setTextColor(0, 0, 0, 0.7);
  doc.text("Description", doc.internal.pageSize.width - 155, 73, {
    align: "left",
  });

  doc.setTextColor(0, 0, 0, 0.7);
  doc.text("Amount", doc.internal.pageSize.width - 25, 73, {
    align: "left",
  });



  doc.setTextColor(0, 0, 0);

  doc.text("1 ", doc.internal.pageSize.width / 13, 87, {
    align: "left",
  });

  doc.text(` ${payment_data[0].remark.toString()}`, 53, 87, {
    align: "left",
  });

  doc.text(
    `${payment_data[0].amount}.00`,
    doc.internal.pageSize.width - 12,
    87,
    {
      align: "right",
    }
  );
  doc.setFont("helvetica", "normal");

  doc.setLineWidth(0.1);
  doc.line(10, 95, 200, 95);

  doc.text(`Net Amount`, doc.internal.pageSize.width - 80, 101);
  doc.text(
    `${Math.floor(payment_data[0].amount * 0.82)}.00`,
    doc.internal.pageSize.width - 12,
    101,
    {
      align: "right",
    }
  );
  doc.setLineWidth(0.1);
  doc.line(10, 105, 200, 105);

  const amount = payment_data[0].amount; 

  const TaxableAmount=Math.floor(amount * 0.82)

  doc.text(`GST`, doc.internal.pageSize.width - 80, 111);
  doc.text(
    `${Math.floor(amount-TaxableAmount)}.00`,
    doc.internal.pageSize.width - 12,
    111,
    {
      align: "right",
    }
  );
  doc.setLineWidth(0.1);
  doc.line(10, 115, 200, 115);

  doc.setFont("helvetica", "bold");
  doc.text(`Total`, doc.internal.pageSize.width - 80, 121);
  doc.text(
    `${payment_data[0].amount}.00`,
    doc.internal.pageSize.width - 12,
    121,
    {
      align: "right",
    }
  );
  doc.setLineWidth(0.1);

  // const amount = payment_data[0].amount; 
  const words = numberToWords.toWords(amount);


  doc.setFont("helvetica", "normal");
  doc.text(`Total In Words `, doc.internal.pageSize.width / 13, 131);
  doc.text(`: Rupees  ${words} only`, doc.internal.pageSize.width - 150, 131);
  doc.setLineWidth(0.1);

  doc.text(`Balance Fee `, doc.internal.pageSize.width / 13, 141);
 if (student_data[0].fee_due===0) {
  doc.text(
    `: Fee Completed`,
    doc.internal.pageSize.width - 150,
    141
  );

 }else  {
  doc.text(
    `: ${student_data[0].fee_due}`,
    doc.internal.pageSize.width - 150,
    141
  );
 }
  const casier=payment_data[0].cashier

  var atIndex = casier.indexOf("@");

var username = casier.substring(0, atIndex);

doc.setFontSize(10)
doc.setTextColor(128, 128, 128);
  doc.text(`Cashier`, doc.internal.pageSize.width - 80, 151);
  doc.text(
    ` ${username}`,
    doc.internal.pageSize.width - 40,
    151
  );
  doc.line(10, 145, 200, 145);

  var currentDate = new Date();


  var formattedDate =
    currentDate.getFullYear() +
    "-" +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + currentDate.getDate()).slice(-2);  
    doc.setFontSize(10)
    doc.setTextColor(128, 128, 128);


    
const parts = formattedDate.split("-"); // Split the date string into an array of parts
const printedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  doc.text("Printed Date", doc.internal.pageSize.width / 13, 151);
  doc.text(printedDate, doc.internal.pageSize.width - 150, 151);
  doc.setTextColor(0, 0, 0);
  doc.text("Signature & Stamp", doc.internal.pageSize.width - 50, 240);
  
  doc.setDrawColor(0, 0, 0, 0.5);

  doc.setLineWidth(0.2);
  doc.line(10, 260, 200,260);


  doc.addImage(footer, "PNG", 30, 255, doc.internal.pageSize.width-50, y*3);

  doc.save(`DIAT_000${payment_data[0].id}.pdf`);
};

export default generateINVOICE;
