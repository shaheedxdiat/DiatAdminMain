import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { supabase } from './SupaBase';

const AuthListener = () => {
  const navigate=useNavigate()
  useEffect(() => {
    
  const {data,error}=supabase.auth.onAuthStateChange((event,session)=>{
    if (event==='SIGNED_IN') {
      navigate("/dashboard")
      console.log("sign-in success ",data,error)
      console.log("session",session);
    }
    else if (event==='SIGNED_OUT') {
      navigate("/")
      console.log("sign-out success ",data,error)
      console.log("session",session);
    }
  })
   
  }, [navigate])
  
  return (
    <div>
      
    </div>
  )
}

export default AuthListener
