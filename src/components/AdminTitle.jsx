import React from 'react'


const AdminTitle = () => {
        const admin=localStorage.getItem("admin")
  return (
    <div style={{position:"fixed" ,bottom:"5px",left:"10px"}}>
      <div style={{width:"100%", color:"#292c3244"}}>{admin}</div>
    </div>
  )
}

export default AdminTitle
