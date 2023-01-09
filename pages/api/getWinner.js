import Winners from "../../models/winnerResult";
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
  let winner = await Winners.find();
  res.status(200).json({ winner });
};

export default connectDb(handler);
