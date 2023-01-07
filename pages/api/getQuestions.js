import QuestionDetails from "../../models/questions";
import connectDb from "../../MongodbConn/mongodb";

const handler = async (req, res) => {
  let question = await QuestionDetails.find();
  res.status(200).json({ question });
};

export default connectDb(handler);
