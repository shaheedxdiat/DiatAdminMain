// import React, { useEffect } from "react";
import { supabase } from "../SupaBase";

const Text = () => {
  const getStudent = async () => {
    const { data, error } = await supabase
    .from("auth.users")
    .select(
      "*" 
    )
    console.log("supabase",supabase.auth)
   
      
      if (error) {
        console.log(error); 
        return
      }
    console.log("test data!", data);
   
  };
  getStudent();

  return (
    <div>
      test
      <button onClick={getStudent}>check</button>
    </div>
  );
};

export default Text;
