'use strict';

// Application Dependencies
const express = require('express');
const server = express();
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


server.use(cors());
server.use(express.static('./public'));
server.use(express.urlencoded({extended:true}));
server.set('view engine', 'ejs');
server.get('/searches/new' , handleSearch);
server.post('/searches/show',searchResult);

server.get('/', (req, res) => {
    res.render('pages/index');
})

// handleSearch fun
function handleSearch(req,res){
    res.render('pages/searches/new');

}
//https://www.googleapis.com/books/v1/volumes?q=
// searchResult
function searchResult(req,res){
let search =req.body.search;

let url = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle`;
if(req.body.author === 'on'){
    url = `https://www.googleapis.com/books/v1/volumes?q=${search}+inauthor`;
}
superagent.get(url)
.then(bookData =>{
    console.log(bookData);
    let bookArr = bookData.body.items.map(value=> new Book(value));
    res.send(bookArr);
})
// .catch(()=>{ 
    
// })
}
// Book constructor

function Book(data){
this.title = (data.volumeInfo.title) ? data.volumeInfo.title : `Title unavilable`;
this.authors = (Array.isArray(data.volumeInfo.authors)) ? data.volumeInfo.authors.join(', ') : `Author unavilable` ;
this.description = (data.searchInfo) ? data.searchInfo.textSnippet : `description unavilable`;
this.img = (data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : `https://i.imgur.com/J5LVHEL.jpg`;

}

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})