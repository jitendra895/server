import connectDb from "../../MongodbConn/mongodb"
import Winners from "../../models/winnerResult";

const handler = async (req, res) => {
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