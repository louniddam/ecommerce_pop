//Dependancies
const mysql = require("mysql2");
require("dotenv").config();
//Mysql

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Well connected");
});

module.exports = con;
