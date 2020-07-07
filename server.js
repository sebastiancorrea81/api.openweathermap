var express = require('express')
var http = require('http')
var app = express()
var request = require("request");
const apiKey = "8ab24b02cb94b39ff36c41b8be1dc1f7";
const apiRoute = "http://api.openweathermap.org/data/2.5";
var ipapi = require('ipapi.co');


app.get('/current', function(req, res) {
	if(req.query.city){
		request({
	    url: `${apiRoute}/weather?q=${req.query.city}&APPID=${apiKey}`,
	    json: false
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        res.send(body) 
	    }
	})
	}else{
		request({
	    url: `${apiRoute}?q=Mendoza&APPID=${apiKey}`,
	    json: false
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        res.send(body) 
	    }
	})
	}
		
});

app.get('/forecast', function(req, res) {
	if(req.query.city){
		request({
	    url: `${apiRoute}/forecast?q=${req.query.city}&APPID=${apiKey}`,
	    json: false
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        res.send(body) 
	    }
	})
	}else{
		request({
	    url: `${apiRoute}/forecast?q=Mendoza&APPID=${apiKey}`,
	    json: false
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        res.send(body) 
	    }
	})
	}
		
});

app.get('/location', function(req, res) {
	ipapi.location(function(loca){
		res.send(loca)
	})
});

app.get('/', (req, res) => {
	res.status(200).send("welcome!")	
})

http.createServer(app).listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});