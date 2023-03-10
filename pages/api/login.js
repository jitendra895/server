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
  const { name } = req.query
  const regex = new RegExp(name, 'i');
  const users = await User.find({ name: regex })
  const filteredUsers = users.filter(user => user.name === name);
  res.status(200).json({ filteredUsers,users});
};

export default connectDb(handler);
