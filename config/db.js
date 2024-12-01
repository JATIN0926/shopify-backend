const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(`MongoDB connected !!`);
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
