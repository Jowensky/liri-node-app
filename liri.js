require("dotenv").config();

var pass = require("./key.js")  

var Spotify = require('node-spotify-api');

var spotify = new Spotify(pass.spotify)

console.log(spotify)