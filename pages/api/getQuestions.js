import QuestionDetails from "../../models/questions";
import connectDb from "../../MongodbConn/mongodb";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);
  let question = await QuestionDetails.find();
  res.status(200).json({ question });
};

export default connectDb(handler);
