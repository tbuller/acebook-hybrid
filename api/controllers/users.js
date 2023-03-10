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
    console.log(req.body);
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
    } else if (req.body.photo) {
      updateObj = { photo: req.body.photo };
    }
    User.findByIdAndUpdate(req.user_id, updateObj, async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token }); //OK here needed to be in quotes
    });
  },
  ShowUser: (req, res) => {
    User.findById(req.user_id, async (err, userInfo) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ userInfo: userInfo, token: token });
    });
  },
  ShowUser2: (req, res) => {
    // console.log("hitting here controller / ShowUser2")
    User.findById(req.body.userLookup, async (err, userInfo) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ userInfo: userInfo, token: token });
    });
  },
};

module.exports = UsersController;
