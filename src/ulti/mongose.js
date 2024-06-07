module.exports = {
  mutipleMongooseToObject: (mongoose) => {
    const newMongose = mongoose.map((item) => item.toObject());
    return newMongose;
  },
  mongooseToObject: (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
