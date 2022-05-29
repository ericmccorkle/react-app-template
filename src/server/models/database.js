/*------ Connection to Postgres DB BoilerPlate ---------*/
const { Pool } = require("pg");
// const path = require('path');

//requiring our hidden database connection string
require("dotenv").config({ path: "../.env" });

// if the above line is not working try this after requiring in "path"
// require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_SECRET,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
