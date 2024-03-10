import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from './SupaBase';

const AuthListener = () => {
  const navigate = useNavigate();
  const [logoutTimeout, setLogoutTimeout] = useState(null);

  useEffect(() => {
    const { data, error } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        navigate("/");
        console.log("sign-out success ", data, error);

       
        clearTimeout(logoutTimeout);
        setLogoutTimeout(null);
      }
    });


    return () => {
      clearTimeout(logoutTimeout);
    };
  }, [navigate,logoutTimeout]);

  return (
    <div>
     
    </div>
  );
};

export default AuthListener;
