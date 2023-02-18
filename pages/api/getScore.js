import connectDb from "../../MongodbConn/mongodb";
import Result from "../../models/result";
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
  const { score } = req.query
  const regex = new RegExp(score, 'i');
  const scoreCard = await Result.find({ score: regex }).sort({_id: -1})
  const filteredScore =scoreCard.filter(score => score.score === score);
  res.status(200).json({ filteredScore,scoreCard});
};

export default connectDb(handler);
