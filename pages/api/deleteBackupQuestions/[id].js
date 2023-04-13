import BakupQuestions from "../../../models/bakupQuestions";
import connectDb from "../../../MongodbConn/mongodb";
import Cors from "cors";

const cors = Cors({
  methods: ["DELETE", "GET", "HEAD"],
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
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({ error: "ID is required", success: false });
  }
  try {
    const question = await BakupQuestions.findByIdAndDelete(id);
    if (!question) {
      return res
        .status(404)
        .send({ error: "question not found", success: false });
    }
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
};

export default connectDb(handler);
