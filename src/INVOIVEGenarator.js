import { jsPDF } from "jspdf";
import numberToWords from "number-to-words";

const generateINVOICE = async (payment_data, student_data) => {
  const doc = new jsPDF();

  let y = 10;

  const companyName = "DIALOGUE INSTITUTE OF ADVANCED TECHNOLOGY";
  const companyAddress = "VC Tower, Karadi, Thamarassery";
  const companyAddress2 = "Pincode: 673573, Phone: +91 8960886633";
  const companyContact = "";

  const logoUrl =
    "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/diat_main_logo_with_bg-min%20(1).png";

  doc.addImage(logoUrl, "PNG", 11, 9, y * 3, y * 1.5);

  doc.setFontSize(17);
  doc.text(companyName, doc.internal.pageSize.width / 1.7, 1.5 * y, {
    align: "center",
  });
  doc.setFontSize(9);
  doc.text(companyAddress, doc.internal.pageSize.width / 1.8, 2.1 * y, {
    align: "center",
  });
  doc.text(companyAddress2, doc.internal.pageSize.width / 1.8, 2.6 * y, {
    align: "center",
  });
  doc.text(companyContact, doc.internal.pageSize.width / 1.8, 3.1 * y, {
    align: "center",
  });

  doc.setDrawColor(0, 0, 0, 0.2);
  doc.setLineWidth(0.1);
  doc.line(10, 35, 200, 35);



  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("INVOICE", doc.internal.pageSize.width / 2, 4.2 * y, {
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

  doc.text("Bill Date", doc.internal.pageSize.width - 70, 5 * y, {
    align: "left",
  });
  doc.text(
    `: ${payment_data[0].created_at.toString().split("T")[0]}`,
    doc.internal.pageSize.width - 35,
    5 * y,
    { align: "left" }
  );

  doc.text("Receipt/Bill No ", doc.internal.pageSize.width - 70, 6 * y, {
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

  doc.text(`Taxable Amount`, doc.internal.pageSize.width - 80, 101);
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

  doc.text(`18% Tax Amount`, doc.internal.pageSize.width - 80, 111);
  doc.text(
    `${Math.floor(payment_data[0].amount * 0.18)}.00`,
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

  const amount = payment_data[0].amount;
  const words = numberToWords.toWords(amount);
  console.log(words);

  doc.setFont("helvetica", "normal");
  doc.text(`Total In Words`, doc.internal.pageSize.width / 13, 131);
  doc.text(`Rupees  ${words} only`, doc.internal.pageSize.width - 150, 131);
  doc.setLineWidth(0.1);

  doc.text(`Balance`, doc.internal.pageSize.width / 13, 141);
  doc.text(
    `${student_data[0].fee_due}`,
    doc.internal.pageSize.width - 150,
    141
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
  doc.text("Printed Date", doc.internal.pageSize.width / 13, 151);
  doc.text(formattedDate, doc.internal.pageSize.width - 150, 151);
  doc.setTextColor(0, 0, 0);
  doc.text("Signature &Stamp", doc.internal.pageSize.width - 50, 181);

  // doc.addImage(footer, "PNG", 1, 260, doc.internal.pageSize.width, y*3.5);

  doc.save(`DIAT_000${payment_data[0].id}.pdf`);
};

export default generateINVOICE;
