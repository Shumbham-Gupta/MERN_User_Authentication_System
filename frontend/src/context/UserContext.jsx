import React, { createContext } from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react';
export const dataContext =createContext()
function UserContext({children}) {
  const [userData,setUserData]=useState(null);
  const [loading,setLoading]=useState(true);
  const serverUrl=import.meta.env.VITE_SERVER_URL || "https://mern-user-authentication-system-server.onrender.com"

  const getUserData=async()=>{
try {
  let {data}=await axios.get(serverUrl + "/api/getuserdata",{
    withCredentials:true
  })
   setUserData(data)
} catch (error) {
  setUserData(null)
  console.log(error)
}
  }

const value={
  serverUrl,userData,setUserData,getUserData,loading
}

useEffect(() => {
  const init = async () => {
    if (document.cookie.includes("token")) {
      await getUserData();
    }
    setLoading(false);
  };
  init();
}, []);

  return (
   <dataContext.Provider value={value}>
    {children}
   </dataContext.Provider>
  )
}

export default UserContext
