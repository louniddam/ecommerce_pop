//Dependancies
const mysql = require("mysql2");

//Mysql

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Well connected");
});

module.exports = con;
