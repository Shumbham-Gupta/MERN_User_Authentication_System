import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config()

const app=express();
let port =process.env.PORT  || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"https://user-authentication-system-frontend.onrender.com",
  credentials:true
}))

app.use("/api",authRouter);

app.listen(port,()=>{
  connectDb()
  console.log(`server is running at ${port}`);
})
