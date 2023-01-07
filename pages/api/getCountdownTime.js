import CountDownTime from "../../models/countDownTime";
import connectDb from "../../MongodbConn/mongodb";

const handler = async (req, res) => {
  let time = await CountDownTime.find();
  res.status(200).json({ time });
};

export default connectDb(handler);
