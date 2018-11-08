require("dotenv").config();

var pass = require("./key.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(pass.spotify);

var request = require("request");

lookUp = process.argv[2];

function bandsintown(body) {
  if (lookUp === "concert-this") {
    console.log(JSON.parse(body));
  } 
}

function omdb(body) {
  if (lookUp === "movie-this") {
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
}

function spot(data) {
  if (lookUp === "spotify-this-song") {
    console.log(data.tracks.items[1].name);
  } 
}

// make to search any artist
request(
  "https://rest.bandsintown.com/artists/" +
    "lucki" +
    "/events?app_id=codingbootcamp",
  function(error, response, body) {
    if (!error && response.statusCode === 200) {
      bandsintown(body);
    }
  }
);

request(
  "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy",
  function(error, response, body) {
    if (!error && response.statusCode === 200) {
      omdb(body);
    }
  }
);

spotify.search({ type: "track", query: "All the Small Things" }, function(
  err,
  data
) {
  if (err) {
    return console.log("Error occurred: " + err);
  }
  spot(data);
});

