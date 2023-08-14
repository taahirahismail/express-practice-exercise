const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dolfinz",
    database: "challengerdb"
});

// open mysql connection
con.connect(err => {
    if (err) throw err;
    console.log("Connection established successfully!");
});

module.exports = con;