import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return mongoose.connection.asPromise();
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("Connected to MongoDB");
};

export default connectMongo;
