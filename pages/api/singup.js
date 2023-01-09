// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../MongodbConn/mongodb";
import User from "../../models/users";
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
  try {
    if (req.method == "POST") {
      console.log(req.body);
      let user = new User(req.body);
      await user.save();
      res.status(200).json({ success:true, status: "success" });
    } else {
      res.status(404).json({success:false, error: "You are already registered. You can start the quiz." });
    }
  } catch (error) {
    res.status(404).json({success:false, error: "You are already registered. You can start the quiz." });
  }
  
};

export default connectDb(handler);
