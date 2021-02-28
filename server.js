'use strict';

// Application Dependencies
const express = require('express');
//CORS = Cross Origin Resource Sharing
const cors = require('cors');
//DOTENV (read our enviroment variable)
require('dotenv').config();
// Superagent
const superagent = require('superagent');

// postgresql
// const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);


//Application Setup
const PORT = process.env.PORT || 3030;
const server = express();


server.use(cors());
server.use(express.static('./public'));
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})