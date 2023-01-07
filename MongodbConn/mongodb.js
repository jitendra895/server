import mongoose from "mongoose";

const connectDb = handler => async (req, res ) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(
    "mongodb+srv://jitendra123:910920Jk@cluster0.am1ehwz.mongodb.net/?retryWrites=true&w=majority"
  );
  return handler(req, res);
};

export default connectDb;
