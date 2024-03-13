import { jsPDF } from "jspdf";
import { supabase } from "./SupaBase";

const generatePDF = async (id) => {
  var data = null;

  // alert("PDF is downloading");

  try {
    const { data: studentdata, error } = await supabase
      .from("students")
      .select(`*,courses(*)`)
      .eq("student_id", id);
    if (error) {
      console.error(error);
    } else {
      data = studentdata;
      // console.log("studentdata to pdf", studentdata[0]);
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
  }
  console.log("trying to genarate");
  if (!data){
    console.log("no data to genarate PDF");
    return
  } 

  const doc = new jsPDF();

  let y = 10;
  // const lineHeight = 1;

  const companyName = "DIALOGUE INSTITUTE OF ADVANCED TECHNOLOGY";
  const companyAddress = "Maharani shopping complex,";
  const companyAddress2 = " Karadi, Thamarassery, Pincode: 673573";
  const companyContact = "Phone: +91 8960886633, ";
  // const billNo=payment_data[0].i

  const logoUrl =
    "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/diat_logo_main-min.png";
 

  // ..................................logo
  doc.setFillColor(251, 189, 10); 
  doc.rect(0, 0, doc.internal.pageSize.width+2, 35, "F"); // Draw a transparent red square
  
  doc.addImage(
    logoUrl,
    "PNG",
    1,
   -7,
    y * 5,
    y * 5
  );
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(17);
  doc.text(companyName, doc.internal.pageSize.width / 1.7, 1.5 * y, {
    align: "center",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(companyAddress, doc.internal.pageSize.width / 1.8, 2 * y, {
    align: "center",
  });
  doc.text(companyAddress2, doc.internal.pageSize.width / 1.8, 2.5 * y, {
    align: "center",
  });
  doc.text(companyContact, doc.internal.pageSize.width / 1.8, 3 * y, {
    align: "center",
  });
  // doc.text(GSTIN, doc.internal.pageSize.width / 1.8, 4*y, { align: "center" });

  // doc.setLineWidth(0.2);
  // doc.line(20, 45, 185, 45);

  // .......................................................head end here

  const imgURL =
    data[0]?.photo_url ||
    "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/no_profile.jpg";
  doc.addImage(
    imgURL,
    "JPEG",
    150, //x axis position
    60, //y axis position
    35, //width
    43 //height
  );

  // ................................................................detail
  doc.setFontSize(16);
  doc.setTextColor(150, 150, 150);
  doc.text(`REGISTRATION`, doc.internal.pageSize.width/2 -15, 50);
  
  
  doc.setTextColor(0);

  doc.setFontSize(11);
  doc.text(`Name`, 20, 65);
  doc.text(`: ${data[0]?.full_name} `, 70, 65);

  doc.text(`Course`, 20, 75);
  doc.text(`: ${data[0]?.courses.course_name} `, 70, 75);

  doc.text(`Admission No / ID`, 20, 85);
  doc.text(`: ${data[0]?.student_id} `, 70, 85);

  doc.text(`Adhaar No `, 20, 95);
  doc.text(`: ${data[0]?.adhar_number} `, 70, 95);

  doc.text(`Admission Date `, 20, 105);
  doc.text(`: ${data[0]?.admission_date} `, 70, 105);

  doc.text(`Date of Birth `, 20, 115);
  doc.text(`: ${data[0]?.admission_date} `, 70, 115);

  doc.text(`Gender `, 20, 125);
  doc.text(`:  `, 70, 125);

  
  doc.text(`Mobile No`, 20, 135);
  doc.text(`: ${data[0]?.mobile} `, 70, 135);

  
  doc.text(`Email Id `, 20, 145);
  doc.text(`: ${data[0]?.email} `, 70, 145);

  
  doc.text(`Address `, 20, 155);
  doc.text(`: ${data[0]?.house_name} (H) `, 70, 155);
  doc.text(`: ${data[0]?.place} ,${data[0]?.post} (PO)`, 70, 165);
  doc.text(`: ${data[0]?.district} ,${data[0]?.state} `, 70, 175);



  
  doc.text(`Qualificatioin`, 20, 185);
  doc.text(`: ${data[0]?.qualification} `, 70, 185);

   
  doc.text(`Name of Guardian`, 20, 195);
  doc.text(`: ${data[0]?.quardian} `, 70, 195);
  
  doc.text(`Mobile of Guardian`, 20, 205);
  doc.text(`: ${data[0]?.quardian_mobile} `, 70, 205);

  
  doc.text(`Class start`, 20, 215);
  doc.text(`: ${data[0]?.class_start} `, 70, 215);


  doc.text(`Course Fee `, 20, 225);
  doc.text(`: ${data[0].courses.fee} `, 70, 225);

  doc.text(`Discount /concession`, 20, 235);
  doc.text(`: ${data[0].discount} `, 70, 235);
  
  var xposition=245
  if (data[0].hosteler) {
    doc.text(`Hostler`, 20, 245);
  doc.text(`: YES `, 70, 245);
  xposition=255
  } else doc.text("",0,0)
  
  if (!data[0].placement) {
    doc.text(`Placement`, 20, xposition);
  doc.text(`: NO `, 70, xposition);
 
  } else   doc.text("",0,0)

  doc.setFillColor(251, 189, 10); 
  doc.rect(0, 267, doc.internal.pageSize.width+2, 30, "F"); // Draw a transparent red square
  
 



  doc.save(`DIAT_${data[0].full_name}.pdf`);
};

export default generatePDF;
