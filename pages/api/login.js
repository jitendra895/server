// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../MongodbConn/mongodb";
import User from "../../models/users";

const handler = async (req, res) => {
//   try {
    if (req.method == "POST") {
      console.log(req.body);
      let user = await User.findOne({ name: req.body.name });
      if (user) {
        if (req.body.name == user.name) {
          res.status(200).json({ success: true, name: user.name, upi: user.upi });
        }
        else {
      res.status(404).json({ success: false, error: "invalid credentials" });
      }
    }
    else {
        res.status(404).json({ success: false, error: "invalid credentials" });
        }
    }
//   } catch (error) {
//     res.status(404).json({ success: false, error: "User already registerd" });
//   }
};

export default connectDb(handler)
