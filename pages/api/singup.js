// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../MongodbConn/mongodb";
import User from "../../models/users";


const handler = async (req, res) => {
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
