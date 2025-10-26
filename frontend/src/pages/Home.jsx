import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Home() {
  let {userData,setUserData,getUserData,serverUrl}=useContext(dataContext)
let navigate=useNavigate();
if(!userData){
  navigate("/login")
}

const handleLogOut=async()=>{
  try {
    let data= await axios.post(serverUrl + "/api/logout",{},
      {
        withCredentials:true
      }
    )
    setUserData(null);
  } catch (error) {
    console.log(error);
  }
}

return (
  <div className="w-full min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4 gap-6">

  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-800 overflow-hidden relative border-2 border-purple-500">
    <img src={userData?.profileImage} alt="Profile" className="w-full h-full object-cover" />
  </div>

  <p className="text-white text-base md:text-lg text-center">
    Hey <span className="text-purple-400 text-lg md:text-xl font-semibold">{userData?.firstName}</span>, Welcome to the Dashboard !
  </p>

  <button
    onClick={handleLogOut}
    className="w-32 md:w-40 h-10 md:h-12 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200"
  >
    Log Out
  </button>

</div>

);

}

export default Home
