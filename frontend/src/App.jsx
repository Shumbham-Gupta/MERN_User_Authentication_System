import React from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { useContext } from 'react'
import { dataContext } from './context/UserContext'
function App() {
let {userData,loading}=useContext(dataContext)

if(loading){
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  )
}

  return (
    <Routes>
      <Route path='/signup' element={userData?<Navigate to="/"/>:<SignUp/>}/>
      <Route path='/login' element={userData?<Navigate to="/"/>:<Login/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
    </Routes>
  )
}

export default App
