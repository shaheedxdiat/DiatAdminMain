import { Button } from 'react-bootstrap'
import React from 'react'
import { supabase } from '../SupaBase'

const SelectCourse = () => {

  return (
    <div>
      <Button onClick={async()=>{supabase.auth.signOut()}}> logout</Button>
      <input type="text" placeholder='course selection' />
    </div>
  )
}

export default SelectCourse
