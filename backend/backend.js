const express = require("express");
const app = express();
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "phpuser",
    password: "phpuser",
    database: "privacy_marketplace"
});

connection.connect(function(err) {
    if(err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

$query = "SELECT * FROM users";

connection.query($query, function(err, rows, fields) {
    if(err) {
        console.log("An error occure with the query");
        return;
    }

    console.log("Query Successfully Executed.", rows);
});

connection.end(function(){
    console.log("Connection closed.")
});