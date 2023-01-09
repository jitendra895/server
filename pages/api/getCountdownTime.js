import CountDownTime from "../../models/countDownTime";
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

  let time = await CountDownTime.find();
  res.status(200).json({ time });
};

export default connectDb(handler);
