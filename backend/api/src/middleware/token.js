const jwt = require("jsonwebtoken");

const verif_token = (req, res, next) => {
  try {
    let auth = req.headers["authorization"];

    jwt.verify(auth, "secret", (err, result) => {
      if (err) {
        res.status(200).send(err);
      } else if (result.length <= 0) {
        res.status(200).send(result);
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = verif_token;
