require("dotenv").config();

var pass = require("./key.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(pass.spotify);

var request = require("request");

artist = process.argv[2];

request(
  "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp",
  function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(JSON.parse(body));
    }
  }
);

request(
  "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy",
  function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
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
  console.log(data.tracks.items[1].name);
});
