// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:

require("dotenv").config();

var keys = require("./keys");

var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Switch to structure the Node parameters
function doSomething(action, arguement) {
    switch (action) {
        case "movie-this":
            myMovie(arguement);
            break;
        case "my-tweets":
            myTweets(arguement);
            break;
        case "spotify-this-song":
            console.log("song");
            spotifyThis(arguement);
            break;
        case "do-what-it-says":
            console.log("dosomething");
            break;
        default:
            console.log("get to the choppah");
            break;
    }

}

//Spotify Node Logic to return song results
function spotifyThis(query) {
    spotify.search({ type: 'track', query: query }, function(err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(data.tracks.items)
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log('yo')
            console.log(data.tracks.items[i].album.name);
            console.log(data.tracks.items[i].artists[0].name);
        }
    });
}

// Twitter Node Logic to return tweets
function myTweets() {
    console.log('go')
    client.get('search/tweets', { q: 'layonthebeech' }, function(error, tweets, response) {
        if (error) {
            return console.log(error)
        }
        console.log(tweets);
    });
}

// OMDB Node Logic to return movies
function myMovie(movie) {
    if (!movie) {
        movie = 'Mr.Nobody';
    }
    console.log(movie)
    request('http://www.omdbapi.com/?t=' + movie + '&apikey=acd79ab3&t&plot&y', function(error, response, body) {
        if (error) {
            return console.log('error:', error);
        }
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}
doSomething(process.argv[2], process.argv[3]);