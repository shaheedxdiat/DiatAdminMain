import { useEffect, useState } from "react";
import { supabase } from "../SupaBase";

export const useSessionTimeout = (timeoutDuration = 2* 60 * 1000) => {
  const [autotimeout, setautotimeout] = useState(false);
  const [timeoutalert, settimeoutalert] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      clearTimeout(timeoutId);
      if (autotimeout) {
        settimeoutalert(false);
      }
      setautotimeout(true);
      timeoutId = setTimeout(() => {
        settimeoutalert(true);
        supabase.auth.signOut();
        setautotimeout(false);
      }, timeoutDuration);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [autotimeout, timeoutDuration]);

  const handleClose = () => {
    settimeoutalert(false);
  };

  return { timeoutalert, handleClose };
};
