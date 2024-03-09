import { supabase } from "./SupaBase";

export async function genarateStudentId(course_id) {
   
  const lastStudentId = await getLastStudentId();

  if (!lastStudentId) {
    return {id:"DIPP0001"};
  }
  const onlyDigits = lastStudentId.toString().replace(/\D/g, "");
  const incrementedID=parseInt(onlyDigits)+1
  const paddedId = incrementedID.toString().padStart(4, '0');
  const genaratedID=`${course_id.c_id}${paddedId}`





  return {id:genaratedID}
}

async function getLastStudentId() {
  const { data, error } = await supabase
    .from("students")
    .select("student_id")
    .order("student_id", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching last student ID:", error);
    return;
  }
//   console.log("Last student ID:", data[0]?.student_id);
  return data[0]?.student_id;
}