
import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { getUserData } from '../../../backend/controllers/auth.controllers';

function Login() {
  const {serverUrl,userData,setUserData,getUserData}=useContext(dataContext)
 const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate();

  const handleLogin=async(e)=>{
e.preventDefault();
try {
  let {data}=await axios.post(serverUrl + "/api/login",{
    email,password
  },{withCredentials:true})

  setUserData(data.user)
  navigate("/")

} catch (error) {
  alert(error?.response?.data?.message || "Login failed")
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
        required
        className="w-full h-10 md:h-12 bg-gray-700 text-white rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <div className="w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          className="w-full h-10 md:h-12 bg-gray-700 text-white rounded-lg px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

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
