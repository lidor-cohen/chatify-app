import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY: " + conn.connection.host);
  } catch (error) {
    console.error("ERROR CONNECTING TO MONGODB: " + error);
    process.exit(1);
  }
};
