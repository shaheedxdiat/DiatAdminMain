import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './SupaBase';

const AuthListener = () => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const handleSignOut = async () => {
      await supabase.auth.signOut();
      navigate('/');
    };

    const handleActivity = () => {
    
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      
      const newTimeoutId = setTimeout(handleSignOut, 3 * 60 * 1000);
      setTimeoutId(newTimeoutId);
    };

    
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keypress', handleActivity);

  
    handleActivity();

    
    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      clearTimeout(timeoutId);
    };
  }, [navigate, timeoutId]);

  return <div></div>;
};

export default AuthListener;
