var dotenv = require('dotenv').config();
// Get an instance of mysql we can use in the app
var mysql = require('mysql')
const PW = process.env.PW;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_DB = process.env.DB_DB;

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : DB_HOST,
    user            : DB_USER,
    password        : PW,
    database        : DB_DB
})

// Export it for use in our applicaiton
module.exports.pool = pool;