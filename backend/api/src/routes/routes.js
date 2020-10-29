const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const con = require("../database/database");
let router = express.Router();
const saltRounds = 10;
const verif_token = require("../middleware/token");
// const { verify } = require("crypto");

//USERS ROUTES

// EDIT A USER PROFILE
router.put("/users/edit", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let image = req.body.profile_picture;
  let id = req.body.id;

  let check = `SELECT id FROM users WHERE id = '${id}';`;
  con.query(check, (err, result) => {
    if (err) throw err;

    if (!result.length) {
      res.status(200).send("This profil doesn't exist");
    } else {
      bcrypt.hash(password, saltRounds).then((hash) => {
        let verif = `UPDATE users SET name = '${name}',email = '${email}', password = '${hash}', profile_picture = '${image}' WHERE users.id = '${id}'`;
        con.query(verif, (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send("ALL OK");
          }
        });
      });
    }
  });
});

//ADD A USER
router.post("/users/sign-up", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let image = req.body.profile_picture;

  let verif = `SELECT email FROM users WHERE email = '${email}';`;
  con.query(verif, (err, result) => {
    if (err) throw err;

    if (result.length) {
      res.status(200).send("This email is already in use");
    } else {
      bcrypt.hash(password, saltRounds).then((hash) => {
        let sql = `INSERT INTO users (name, email, password, profile_picture) VALUES('${name}','${email}','${hash}','${image}');`;
        con.query(sql, (err, result) => {
          if (err) throw err;
          res.status(200).send("user well inserted");
        });
      });
    }
  });
});

//GET ALL USERS INFO
router.get("/users", (req, res) => {
  let sql = `SELECT name,id FROM users;`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

//USER SIGN IN
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
          profile_picture: result[0].profile_picture,
        },
        "secret"
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

//GET USER INFO
router.get("/users/:id", verif_token, (req, res) => {
  let id = req.params.id;

  let sql = `SELECT users.name, users.email, products.names 
  FROM  users 
  INNER JOIN products 
  ON users.id = products.user_affiliate 
  WHERE users.id = ${id};`;

  con.query(sql, (err, result) => {
    if (err) throw err;

    res.status(200).send(result);
  });
});

//PRODUCTS ROUTES
//ADD A PRODUCT
router.post("/products", verif_token, (req, res) => {
  let names = req.body.names;
  let price = req.body.price;
  let newPrice = req.body.newPrice  || 0;
  let category = req.body.category;
  let description = req.body.description;
  let image = req.body.image;
  let user_affiliate = req.body.user_affiliate;
  let id_image = req.body.id_image;
  let tableau = [];
  id_image.forEach((element) => {
    tableau.push(Object.values(element));
  });
  console.log('aa');
  console.log(newPrice);
  console.log('aa');


  let sql = `INSERT INTO products (names, price, new_price, category, description, image, user_affiliate) VALUES('${names}','${price}','${newPrice}', '${category}','${description}','${image}','${user_affiliate}');`;

  // let testsql = `BEGIN TRANSACTION
  //               INSERT INTO products (names, price, new_price,category, description, image, user_affiliate) VALUES('${names}','${price}','${newPrice}', '${category}','${description}','${image}','${user_affiliate}');
  //               SELECT products.id FROM products WHERE products.image = '${image}';
  //               INSERT INTO lk_product_image (id_image,id_product) VALUES ?
  //               COMMIT`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else if(tableau.length){
      console.log("1 record inserted, ID: " + result.insertId);
    
      // con.query(
      //   `SELECT products.id FROM products WHERE products.image = '${image}'`,
      //   (err, result) => {
      //     if (err) throw err;
      //     console.log(result);
      tableau.forEach((element) => {
        element.push(result.insertId);
      });
    
      con.query(
        "INSERT INTO lk_product_image (id_image, id_product) VALUES ?",
        [tableau, result.insertId],
  
        (err, resultatos) => {
          if (err) throw err;
          console.log("lou");
          res.status(200).send(resultatos);
        }
      );
    }else{
      res.status(200).send(result)
    }
  
  });
  // });
});
//GET ALL PRODUCTS
router.get("/products", verif_token, (req, res) => {
  let sql =
    "SELECT names, price, new_price, description, category, image, id FROM products";
  con.query(sql, (err, result) => {
    if (err) throw err;

    res.status(200).send(result);
  });
});
//GET A PRODUCT
router.get("/products/:id", verif_token, (req, res) => {
  let id = req.params.id;

  let sql = `SELECT products.id, products.names, products.price, products.new_price, products.description, products.category, products.image, users.name 
  FROM  users INNER JOIN products ON users.id = products.user_affiliate WHERE products.id = ${id};`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

//GET ALL PRODUCTS OF A USER
router.get("/products/user/:id", (req, res) => {
  let id = req.params.id;

  let sql = `SELECT products.id, products.names, products.price, products.new_price, products.description, products.category, products.image FROM  users INNER JOIN products ON users.id = products.user_affiliate WHERE products.user_affiliate = ${id};`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

// EDIT A PRODUCT
router.put("/product/edit", (req, res) => {
  let names = req.body.names;
  let price = req.body.price;
  let newPrice = req.body.newPrice;
  let category = req.body.category;
  let description = req.body.description;
  let image = req.body.image;
  let id = req.body.id;
  let check = `SELECT id FROM products WHERE id = '${id}';`;
  con.query(check, (err, result) => {
    if (err) throw err;

    if (!result.length) {
      res.status(200).send("This product doesn't exist");
    } else {
      let verif = `UPDATE products SET names = '${names}',price = '${price}', new_price = '${newPrice}',category = '${category}', image = '${image}',description = '${description}' WHERE products.id = '${id}'`;
      con.query(verif, (err, result) => {
        if (err) throw err;
        else {
          res.status(200).send("PRODUCT UPDATED");
        }
      });
    }
  });
});

//DELETE PRODUCT DONT TAKE BODY WITH AXIOS
router.delete("/product/delete/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);

  let sql = `DELETE FROM products WHERE products.id = '${id}'`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send("PRODUCT DELETED");
    }
  });
});

// CART

  //Post the cart
  router.post('/add-cart', (req,res)=>{
    console.log(req.body.tab);
    let tab = req.body.tab
    let total = 10;
    let sql = `INSERT INTO cart (date, total) VALUES (NOW(), '${total}')`;

    let tableau = [];
    tab.forEach((element) => {
      tableau.push(Object.values(element));
    });
    console.log(tableau);
    con.query(sql, (err, result)=>{
      if (err) throw err;
      else if(tableau.length){

        tableau.forEach((element) => {
          element.push(result.insertId);
        });
        console.log(tableau);
        con.query(`INSERT INTO cart_product (id_product_affiliate, quantity, id_cart_affiliate) VALUES ?`,
         [tableau, tableau[1], tableau[2]], (err,resultat) =>{
           if (err) throw err;
          else console.log(resultat);
         })
      }
      else
      res.status(200).send("Cart is empty")
    })
  });

module.exports = router;
