const Cors = {
  Options: (req, res) => {
    res.sendStatus(200);
  },
};
module.exports = Cors;
