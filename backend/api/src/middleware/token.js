const jwt = require("jsonwebtoken");

const verif_token = (req, res, next) => {
  let auth = req.headers["authorization"];
  console.log(auth);

  jwt.verify(auth, "secret", (err, result) => {
    if (err) {
      res.status(200).send(err);
    } else if (result.length <= 0) {
      res.status(200).send(result);
    } else {
      next();
    }
  });
};

module.exports = verif_token;
