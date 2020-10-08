//Dependancies
const mysql = require('mysql2');


//Mysql

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: 'pop_db' //CHANGE LE NOM
});

con.connect((err)=>{
    if (err) throw err;
    console.log('Well connected');
});

module.exports = con; 