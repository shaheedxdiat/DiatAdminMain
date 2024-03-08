import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupaBase";

const AuthListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: initialData, error: initialError } = supabase.auth.session();
    if (initialData && initialData.user) {
      console.log(initialError)
      navigate("/dashboard");
    } else {
      navigate("/");
    }

    const subscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          navigate("/dashboard");
          console.log("Signed in successfully", session);
        } else if (event === "SIGNED_OUT") {
          navigate("/");
          console.log("Signed out successfully", session);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return <div></div>;
};

export default AuthListener;
