const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const con = require("../database/database");
let router = express.Router();
const saltRounds = 10;
const verif_token = require("../middleware/token");
const { verify } = require("crypto");

//USERS ROUTES
router.post("/users/sign-up", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  let verif = `SELECT email FROM users WHERE email = '${email}';`;
  con.query(verif, (err, result) => {
    if (err) throw err;

    if (result.length) {
      res.status(200).send("This email is already in use");
    } else {
      bcrypt.hash(password, saltRounds).then((hash) => {
        let sql = `INSERT INTO users (name, email, password) VALUES('${name}','${email}','${hash}');`;
        con.query(sql, (err, result) => {
          if (err) throw err;
          res.status(200).send("user well inserted");
        });
      });
    }
  });
});

router.get("/users", (req, res) => {
  let sql = `SELECT name,id FROM users;`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

router.post("/users/sign-in", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let sql = `SELECT * FROM users WHERE email = '${email}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    if (!result.length) {
      res.status(200).send("Email or Password is incorrect");
    } else {
      let token = jwt.sign(
        {
          name: result[0].name,
          id: result[0].id,
          email: result[0].email,
        },
        "secret",
        {
          expiresIn: "1h",
        }
      );

      bcrypt.compare(password, result[0].password).then((resp) => {
        if (resp === true) {
          res.status(200).send({ token, auth: true });
        } else {
          res.status(200).send("Email or Password is incorrect");
        }
      });
    }
  });
});

router.get("/users/:id", verif_token, (req, res) => {
  let id = req.params.id;

  let sql = `SELECT users.name, users.email, products.names FROM  users INNER JOIN products ON users.id = products.user_affiliate WHERE users.id = ${id};`;

  con.query(sql, (err, result) => {
    if (err) throw err;

    res.status(200).send(result);
  });
});

//PRODUCTS ROUTES

router.post("/products", verif_token, (req, res) => {
  let names = req.body.names;
  let price = req.body.price;
  let category = req.body.category;
  let description = req.body.description;
  let image = req.body.image;
  let user_affiliate = req.body.user_affiliate;

  let sql = `INSERT INTO products (names, price, category, description, image, user_affiliate) VALUES('${names}','${price}','${category}','${description}','${image}','${user_affiliate}');`;

  con.query(sql, (err, result) => {
    if (err) throw err;

    res.status(200).send(result);
  });
});

router.get("/products", verif_token, (req, res) => {
  let sql = "SELECT name, price, description, category, image FROM products";
  con.query(sql, (err, result) => {
    if (err) throw err;

    res.status(200).send(result);
  });
});

router.get("/products/:id", verif_token, (req, res) => {
  let id = req.params.id;

  let sql = `SELECT products.names, products.price, products.description, products.category, products.image, users.name FROM  users INNER JOIN products ON users.id = products.user_affiliate WHERE users.id = ${id};`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

module.exports = router;
