import connectDb from "../../MongodbConn/mongodb"
import Winners from "../../models/winnerResult";
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
        let winner = new  Winners(req.body);
        await  winner.save();
        res.status(200).json({ success:true, status: "success" });
      } else {
        res.status(404).json({success:false, error: "Winner Already added." });
      }
    } catch (error) {
      res.status(404).json({success:false, error: "Winner Already added." });
    }
    
  };
  
  export default connectDb(handler);