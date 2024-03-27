import { jsPDF } from "jspdf";
import { supabase } from "../SupaBase";
import footer from "../assests/images/diat_footer.png";



const generatePDF = async (id) => {
  var data = null;

  try {
    const { data: studentdata, error } = await supabase
      .from("students")
      .select(`*,courses(*)`)
      .eq("student_id", id);
    if (error) {
      console.error(error);
    } else {
      data = studentdata;
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
  }
  console.log("trying to genarate"); 
  if (!data) {
    console.log("no data to genarate PDF");
    return;
  }

  const doc = new jsPDF();

  let y = 10;

  const companyName = "DIALOGUE INSTITUTE OF ADVANCED TECHNOLOGY";
  // const companyAddress = "VC TOWER ,KARADI";
  // const companyAddress2 = "THAMARASSERY, PINCODE: 673573";
  // const companyContact = "Phone: +91 9516007008, ";

  // const logoUrl =
  //   "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/diat_main_logo_with_bg-min%20(1).png";
  
  // ..................................logo
  doc.setFillColor(128, 128, 128);
  
  doc.rect(0, 0, doc.internal.pageSize.width + 2, 32, "F");

  // doc.addImage(logoUrl, "PNG", 11, 9, y * 3, y * 1.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.text(companyName, doc.internal.pageSize.width/2, 1.5 * y, {
    align: "center",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("VC TOWER ,KARDI ,THAMARASSERY ,673603 ", doc.internal.pageSize.width / 2, 2 * y, {
    align: "center",
  });
  doc.setFontSize(10);

  doc.text("Phone: +91 9516007008", doc.internal.pageSize.width / 2, 2.5 * y, {
    align: "center",
  });

  // .......................................................head end here

  const imgURL =
    data[0]?.photo_url ||
    "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/no_profile.jpg";
  doc.addImage(
    imgURL,
    "JPEG",
    160, //x axis position
    60, //y axis position
    30, //width
    40 //height
  );

  doc.setLineWidth(0.3);
  doc.setDrawColor(0, 0, 0, 0.6);

  doc.line(158, 58, 192, 58);

  doc.line(158, 102, 192, 102);
 
  doc.line(192, 58, 192, 102);
 
  doc.line(158, 58, 158, 102);
  

  // ................................................................detail
  doc.setFontSize(15);
  doc.setFont("helvetica", "normal");

  doc.setTextColor(128, 128, 128);
  doc.text(
    `STUDENT REGISTRATION DETAILS`,
    doc.internal.pageSize.width / 2 - 45,
    45
  );
  doc.setDrawColor(0, 0, 0, 0.4);
  doc.setLineWidth(0.4);

  doc.line(65, 50, 145, 50);

  doc.setFont("helvetica", "normal");

  doc.setTextColor(0);

  doc.setFontSize(12);
  doc.text(`Name`, 20, 65);
  doc.text(`: ${data[0]?.full_name} `, 70, 65);

  doc.text(`Course`, 20, 75);
  doc.text(`: ${data[0]?.courses.course_name} `, 70, 75);

  doc.text(`Admission No / ID`, 20, 85);
  doc.text(`: ${data[0]?.student_id} `, 70, 85);

  const admDate=data[0]?.admission_date
  const admDateParts=admDate.split("-")     
  const formattedAdmDate=`${admDateParts[2]}-${admDateParts[1]}-${admDateParts[0]}`
  doc.text(`Admission Date `, 20, 95);
  doc.text(`: ${formattedAdmDate} `, 70, 95);


  doc.text(`Adhaar No `, 20, 105);
  doc.text(`: ${data[0]?.adhar_number} `, 70, 105);


  const dob=data[0]?.dob
  const dobParts=dob.split("-")
  const formatedDob=`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`
  doc.text(`Date of Birth `, 20, 115);
  doc.text(`: ${formatedDob} `, 70, 115);

  doc.text(`Gender `, 20, 125);
  doc.text(`: ${data[0]?.gender} `, 70, 125);

  doc.text(`Mobile No`, 20, 135);
  doc.text(`: ${data[0]?.mobile} `, 70, 135);

  doc.text(`Email Id `, 20, 145);
  doc.text(`: ${data[0]?.email} `, 70, 145);

  doc.text(`Address `, 20, 155);
  doc.text(`: ${data[0]?.house_name} (H) `, 70, 155);
  doc.text(`: ${data[0]?.place} ,${data[0]?.post} (PO)`, 70, 165);
  doc.text(`: ${data[0]?.district.toUpperCase()} ,${data[0]?.state.toUpperCase()} `, 70, 175);

  doc.text(`Education Qualification`, 20, 185);
  doc.text(`: ${data[0]?.qualification} `, 70, 185);

  doc.text(`Name of Guardian`, 20, 195);
  doc.text(`: ${data[0]?.quardian} `, 70, 195);

  doc.text(`Mobile No of Guardian`, 20, 205);
  doc.text(`: ${data[0]?.quardian_mobile} `, 70, 205);

  const classStart=data[0]?.class_start
  const classStratPart=classStart.split("-")
  const formattedClassStart=`${classStratPart[2]}-${classStratPart[1]}-${classStratPart[0]}`
  doc.text(`Class start`, 20, 215);
  doc.text(`: ${formattedClassStart} `, 70, 215);

  doc.text(`Course Fee `, 20, 225);
  doc.text(`: ${data[0].courses.fee} `, 70, 225);
     
  var xposition = 235;
  


  if (data[0].hosteler===true) {
    doc.text(`Hostler`, 20, xposition);
    doc.text(`: YES `, 70, xposition);
    
    xposition = 245;
    
  } else doc.text("", 0, 0);

  if (!data[0].placement) {
    doc.text(`Placement`, 20, xposition);
    doc.text(`: NO `, 70, xposition);
    xposition = xposition+10;
    // return

  } else doc.text("", 0, 0);

  if (data[0].discount!==0) {
    doc.text(`Discount /concession`, 20, xposition);
    doc.text(`: ${data[0].discount} `, 70, xposition);
  
  }else doc.text("", 0, 0);

  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(251, 189, 10);
  
  doc.setLineWidth(0.3);
  doc.line(10, 265, 200,265);
  doc.addImage(footer, "PNG", 30, 261, doc.internal.pageSize.width-50, y*3);

  doc.save(`DIAT_${data[0].full_name}.pdf`);
};

export default generatePDF;
