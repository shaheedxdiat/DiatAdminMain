import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from './SupaBase';



const AuthListener = () => {
    const navigate=useNavigate()
    useEffect(() => {
     const {data ,error}=supabase.auth.onAuthStateChange((event,session)=>{
            if (event==='SIGNED_IN') {
              navigate("/course")
              console.log(data,error)
              
                // console.log("user data",session.user)
            }
            else if(event==='SIGNED_OUT'){
              navigate("/")
                console.log("log out session",session)
                console.log("log out data",data)
                console.log("log out data",error)
            }

     })
    }, [])
    

  return (
    <div>
      
    </div>
  )
}

export default AuthListener
