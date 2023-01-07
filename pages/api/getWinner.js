import Winners from "../../models/winnerResult"
import connectDb from "../../MongodbConn/mongodb";

const handler = async (req, res) => {
  let winner = await Winners.find();
  res.status(200).json({ winner });
};

export default connectDb(handler);
