import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from './SupaBase';

const AuthListener = () => {
  const navigate = useNavigate();
  const [logoutTimeout, setLogoutTimeout] = useState(null);

  useEffect(() => {
    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        navigate("/");
      }
    };

    const handleBeforeUnload = () => {
      // Logout the user when the tab is closed or refreshed
      handleLogout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (logoutTimeout) {
        clearTimeout(logoutTimeout);
      }
    };
  }, [navigate, logoutTimeout]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/");
        console.log("sign-out success ", session);
        if (logoutTimeout) {
          clearTimeout(logoutTimeout);
          setLogoutTimeout(null);
        }
      }
      if (!session) {
        navigate("/");
      }
    });

    return () => {
      if (logoutTimeout) {
        clearTimeout(logoutTimeout);
      }
      // authListener.unsubscribe();
    };
  }, [navigate, logoutTimeout]);

  return (
    <div>
      {/* You can add any UI elements related to authentication here */}
    </div>
  );
};

export default AuthListener;
