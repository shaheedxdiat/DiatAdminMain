
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupaBase";

const AuthListener = () => {


  const navigate = useNavigate();
  const [logoutTimeout, setLogoutTimeout] = useState(null);

  useEffect(() => {
    
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/");
        console.log("sign-out success ", data.subscription.unsubscribe.name);
        localStorage.clear()
        if (logoutTimeout) {
          clearTimeout(logoutTimeout);
          setLogoutTimeout(null);
        }
      }
      if (!session) {
        navigate("/");
      }
    });


  }, [navigate, logoutTimeout]);

  
  return (
    <div>
    </div>
  );
};

export default AuthListener;
