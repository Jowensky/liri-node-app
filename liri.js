require("dotenv").config();
var fs = require("fs");
var pass = require("./key.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(pass.spotify);
var request = require("request");
var moment = require("moment")
lookUp = process.argv[2];
lookupValue = process.argv.splice(3).join("+");

function bandsintown() {
  request(
    "https://rest.bandsintown.com/artists/" +
      lookupValue +
      "/events?app_id=codingbootcamp",
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        console.log("++ BANDS IN TOWN ++")
        console.log(`Venue: ${data[0].venue.name}`);
        console.log(`Location: ${data[0].venue.city}, ${data[0].venue.region}`);
        // use moment to formate mm/dd/yyyy
        console.log(`Date: ${moment().format(data[0].datetime)}`)
      }
    }
  );
}

function omdb() {
  request(
    "http://www.omdbapi.com/?t=" + lookupValue + "&y=&plot=short&apikey=trilogy",
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("** O  M  D  B **")
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[0].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    }
  );
}

function song() {
  spotify.search({ type: "track", query: lookupValue }, function(err, data) {
    if (err) {
      return err;
    } else {
      console.log("---S P O T I F Y---")
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Link: " + data.tracks.items[0].external_urls.spotify);
    }
  });
}

if (lookUp === "concert-this") {
  bandsintown();
}

if (lookUp === "movie-this" && !lookupValue) {
  lookupValue = "Mr.+Nobody"
  omdb();
} 

if (lookUp === "movie-this") {
  omdb()
}

if (lookUp === "spotify-this-song" && !lookupValue) {
  lookupValue = "The+Sign+Ace+of+Base"
  song();
}  

if (lookUp === "spotify-this-song") {
  song();
}
 
if (lookUp ===  "do-what-it-says") {

  fs.readFile('random.txt', 'utf8', function(err, data) {
    lookupValue = data
    song()
  })
}

