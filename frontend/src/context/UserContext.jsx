import React, { createContext } from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const dataContext =createContext()
function UserContext({children}) {
  let navigate =useNavigate();

  const [userData,setUserData]=useState(null);
  const serverUrl="https://user-authentication-backend-ry8o.onrender.com"

  const getUserData=async()=>{
try {
  let {data}=await axios.get(serverUrl + "/api/getuserdata",{
    withCredentials:true
  })
   setUserData(data)
} catch (error) {
  navigate("/login")
  console.log(error)
}
  }

const value={
  serverUrl,userData,setUserData,getUserData 
}

// useEffect(()=>{
//   getUserData()
// },[])
useEffect(() => {
  if (document.cookie.includes("token")) {
    getUserData();
  }
}, []);

  return (
   <dataContext.Provider value={value}>
    {children}
   </dataContext.Provider>
  )
}

export default UserContext
