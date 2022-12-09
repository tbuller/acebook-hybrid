const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },
  UpdateUser: (req, res) => {
    req.body.UserId = req.user_id;
    let updateObj;
    if (req.body.fullname) {
      updateObj = { fullname: req.body.fullname };
    } else if (req.body.email) {
      updateObj = { email: req.body.email };
    } else if (req.body.password) {
      updateObj = { password: req.body.password };
    } else if (req.body.aboutMe) {
      updateObj = { aboutMe: req.body.aboutMe };
    }
    User.findByIdAndUpdate(req.user_id, updateObj, async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({ message: "OK", token: token }); //OK here needed to be in quotes
    });
  },
  ShowUser: (req, res) => {
    User.findById(req.user_id, async (err, userInfo) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ userInfo: userInfo, token: token });
    });
  },
};

module.exports = UsersController;
