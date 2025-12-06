
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error: ", error.message);
    throw error;  // IMPORTANT!!!
  }
};

export default connectDb;

// import mongoose from "mongoose";

// const connectDb= async ()=>{
//   try {
//     await mongoose.connect(process.env.MONGODB_URL)
//       console.log("db connected");
//   } catch (error) {
//     console.log("db error");
//   }
// }

// export default connectDb;
