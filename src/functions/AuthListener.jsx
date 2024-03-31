
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupaBase";

const AuthListener = () => {
const navigate = useNavigate();

  useEffect(() => {
     supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/");
        localStorage.clear()
      }
      if (!session) {
        navigate("/");
      }
    });
  }, [navigate]);

  
  return (
    <div>
    </div>
  );
};

export default AuthListener;
