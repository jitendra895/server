import connectDb from "../../MongodbConn/mongodb"
import CountDownTime from "../../models/countDownTime";
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
    try {
      await runMiddleware(req, res, cors);
      if (req.method == "POST") {
        console.log(req.body);
        let time = new CountDownTime(req.body);
        await time.save();
        res.status(200).json({ success:true, status: "success" });
      } else {
        res.status(404).json({success:false, error: "Time already registerd" });
      }
    } catch (error) {
      res.status(404).json({success:false, error: "Time already registerd" });
    }
    
  };
  
  export default connectDb(handler);