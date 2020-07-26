var express = require("express");
var app = express();
var request = require('request');
app.set("view engine", "ejs");
//two route
app.get("/", function(req, res) {
    res.render("search");
});
app.get("/results", function(req, res) {
    var query = req.query.search;
    //Using dynamic URL here
    url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //因为body是一个string,所以要convert变为json object格式才能一个一个取    
            var data = JSON.parse(body);
            //res.send(body);
            //res.send(results["Search"][0]);
            res.render("results", { data: data });
        }
    });
});

app.listen(3000, function() {
    console.log("Move APP has started!");
});