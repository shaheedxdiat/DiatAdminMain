import { jsPDF } from "jspdf";
import { supabase } from "./SupaBase";

const generatePDF = async (id) => {
  var data=null


  alert("genarating pdf");

  try {
    const { data:studentdata, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", id);
    if (error) {
      console.error(error);
    } else {
      data=studentdata
      console.log("studentdata to pdf", studentdata[0]);
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
  }
  console.log("trying to genarate");
  if (!data) return;


  const doc = new jsPDF();
  const lineHeight = 10;
  let y = 10;

  const headerText = "DIALOGUE INSTITUTE AND TECHNOLOGY"; // Adjust as needed
  const logoUrl =
    "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/publiclogos&images/DIAT_20240307_213038-removebg-preview.png"; // Replace with actual logo URL
  const logoWidth = 50; // Adjust logo width as needed
  doc.setFontSize(16);
  doc.text(headerText, doc.internal.pageSize.width / 2, y, { align: "center" });
  y += lineHeight * 2;
  doc.addImage(
    logoUrl,
    "PNG",
    doc.internal.pageSize.width / 2 - logoWidth / 2,
    y,
    logoWidth,
    logoWidth * 0.6
  );
  y += logoWidth * 0.6 + lineHeight * 2;

  // Add title
  doc.setFontSize(16);
  doc.text("Student Details", 10, y);
  y += lineHeight * 2;

  const imgURL = data[0]?.photo_url;
  doc.addImage(
    imgURL,
    "JPEG",
    doc.internal.pageSize.width / 3 - logoWidth / 3,
    y,
    logoWidth,
    logoWidth * 0.9
  );

  // Add student image at the right top corner
  // if (data[0].photo_url) {
  //   const img = new Image();
  //   img.src = data[0].photo_url;
  //   img.src = "https://qlterlkavzxidliounaa.supabase.co/storage/v1/object/public/student_photos/AMAL_1710129191877.jpeg";
  //   img.crossOrigin = "anonymous";
  //   img.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx.drawImage(img, 0, 0);
  //     const imgData = canvas.toDataURL("image/jpeg");
  //     const imgWidth = 80; // Adjust image width as needed
  //     const imgHeight = img.height * (imgWidth / img.width);
  //     const imgX = doc.internal.pageSize.width - imgWidth - 10; // 10 is for right margin
  //     const imgY = 10; // 10 is for top margin
  //     doc.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);
  //   };
  // }

  // Add student information
  y += lineHeight * 2;
  doc.setFontSize(12);
  Object.entries(data[0]).forEach(([key, value]) => {
    // Skip ID and photo_url
    if (key === "id" || key === "photo_url") return;

    const formattedKey = key.replace("_", " ").toUpperCase(); // Convert to uppercase
    const formattedValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    const text = `${formattedKey}: ${formattedValue}`;
    doc.text(text, 10, y);
    y += lineHeight;
  });

  doc.save(`${data[0].full_name}_${Date.now()}_download.pdf`);
};

export default generatePDF;
