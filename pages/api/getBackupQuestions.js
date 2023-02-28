import BakupQuestions from "../../models/bakupQuestions";
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
  // let page = parseInt(req.query.page) || 1;
  // let limit = parseInt(req.query.limit) || 15;
  // let skip = (page - 1) * limit;
  // let question = await BakupQuestions .find()
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ _id: -1 });
  // let totalPages = Math.ceil((await BakupQuestions.countDocuments()) / limit);
  // res.status(200).json({ question, totalPages,});
  let question = await BakupQuestions .find().sort({ _id: -1 });
  res.status(200).json({ question});
};

export default connectDb(handler);
