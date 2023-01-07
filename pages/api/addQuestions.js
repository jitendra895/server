import connectDb from "../../MongodbConn/mongodb"
import QuestionDetails from "../../models/questions";

const handler = async (req, res) => {
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