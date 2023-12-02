import mongoose from "mongoose";

const connectToDB = async () => {
  const URL = process.env.MONGO_URL
  try {
    await mongoose.connect(URL)
    console.log('connected to the mongoDB successfully');
  } catch (error) {
    console.error('could not connect to the database', error);
  }
}

export default connectToDB;