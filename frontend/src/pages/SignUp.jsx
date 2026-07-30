import React, { useContext, useRef, useState } from 'react'
import dp from '../assets/profile.png'
import { dataContext } from '../context/UserContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function SignUp() {
const {serverUrl,userData,setUserData,getUserData}=useContext(dataContext)
const navigate = useNavigate();

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const file = useRef(null); // ref is fine as null


  const handleSignUp=async(e)=>{
e.preventDefault();

try {

  let formData = new FormData();
  formData.append('firstName',firstName)
  formData.append('lastName',lastName)
  formData.append('userName',userName)
  formData.append('email',email)
  formData.append('password',password)
  if(backendImage){
    formData.append("profileImage",backendImage)
  }
  let {data}=await axios.post(serverUrl + "/api/signup",formData,{withCredentials:true,
    headers:{"Content-Type":"multipart/form-data"}

  })
  await getUserData()
setUserData(data.user)
   navigate("/")


} catch (error) {
  console.log(error)
}
  }

  const [frontendImage,setFrontendImage]=useState(dp)
  const [backendImage,setBackendImage]=useState(null)
  function handleImage(e){
    let file=e.target.files[0];
    setBackendImage(file);
    let image=URL.createObjectURL(file)
    setFrontendImage(image)
  }
return (
  <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center p-4">
  <div className="w-full max-w-sm md:max-w-md bg-gray-800 rounded-2xl flex flex-col items-center gap-4 p-6 md:p-8 shadow-xl">

    {/* Heading */}
    <h1 className="font-bold text-xl md:text-2xl text-white text-center">Sign Up</h1>

    <form className="w-full flex flex-col items-center gap-3" onSubmit={handleSignUp}>

      {/* Profile Image Upload */}
      <input type="file" hidden ref={file} onChange={handleImage} />
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-700 overflow-hidden relative border-2 border-purple-500 cursor-pointer hover:scale-105 transition-transform duration-200">
        <img src={frontendImage} alt="Profile" className="w-full h-full object-cover" />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center text-white font-semibold text-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
          onClick={() => file.current.click()}
        >
          +
        </div>
      </div>

      {/* Name Fields */}
      <div className="w-full flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="First Name"
          required
          className="flex-1 min-w-0 h-10 bg-gray-700 text-white rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition box-border placeholder-gray-400"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          className="flex-1 min-w-0 h-10 bg-gray-700 text-white rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition box-border placeholder-gray-400"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        required
        minLength={3}
        className="w-full h-10 bg-gray-700 text-white rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        required
        className="w-full h-10 bg-gray-700 text-white rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <div className="w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          minLength={6}
          className="w-full h-10 bg-gray-700 text-white rounded-lg px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400"
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full h-10 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Sign Up
      </button>

      {/* Login Link */}
      <p className="text-gray-400 text-sm md:text-base mt-1 text-center">
        Already have an account?{" "}
        <span
          className="text-purple-400 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>

    </form>
  </div>
</div>

);


}
export default SignUp
