const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/LACOSTE");

    console.log("Connect Successfully");
  } catch (error) {
    console.error("Connect Fail");
  }
};

module.exports = { connect };
