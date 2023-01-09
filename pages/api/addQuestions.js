import connectDb from "../../MongodbConn/mongodb"
import QuestionDetails from "../../models/questions";
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
        let question = new QuestionDetails(req.body);
        await question.save();
        res.status(200).json({ success:true, status: "success" });
      } else {
        res.status(404).json({success:false, error: "question already registerd" });
      }
    } catch (error) {
      res.status(404).json({success:false, error: "question already registerd" });
    }
    
  };
  
  export default connectDb(handler);