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
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 15;
  let skip = (page - 1) * limit;
  let question = await QuestionDetails.find()
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });
  let totalPages = Math.ceil((await QuestionDetails.countDocuments()) / limit);
  let fullQuestions = await QuestionDetails.find()
  res.status(200).json({ question, totalPages,fullQuestions});
};

export default connectDb(handler);
