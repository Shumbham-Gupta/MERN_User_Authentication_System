
import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { getUserData } from '../../../backend/controllers/auth.controllers';

function Login() {
  const {serverUrl,userData,setUserData,getUserData}=useContext(dataContext)
 const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const navigate=useNavigate();

  const handleLogin=async(e)=>{
e.preventDefault();
try {
  let {data}=await axios.post(serverUrl + "/api/login",{
    email,password
  },{withCredentials:true})

  setUserData(data.user) 
  await getUserData()


if(userData){
  navigate("/")
}

} catch (error) {
  alert(error.response.data.message)
}
  }

// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const { data } = await axios.post(
//       serverUrl + "/api/login",
//       { email, password },
//       { withCredentials: true }
//     );

//     // Save user data immediately
//     setUserData(data.user);

//     // Navigate right after login success
//     navigate("/");

//     // Optionally refresh data after navigation
//     getUserData();

//   } catch (error) {
//     alert(error.response?.data?.message || "Login failed");
//     console.error(error);
//   }
// };

return (
  <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center p-4">
  <div className="w-full max-w-sm md:max-w-md bg-gray-800 rounded-2xl flex flex-col items-center gap-4 p-6 md:p-8 shadow-xl">

    {/* Heading */}
    <h1 className="font-bold text-xl md:text-2xl text-white text-center">Login</h1>

    <form className="w-full flex flex-col items-center gap-3" onSubmit={handleLogin}>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full h-10 md:h-12 bg-gray-700 text-white rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full h-10 md:h-12 bg-gray-700 text-white rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Login Button */}
      <button
        type="submit"
        className="w-full h-10 md:h-12 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Log In
      </button>

      {/* Signup Link */}
      <p className="text-gray-400 text-sm md:text-base mt-1 text-center">
        Want to create an account?{" "}
        <span
          className="text-purple-400 hover:underline cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>

    </form>
  </div>
</div>

);

}

export default Login
