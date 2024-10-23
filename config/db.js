const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://localhost:27017/pr9-jwttoken`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = connectDB;
