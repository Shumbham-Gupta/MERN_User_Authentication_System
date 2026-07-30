import axios from "axios";
import uploadOnCloudinary from "../config/cloudinary.js"
import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { validateSignUp, isValidEmail } from "../utils/validators.js"

export const signUp = async  (req,res)=>{
  try {
    const {firstName,lastName,email,password,userName}=req.body

    const validationError = validateSignUp(req.body)
    if(validationError){
      return res.status(400).json({message:validationError})
    }

    let profileImage;
    if(req.file){
      profileImage= await uploadOnCloudinary(req.file.path);
    }
    let existUser=await User.findOne({email});
    if(existUser){
      return res.status(400).json({message:"user already exist"});
    }
    
const hashedPassword=await bcrypt.hash(password,10);

const user=await User.create({
  firstName,
  lastName,
  email,
  password:hashedPassword,
  userName,
  profileImage
})

let token;
try {
 token = generateToken(user._id)
} catch (error) {
  console.log(error);
  return res.status(500).json({message:"could not generate auth token"})
}

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

     // ⭐⭐⭐ N8N WORKFLOW TRIGGER HERE ⭐⭐⭐
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        await axios.post(process.env.N8N_WEBHOOK_URL, {
          firstName,
          lastName,
          email,
          userName,
          profileImage,
          createdAt: new Date().toISOString(),
        });
        console.log("n8n webhook triggered successfully");
      } catch (err) {
        console.log("n8n webhook error:", err.message);
      }
    }

return res.status(201).json({
  message: "User registered successfully",
  user:{
  firstName,
  lastName,
  email,
  userName,
  profileImage
}})

  } catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
}

export const login=async(req,res)=>{
try {
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({message:"send all details"})
  }
  if(!isValidEmail(email)){
    return res.status(400).json({message:"please provide a valid email"})
  }
  let existUser=await User.findOne({email})
  if(!existUser){
    return res.status(400).json({message:"user doesn't exist"});
  }
let match=await bcrypt.compare(password,existUser.password)
if(!match){
  return res.status(400).json({message:"incorrect password"})
}

let token;
try {
 token = generateToken(existUser._id)
} catch (error) {
  console.log(error);
  return res.status(500).json({message:"could not generate auth token"})
}

res.cookie("token",token,{
  httpOnly:true,
  secure:true,
  sameSite:"None",
  maxAge:7*24*60*60*1000
})

return res.status(200).json({
  message: "User logged in successfully",
  user:{
  firstName:existUser.firstName,
  lastName:existUser.lastName,
  email:existUser.email,
  userName:existUser.userName,
  profileImage:existUser.profileImage
}})

} catch (error) {
  console.log(error)
  return res.status(500).json({message:"internal server error"});
}
}

export const logout=async(req,res)=>{
  try {
    res.clearCookie("token")
   return res.status(200).json({message:"logged out successfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"internal server error"})
  }
}

export const getUserData=async(req,res)=>{
  try {
    let userId=req.userId
    if(!userId){
      return res.status(400).json({message:"user not found"})
    }
    let user= await User.findById(userId).select("-password")
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"internal server error"})
  }
}
