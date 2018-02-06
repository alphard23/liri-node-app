// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:

require("dotenv").config();

var keys = require("./keys");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function doSomething(action, arguement) {
    switch (action) {
        case "movie-this":
            console.log("movie");
            break;
        case "my-tweets":
            console.log("tweets");
            break;
        case "spotify-this-song":
            console.log("song");
            spotifyThis(arguement);
            break;
        case "do-what-it-says":
            console.log("dosomething");
            break;
        default:
            console.log("get your ass to Mars");
            break;
    }

}

function spotifyThis(query) {
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].artists[0].name);

    });
}




doSomething(process.argv[2], process.argv[3]);