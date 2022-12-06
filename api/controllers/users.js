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
    User.findByIdAndUpdate(
      //ERROR LIES HERE
      req.user_id,
      { fullname: req.body.fullname },
      //$push: only works to add item into an array rather than just update a field
      // {
      //   $push: {
      //     fullname: req.body.fullname,
      //   },
      // },
      async (err) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token }); //OK here needed to be in quotes
      }
    );
  },
};

module.exports = UsersController;
